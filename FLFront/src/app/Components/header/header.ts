import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isLogedIn: boolean = false;
  menuOpen = signal(false);
  router = inject(Router);

  ngOnInit(): void{
    if (localStorage.getItem('token')) {
      this.isLogedIn = true;
    } else {
      this.isLogedIn = false;
    }
    console.log("Estado del log en el navar = ", this.isLogedIn);
  }

  mostrarBotonEntrar(): boolean {
    const rutasOcultas = ['/daznfantasy/login', '/daznfantasy/register'];
    return !rutasOcultas.includes(this.router.url);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
