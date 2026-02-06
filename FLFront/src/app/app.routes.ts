import { Routes } from '@angular/router';
import {LandinPage} from './Pages/landin-page/landin-page';

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'landingpage'},
  {path: 'landingpage', component: LandinPage}
  ];
