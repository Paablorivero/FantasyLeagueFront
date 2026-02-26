import {inject, Injectable} from '@angular/core';
import {ligasUrl} from '../../ExternalRouting/backendRoutes';
import {HttpClient} from '@angular/common/http';
import {Liga} from '../interfaces/liga.interface';
import {lastValueFrom} from 'rxjs';
import {LigaClasificacion} from '../Pages/liga-clasificacion/liga-clasificacion';
import {Ligaclasificaciondto} from '../interfaces/dtos/ligaclasificaciondto.interface';
import {LigaEquiposUsuarioDto} from '../interfaces/dtos/ligaequiposusuariodto.interface';
import {Equipo} from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root',
})
export class LigasService {

//   Después de importar la url correspondiente a las ligas inyecto httpclient
  private http = inject(HttpClient);

//   Creo el método que permite crear una liga

  postLiga(nombreLiga: string, nombreEquipo: string): Promise<void>{
    // Creo el objeto que necesito mandar
    const data = {nombreLiga: nombreLiga, nombreEquipo: nombreEquipo}

    return lastValueFrom(this.http.post<void>(`${ligasUrl}`, data));
  }

  //Creo el método que nos permite unirnos a una liga
  unirseLiga(ligaId: string, nombreEquipo: string): Promise<Equipo>{

    return lastValueFrom(this.http.post<Equipo>(`${ligasUrl}/unirse/${ligaId}`, {nombreEquipo}));
  }

// Creo el método que me devuelve todas las ligas
  getAllLigas(): Promise<Liga[]> {
    return lastValueFrom(this.http.get<Liga[]>(`${ligasUrl}/all`));
  }

//   Creo el método que nos muestra las ligas que todavía tienen plazas disponibles
  getLigasPlazasLibres(): Promise<Liga[]>{
    return lastValueFrom(this.http.get<Liga[]>(`${ligasUrl}/disponibles`));
  }

//   Creo el método que nos permite obtener la clasificación de una liga
  getClasificacionLiga(ligaId: string): Promise<Ligaclasificaciondto[]>{
    return lastValueFrom(this.http.get<Ligaclasificaciondto[]>(`${ligasUrl}/${ligaId}/clasificacion`));
  }

//   Método que devuelve los equipos participantes de una liga y su nombre de usuarios
  getParticipantesLiga(ligaId: string): Promise<LigaEquiposUsuarioDto>{
    return lastValueFrom(this.http.get<LigaEquiposUsuarioDto>(`${ligasUrl}/${ligaId}/participantes`));
  }
}
