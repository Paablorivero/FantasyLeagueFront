import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EquipoligaService } from '../../Services/equipoliga.service';

// Contenedor de navegación lateral para secciones internas de una liga.
@Component({
  selector: 'app-dashboard-ligas',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-ligas.html',
  styleUrl: './dashboard-ligas.css',
})
export class DashboardLigas {
  protected readonly equipoLigaService = inject(EquipoligaService);

  protected goToClasificacionQueryParams() {
    const liga = this.equipoLigaService.ligaSeleccionada();
    if (!liga) {
      return {};
    }

    return {
      ligaId: liga.ligaId,
      nombreLiga: liga.nombreLiga
    };
  }
}
