import {Component, Input} from '@angular/core';
import {JugadorResumenDto} from '../../interfaces/dtos/jugadorresumendto';

@Component({
  selector: 'app-jugador-alineacion',
  standalone: true,
  imports: [],
  templateUrl: './jugador-alineacion.component.html',
  styleUrl: './jugador-alineacion.component.css',
})
export class JugadorAlineacionComponent {
  @Input() jugador!: JugadorResumenDto;
}
