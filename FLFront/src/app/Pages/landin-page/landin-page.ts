import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TemporadaService} from '../../Services/temporada.service';

@Component({
  selector: 'app-landin-page',
  imports: [
    RouterLink
  ],
  templateUrl: './landin-page.html',
  styleUrl: './landin-page.css',
})
export class LandinPage {

//   Inyecto el servicio de temporadaservice para que obtenga la temporada al arrancar.
  tempService = inject(TemporadaService);
}
