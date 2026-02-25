import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LigasService } from '../../Services/ligas.service';
import { Liga } from '../../interfaces/liga.interface';
import { TarjetaSeleccion } from '../../Components/tarjeta-seleccion/tarjeta-seleccion';

@Component({
  selector: 'app-seleccion-ligas',
  imports: [RouterLink, TarjetaSeleccion],
  templateUrl: './seleccion-ligas.html',
  styleUrl: './seleccion-ligas.css',
})
export class SeleccionLigas implements OnInit {
  private ligasService = inject(LigasService);
  private cdr = inject(ChangeDetectorRef);
  allLigas: Liga[] = [];
  ligasDisponibles: Liga[] = [];
  loading = false;
  error = '';

  async ngOnInit(): Promise<void> {
    await this.loadLigas();
  }

  private async loadLigas(): Promise<void> {
    this.loading = true;
    this.error = '';

    try {
      this.allLigas = await this.ligasService.getAllLigas();
    } catch {
      this.error = 'No se pudieron cargar las ligas. Inténtalo de nuevo.';
    }

    try {
      this.ligasDisponibles = await this.ligasService.getLigasPlazasLibres();
    } catch {
      // Si falla ligas disponibles no bloqueamos la página
    }

    this.loading = false;
    this.cdr.detectChanges();
  }
}
