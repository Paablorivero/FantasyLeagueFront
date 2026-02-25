import {Component, inject, OnInit} from '@angular/core';
import {JugadorInterface} from '../../interfaces/jugador.interface';
import {AlineacionesService} from '../../Services/alineaciones.service';
import {JugadorResumenDto} from '../../interfaces/dtos/jugadorresumendto';
import {ControljornadasService} from '../../Services/controljornadas.service';
import {EquipoligaService} from '../../Services/equipoliga.service';
import {Posicion} from '../../interfaces/types/posicion.type';
import {JugadorAlineacionComponent} from '../../Components/jugador-alineacion/jugador-alineacion.component';

@Component({
  selector: 'app-liga-plantilla',
  imports: [JugadorAlineacionComponent],
  templateUrl: './liga-plantilla.html',
  styleUrl: './liga-plantilla.css',
})
export class LigaPlantilla implements OnInit {

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

  ngOnInit() {
    this.loadAlineacion();
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

    const equipoId = this.seleccionEquipoLiga.equipoSeleccionado();
    const jornada = this.jornadasService.jornadaSeleccionada();

    if (!equipoId || !jornada) return;

    const data = await this.alineacionService.getAlineacion(equipoId, jornada);

    this.resetEstructura();

    data.forEach(jugador => {
      this.titulares[jugador.posicion].push(jugador);
    });

    await this.loadSuplentes(equipoId);
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

    const equipoId = this.seleccionEquipoLiga.equipoSeleccionado();
    const jornada = this.jornadasService.jornadaSeleccionada();

    if (!equipoId || !jornada) return;

    await this.alineacionService.actualizarAlineacion(equipoId,jornada, jugadoresIds);
  }

}
