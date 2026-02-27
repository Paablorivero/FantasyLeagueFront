import { Component, OnInit, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EquipoligaService } from '../../Services/equipoliga.service';
import { EquipoDataService } from '../../Services/equipo-data.service';

// Contenedor de navegación lateral para secciones internas de una liga.
@Component({
  selector: 'app-dashboard-ligas',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-ligas.html',
  styleUrl: './dashboard-ligas.css',
})
export class DashboardLigas implements OnInit {
  protected readonly equipoLigaService = inject(EquipoligaService);
  protected readonly equipoDataService = inject(EquipoDataService);

  constructor() {
    effect(() => {
      const ligaId = this.equipoLigaService.ligaSeleccionada()?.ligaId;
      if (ligaId) {
        void this.equipoDataService.cargarEquipoEnLiga(ligaId);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    const ligaId = this.equipoLigaService.ligaSeleccionada()?.ligaId;
    if (ligaId) {
      await this.equipoDataService.cargarEquipoEnLiga(ligaId);
    }
  }

  protected nombreEquipo(): string {
    return this.equipoDataService.equipoActual()?.nombre ?? 'No disponible';
  }

  protected saldoEquipo(): string {
    const presupuesto = this.equipoDataService.equipoActual()?.presupuesto;
    if (typeof presupuesto !== 'number') {
      return 'No disponible';
    }

    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(presupuesto);
  }

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
