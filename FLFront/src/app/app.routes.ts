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
import {Page404} from './Pages/page404/page404';
import {UserSettings} from './Pages/user-settings/user-settings';
import {DashboardLigas} from './Pages/dashboard-ligas/dashboard-ligas';

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'daznfantasy'},
  {path: 'daznfantasy', component: LandinPage},
  {path: 'daznfantasy/login', component: LogIn},
  {path: 'daznfantasy/register',component: SignIn},
  {path: 'daznfantasy/home', component: Home},
  {path: 'daznfantasy/news', component: LigaNoticias},
  {path: 'daznfantasy/leagues', component: SeleccionLigas},
  {path: 'daznfantasy/user/:id', component: UserSettings},
  {path: 'daznfantasy/league/:id', component: DashboardLigas, canActivate: [], children: [
      {path: 'clasificacion', component: LigaClasificacion},
      {path: 'mercado', component: LigaMercado},
      {path: 'noticias', component: LigaNoticias},
      {path: 'plantilla', component: LigaPlantilla},
    ]
  },
  {path: 'page404', component: Page404},
  {path: '**', redirectTo: 'page404'}
  ];
