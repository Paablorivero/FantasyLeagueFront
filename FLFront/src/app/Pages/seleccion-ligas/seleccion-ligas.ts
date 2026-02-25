import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LigasService } from '../../Services/ligas.service';
import { Liga } from '../../interfaces/liga.interface';

@Component({
  selector: 'app-seleccion-ligas',
  imports: [RouterLink],
  templateUrl: './seleccion-ligas.html',
  styleUrl: './seleccion-ligas.css',
})
export class SeleccionLigas implements OnInit {
  private ligasService = inject(LigasService);
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
      const [allLigas, ligasDisponibles] = await Promise.all([
        this.ligasService.getAllLigas(),
        this.ligasService.getLigasPlazasLibres(),
      ]);

      this.allLigas = allLigas;
      this.ligasDisponibles = ligasDisponibles;
    } catch {
      this.error = 'No se pudieron cargar las ligas. Inténtalo de nuevo.';
    } finally {
      this.loading = false;
    }
  }
}
