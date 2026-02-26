import {ChangeDetectorRef, Component, effect, inject, OnInit} from '@angular/core';
import {JugadorInterface} from '../../interfaces/jugador.interface';
import {AlineacionesService} from '../../Services/alineaciones.service';
import {JugadorResumenDto} from '../../interfaces/dtos/jugadorresumendto';
import {ControljornadasService} from '../../Services/controljornadas.service';
import {EquipoligaService} from '../../Services/equipoliga.service';
import {Posicion} from '../../interfaces/types/posicion.type';
import {JugadorAlineacionComponent} from '../../Components/jugador-alineacion/jugador-alineacion.component';
import {TemporadaService} from '../../Services/temporada.service';

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

  titulares: Record<Posicion, JugadorResumenDto[]> = {
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Attacker: []
  };

  suplentes: JugadorResumenDto[] = [];
  selectedTitular: JugadorResumenDto | null = null;

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

    await this.temporadaSev.obtenerJornadaActual();

    const equipo = this.seleccionEquipoLiga.equipoSeleccionado();
    const jornada = this.jornadasService.jornadaSeleccionada();

    console.log(equipo);
    console.log(jornada);

    console.log('EQUIPO SIGNAL:', equipo);
    console.log('KEYS:', Object.keys(equipo ?? {}));

    if (!equipo || !jornada) return;

    const data: JugadorResumenDto[] = await this.alineacionService.getAlineacion(equipo?.equipoId, jornada);
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

    // data.forEach(jugador => {
    //   this.titulares[jugador.posicion] = [...this.titulares[jugador.posicion], jugador];
    // });

    // await this.loadSuplentes(equipo.equipoId);

    this.cdr.detectChanges();
  }

  async loadSuplentes(equipoId: string){
    const plantilla = await this.alineacionService.getPlantillaActiva(equipoId);

    const titularesIds: number[] = [];

    for(const posicion in this.titulares){
      this.titulares[posicion as Posicion].forEach(j => titularesIds.push(j.jugadorId));
    }
  }

  selectTitular(jugador: JugadorResumenDto){
    this.selectedTitular = jugador;
  }

  cambiarJugador(suplente: JugadorResumenDto){
    if(!this.selectedTitular){
      return;
    }

    const posicion = this.selectedTitular.posicion;

    this.titulares[posicion] = this.titulares[posicion].map(j => j.jugadorId === this.selectedTitular!.jugadorId ? suplente : j);

    this.suplentes.push(this.selectedTitular);

    this.selectedTitular = null;
  }

  async guardar() {
    const jugadoresIds: number[] = [];

    this.titulares.Goalkeeper.forEach(j => jugadoresIds.push(j.jugadorId));
    this.titulares.Defender.forEach(j => jugadoresIds.push(j.jugadorId));
    this.titulares.Midfielder.forEach(j => jugadoresIds.push(j.jugadorId));
    this.titulares.Attacker.forEach(j => jugadoresIds.push(j.jugadorId));

    const equipo = this.seleccionEquipoLiga.equipoSeleccionado();
    const jornada = this.jornadasService.jornadaSeleccionada();

    if (!equipo || !jornada) return;

    await this.alineacionService.actualizarAlineacion(equipo.equipoId,jornada, jugadoresIds);
  }

}
