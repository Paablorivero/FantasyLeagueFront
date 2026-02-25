import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Liga } from '../../interfaces/liga.interface';

@Component({
  selector: 'app-tarjeta-seleccion',
  imports: [RouterLink],
  templateUrl: './tarjeta-seleccion.html',
  styleUrl: './tarjeta-seleccion.css',
})
export class TarjetaSeleccion {
  @Input() liga!: Liga;
}
