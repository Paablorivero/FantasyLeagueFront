import { Routes } from '@angular/router';
import {LandinPage} from './Pages/landin-page/landin-page';
import {LogIn} from './Pages/log-in/log-in';
import {SignIn} from './Pages/sign-in/sign-in';
import {LigaNoticias} from './Pages/liga-noticias/liga-noticias';
import {SeleccionLigas} from './Pages/seleccion-ligas/seleccion-ligas';
import {Home} from './Pages/home/home';
import {LigaClasificacion} from './Pages/liga-clasificacion/liga-clasificacion';
import {LigaMercado} from './Pages/liga-mercado/liga-mercado';
import {LigaPlantilla} from './Pages/liga-plantilla/liga-plantilla';

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'daznfantasy'},
  {path: 'daznfantasy', component: LandinPage},
  {path: 'daznfantasy/login', component: LogIn},
  {path: 'daznfantasy/register',component: SignIn},
  {path: 'daznfantasy/news', component: LigaNoticias},
  {path: 'daznfantasy/leagues', component: SeleccionLigas},
  {path: 'daznfantasy/user/:id'}, //aqui hay meter la de usersettings
  {path: 'daznfantasy/league/:id', component: Home, canActivate: [], children: [
      {path: 'clasificacion', component: LigaClasificacion},
      {path: 'mercado', component: LigaMercado},
      {path: 'noticias', component: LigaNoticias},
      {path: 'plantilla', component: LigaPlantilla},
    ]
  },
  {path: 'page404'}, //pagina 404
  {path: '**', redirectTo: 'page404'} //redirigir a 404
  ];
