import {ChangeDetectorRef, Component, effect, inject, OnInit} from '@angular/core';
import {AlineacionesService} from '../../Services/alineaciones.service';
import {JugadorResumenDto} from '../../interfaces/dtos/jugadorresumendto';
import {ControljornadasService} from '../../Services/controljornadas.service';
import {EquipoligaService} from '../../Services/equipoliga.service';
import {Posicion} from '../../interfaces/types/posicion.type';
import {JugadorAlineacionComponent} from '../../Components/jugador-alineacion/jugador-alineacion.component';
import {TemporadaService} from '../../Services/temporada.service';
import {HttpErrorResponse} from '@angular/common/http';

// Gestiona la carga de plantilla y los cambios de jugadores en la alineación.
@Component({
  selector: 'app-liga-plantilla',
  imports: [JugadorAlineacionComponent],
  templateUrl: './liga-plantilla.html',
  styleUrl: './liga-plantilla.css',
  standalone: true
})
export class LigaPlantilla implements OnInit {

  temporadaSev = inject(TemporadaService);

  private cdr = inject(ChangeDetectorRef);

  // Titulares agrupados por posición para pintar el campo por líneas.
  titulares: Record<Posicion, JugadorResumenDto[]> = {
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Attacker: []
  };

  suplentes: JugadorResumenDto[] = [];
  selectedTitular: JugadorResumenDto | null = null;
  feedback: string = '';
  saveMessage: string = '';
  isSaving: boolean = false;
  private dragged:
    | {
        jugador: JugadorResumenDto;
        source: 'titular' | 'suplente';
        sourcePos?: Posicion;
        sourceIndex: number;
      }
    | null = null;

  alineacionService = inject(AlineacionesService);
  jornadasService = inject(ControljornadasService);
  seleccionEquipoLiga = inject(EquipoligaService);

  constructor(){
    effect(() => {
      const equipo = this.seleccionEquipoLiga.equipoSeleccionado();
      const jornada = this.jornadasService.jornadaSeleccionada();

      console.log('Efecto disparado:', { equipo, jornada });

      if (equipo && jornada) {
        this.loadAlineacion();
      }
    });
  }

  ngOnInit() {

  }

  resetEstructura() {
    this.titulares = {
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Attacker: []
    };
  }

  async loadAlineacion() {

    this.resetEstructura();
    this.suplentes = [];

    await this.temporadaSev.obtenerJornadaActual();

    const equipo = this.seleccionEquipoLiga.equipoSeleccionado();
    const jornada = this.jornadasService.jornadaSeleccionada();

    console.log(equipo);
    console.log(jornada);

    console.log('EQUIPO SIGNAL:', equipo);
    console.log('KEYS:', Object.keys(equipo ?? {}));

    if (!equipo || !jornada) return;

    try {
      const data: JugadorResumenDto[] = await this.alineacionService.getAlineacion(equipo?.equipoId, jornada);
      const plantillaJornada: JugadorResumenDto[] = await this.obtenerPlantillaParaJornada(equipo.equipoId, jornada);
      console.log(data);

      const nuevosTitulares: Record<Posicion, JugadorResumenDto[]> = {
        Goalkeeper: [],
        Defender: [],
        Midfielder: [],
        Attacker: []
      };

      console.log('DATA REAL:', data);
      console.log('ES ARRAY?', Array.isArray(data));
      console.log('LONGITUD:', data.length);

      for (const jugador of data) {
        nuevosTitulares[jugador.posicion].push(jugador);
      }

      this.titulares = {...nuevosTitulares};
      this.loadSuplentes(plantillaJornada);
    } catch (error) {
      console.error('Error cargando alineacion/plantilla:', error);
    }

    this.cdr.detectChanges();
  }

  private async obtenerPlantillaParaJornada(equipoId: string, jornadaId: number): Promise<JugadorResumenDto[]> {
    try {
      return await this.alineacionService.getPlantillaJornada(equipoId, jornadaId);
    } catch (error) {
      // Fallback para equipos nuevos o mientras el endpoint de plantilla por jornada no esté disponible.
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return await this.alineacionService.getPlantillaActiva(equipoId);
      }
      throw error;
    }
  }

  loadSuplentes(plantilla: JugadorResumenDto[]){
    const titularesIds = new Set<number>();

    for (const posicion in this.titulares) {
      this.titulares[posicion as Posicion].forEach(j => titularesIds.add(j.jugadorId));
    }

    this.suplentes = plantilla.filter(jugador => !titularesIds.has(jugador.jugadorId));
  }

  selectTitular(jugador: JugadorResumenDto){
    this.feedback = '';
    this.selectedTitular = jugador;
  }

  cambiarJugador(suplente: JugadorResumenDto){
    if(!this.selectedTitular){
      return;
    }

    const posicion = this.selectedTitular.posicion;
    this.feedback = '';

    if (suplente.posicion !== posicion) {
      this.showFeedback('No puedes poner a ese jugador en esa posicion.');
      return;
    }

    this.titulares[posicion] = this.titulares[posicion].map(j => j.jugadorId === this.selectedTitular!.jugadorId ? suplente : j);

    this.suplentes.push(this.selectedTitular);
    this.suplentes = this.suplentes.filter(j => j.jugadorId !== suplente.jugadorId);

    this.selectedTitular = null;
  }

  startDragTitular(event: DragEvent, posicion: Posicion, index: number): void {
    const jugador = this.titulares[posicion][index];
    if (!jugador) return;

    this.dragged = {
      jugador,
      source: 'titular',
      sourcePos: posicion,
      sourceIndex: index
    };
    this.feedback = '';
    event.dataTransfer?.setData('text/plain', String(jugador.jugadorId));
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  startDragSuplente(event: DragEvent, index: number): void {
    const jugador = this.suplentes[index];
    if (!jugador) return;

    this.dragged = {
      jugador,
      source: 'suplente',
      sourceIndex: index
    };
    this.feedback = '';
    event.dataTransfer?.setData('text/plain', String(jugador.jugadorId));
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  }

  dropOnTitular(event: DragEvent, targetPos: Posicion, targetIndex: number): void {
    event.preventDefault();
    if (!this.dragged) return;

    const target = this.titulares[targetPos][targetIndex];
    if (!target) {
      this.clearDrag();
      return;
    }

    if (this.dragged.jugador.posicion !== targetPos) {
      // Regla clave: solo se permite intercambiar jugadores de la misma posicion.
      this.showFeedback('No puedes poner a ese jugador en esa posicion.');
      this.clearDrag();
      return;
    }

    if (this.dragged.source === 'suplente') {
      const suplenteActual = this.suplentes[this.dragged.sourceIndex];
      if (!suplenteActual) {
        this.clearDrag();
        return;
      }

      this.titulares[targetPos][targetIndex] = suplenteActual;
      this.suplentes[this.dragged.sourceIndex] = target;
      this.selectedTitular = null;
      this.feedback = '';
      this.clearDrag();
      return;
    }

    const sourcePos = this.dragged.sourcePos;
    if (!sourcePos) {
      this.clearDrag();
      return;
    }

    const sourceIndex = this.dragged.sourceIndex;
    const sourcePlayer = this.titulares[sourcePos][sourceIndex];
    if (!sourcePlayer) {
      this.clearDrag();
      return;
    }

    this.titulares[sourcePos][sourceIndex] = target;
    this.titulares[targetPos][targetIndex] = sourcePlayer;
    this.feedback = '';
    this.clearDrag();
  }

  dropOnSuplente(event: DragEvent, targetIndex: number): void {
    event.preventDefault();
    if (!this.dragged) return;

    const target = this.suplentes[targetIndex];
    if (!target) {
      this.clearDrag();
      return;
    }

    if (this.dragged.source === 'titular') {
      const sourcePos = this.dragged.sourcePos;
      if (!sourcePos) {
        this.clearDrag();
        return;
      }

      if (target.posicion !== sourcePos) {
        // Al bajar un titular al banquillo se valida tambien la compatibilidad de posicion.
        this.showFeedback('No puedes poner a ese jugador en esa posicion.');
        this.clearDrag();
        return;
      }

      const titular = this.titulares[sourcePos][this.dragged.sourceIndex];
      if (!titular) {
        this.clearDrag();
        return;
      }

      this.titulares[sourcePos][this.dragged.sourceIndex] = target;
      this.suplentes[targetIndex] = titular;
      this.selectedTitular = null;
      this.feedback = '';
      this.clearDrag();
      return;
    }

    const sourceIndex = this.dragged.sourceIndex;
    const sourcePlayer = this.suplentes[sourceIndex];
    if (!sourcePlayer) {
      this.clearDrag();
      return;
    }

    this.suplentes[sourceIndex] = target;
    this.suplentes[targetIndex] = sourcePlayer;
    this.feedback = '';
    this.clearDrag();
  }

  endDrag(): void {
    this.clearDrag();
  }

  private clearDrag(): void {
    this.dragged = null;
  }

  private showFeedback(message: string): void {
    this.feedback = message;
    setTimeout(() => {
      if (this.feedback === message) {
        this.feedback = '';
      }
    }, 2800);
  }

  closeFeedback(): void {
    this.feedback = '';
  }

  async guardar() {
    this.saveMessage = '';
    const jugadoresIds: number[] = [];

    this.titulares.Goalkeeper.forEach(j => jugadoresIds.push(j.jugadorId));
    this.titulares.Defender.forEach(j => jugadoresIds.push(j.jugadorId));
    this.titulares.Midfielder.forEach(j => jugadoresIds.push(j.jugadorId));
    this.titulares.Attacker.forEach(j => jugadoresIds.push(j.jugadorId));

    const equipo = this.seleccionEquipoLiga.equipoSeleccionado();
    const jornada = this.jornadasService.jornadaSeleccionada();

    if (!equipo || !jornada) return;

    this.isSaving = true;

    try {
      await this.alineacionService.actualizarAlineacion(equipo.equipoId,jornada, jugadoresIds);
      this.saveMessage = 'Alineacion guardada correctamente.';
    } catch {
      this.saveMessage = 'No se pudo guardar la alineacion. Intentalo de nuevo.';
    } finally {
      this.isSaving = false;
    }
  }

}
