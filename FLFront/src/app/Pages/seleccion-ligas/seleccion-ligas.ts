import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { LigasService } from '../../Services/ligas.service';
import { Liga } from '../../interfaces/liga.interface';
import { TarjetaSeleccion } from '../../Components/tarjeta-seleccion/tarjeta-seleccion';
import {FormsModule} from '@angular/forms';
import {EquipoligaService} from '../../Services/equipoliga.service';

@Component({
  selector: 'app-seleccion-ligas',
  imports: [RouterLink, TarjetaSeleccion, FormsModule],
  templateUrl: './seleccion-ligas.html',
  styleUrl: './seleccion-ligas.css',
})
export class SeleccionLigas implements OnInit {
  private ligasService = inject(LigasService);

  private equipoLigaService = inject(EquipoligaService);

  private router: Router = inject(Router);

  private cdr = inject(ChangeDetectorRef);
  allLigas: Liga[] = [];
  ligasDisponibles: Liga[] = [];
  loading = false;
  error = '';

  // Modal para el nombre del equipo, cuando pulse unir ligas
  mostrarModal = false;

  // Campo para el nombre del equipo
  nombreEquipo: string;

  constructor(){
    this.nombreEquipo = '';
  }

  ngOnInit(): void {
    this.loadLigas();
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
      console.log(this.ligasDisponibles);
    } catch {
      // Si falla ligas disponibles no bloqueamos la página
    }

    this.loading = false;
    this.cdr.detectChanges();
  }

  abrirModal(){
    console.log("Modal Abrir");
    this.mostrarModal = true;
  };

  async confirmarUnirse() {

    const liga = this.equipoLigaService.ligaSeleccionada();

    if (!liga || !this.nombreEquipo.trim()) return;

    try {
      const equipo = await this.ligasService.unirseLiga(liga.ligaId, this.nombreEquipo);

      this.equipoLigaService.setEquipo(equipo);
      console.log(equipo);

      this.nombreEquipo = '';
      this.mostrarModal = false;

      await this.loadLigas();

      this.router.navigate(['/daznfantasy/plantilla']);
    } catch (e) {
      console.error(e);
    }
  }
}
