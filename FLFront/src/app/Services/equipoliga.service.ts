import {Injectable, signal} from '@angular/core';
import {Liga} from '../interfaces/liga.interface';
import {Equipo} from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root',
})
export class EquipoligaService {

  //Este signal se actualizará con la id de una liga seleccionada por el jugador
  ligaSeleccionada = signal<Liga | null>(null);

  // Este signal se actualizara con la id de un equipo seleccionado por el jugador
  equipoSeleccionado = signal<Equipo | null>(null);

//   Metodo para actualizar el valor del signal de liga
  setLiga(liga: Liga) {
    this.ligaSeleccionada.set(liga);
  }

//   Metodo para actualizar el valor del signal de equipo
  setEquipo(equipo: Equipo) {
    this.equipoSeleccionado.set(equipo);
  }
}
