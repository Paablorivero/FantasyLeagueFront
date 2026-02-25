import {inject, Injectable} from '@angular/core';
import {alineacionesUrl} from '../../ExternalRouting/backendRoutes';
import {HttpClient} from '@angular/common/http';
import {Equipoalineaciondto} from '../interfaces/dtos/equipoalineaciondto.interface';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlineacionesService {

//   Inyecto el HttpClient
  private http = inject(HttpClient);

//   Metodo que obtiene la alineación de un equipo actual
  getAlineacion(equipoId: string): Promise<Equipoalineaciondto[]>{
    return lastValueFrom(this.http.get<Equipoalineaciondto[]>(`${alineacionesUrl}/actual/${equipoId}`));
  }
}
