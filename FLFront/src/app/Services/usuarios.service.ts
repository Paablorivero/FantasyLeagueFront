import {inject, Injectable} from '@angular/core';
import { usersUrl} from '../../ExternalRouting/backendRoutes';
import {HttpClient} from '@angular/common/http';
import {Userprofile} from '../interfaces/dtos/userprofile.interface';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

//   Inyecto servicio http
  private http = inject(HttpClient);


//   Petición para obtener el perfil de usuario

  userProfile(): Promise<Userprofile>{
    return lastValueFrom(this.http.get<Userprofile>(`${usersUrl}/me`));
  }
}
