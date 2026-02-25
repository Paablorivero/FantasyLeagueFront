import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LigasService } from '../../Services/ligas.service';
import { Ligaclasificaciondto } from '../../interfaces/dtos/ligaclasificaciondto.interface';

@Component({
  selector: 'app-liga-clasificacion',
  imports: [RouterLink],
  templateUrl: './liga-clasificacion.html',
  styleUrl: './liga-clasificacion.css',
})
export class LigaClasificacion implements OnInit {
  private ligasService = inject(LigasService);
  private route = inject(ActivatedRoute);

  clasificacion = signal<Ligaclasificaciondto[]>([]);
  cargando = signal(false);
  error = signal('');
  ligaId = signal('');
  nombreLiga = signal('');

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async params => {
      const id = params['ligaId'];
      const nombre = params['nombreLiga'];
      if (id) {
        this.ligaId.set(id);
        this.nombreLiga.set(nombre ?? '');
        await this.cargarClasificacion(id);
      } else {
        this.error.set('No se ha especificado una liga.');
      }
    });
  }

  private async cargarClasificacion(ligaId: string): Promise<void> {
    this.cargando.set(true);
    this.error.set('');
    try {
      const data = await this.ligasService.getClasificacionLiga(ligaId);
      // Ordenar por puntos descendente
      const ordenada = [...data].sort((a, b) => Number(b.puntos) - Number(a.puntos));
      this.clasificacion.set(ordenada);
    } catch {
      this.error.set('No se pudo cargar la clasificación. Inténtalo de nuevo.');
    } finally {
      this.cargando.set(false);
    }
  }
}
