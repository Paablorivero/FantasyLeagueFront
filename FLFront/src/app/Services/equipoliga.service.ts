import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EquipoligaService {

  //Este signal se actualizará con la id de una liga seleccionada por el jugador
  ligaSeleccionada = signal<string | null>(null);

  // Este signal se actualizara con la id de un equipo seleccionado por el jugador
  equipoSeleccionado = signal<string | null>(null);

//   Metodo para actualizar el valor del signal de liga
  setLiga(id: string) {
    this.ligaSeleccionada.set(id);
  }

//   Metodo para actualizar el valor del signal de equipo
  setEquipo(id: string) {
    this.equipoSeleccionado.set(id);
  }
}
