import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ControljornadasService} from './controljornadas.service';
import {lastValueFrom} from 'rxjs';
import {TemporadaInterface} from '../interfaces/temporada.interface';
import {temporadasUrl} from '../../ExternalRouting/backendRoutes';

@Injectable({
  providedIn: 'root',
})
export class TemporadaService {

  // Servicio http
  http = inject(HttpClient);

  //Para actualizar la jornada actual y la jornada seleccionada al inicio necesito injectar el servicio
  controJorn = inject(ControljornadasService);

//   Como solo va a existir una temporada voy a definirla como constante
  temporadaActual: number = 1;

  constructor(){
  //   Llamo al endpoint mediante una función
    this.obtenerJornadaActual();
  }


  async obtenerJornadaActual() {
    const temporada = await lastValueFrom(this.http.get<TemporadaInterface>(`${temporadasUrl}/${this.temporadaActual}`));

    this.controJorn.setJornadaActiva(temporada.jornadaActual);
    this.controJorn.setJornadaSeleccionada(temporada.jornadaActual);
  }
}
