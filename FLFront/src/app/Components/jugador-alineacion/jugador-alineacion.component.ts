import {Component, Input} from '@angular/core';
import {JugadorResumenDto} from '../../interfaces/dtos/jugadorresumendto';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-jugador-alineacion',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './jugador-alineacion.component.html',
  styleUrl: './jugador-alineacion.component.css',
})
export class JugadorAlineacionComponent {
  @Input() jugador!: JugadorResumenDto;
}
