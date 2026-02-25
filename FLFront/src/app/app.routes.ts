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
import {loginGuardGuard} from './Guards/login-guard-guard';

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'daznfantasy'},
  {path: 'daznfantasy', children: [
      {path: '', pathMatch:'full', component: LandinPage},
      {path: 'login', component: LogIn},
      {path: 'register', component: SignIn},
      {
        path: '', component: DashboardLigas, canActivateChild: [loginGuardGuard], children: [
          {path: 'home', component: Home},
          {path: 'news', component: LigaNoticias},
          {path: 'leagues', component: SeleccionLigas},
          {path: 'user', component: UserSettings},
          {path: 'clasificacion', component: LigaClasificacion},
          {path: 'mercado', component: LigaMercado},
          {path: 'noticias', component: LigaNoticias},
          {path: 'plantilla', component: LigaPlantilla},
        ],
      },
    ],
  },
  {path: 'page404', component: Page404},
  {path: '**', component: Page404},
  ];
