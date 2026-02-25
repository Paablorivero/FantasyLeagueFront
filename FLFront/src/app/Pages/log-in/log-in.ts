import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {Userlogin} from '../../interfaces/userlogin.interface';
import {AuthServiceService} from '../../Services/auth-service.service';

@Component({
  selector: 'app-log-in',
  imports: [RouterLink, FormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {

  passwordVisible: boolean = false;

  // Defino la propiedad del formulario
  protected loginData: Userlogin;

  // Inyecto el authService

  private authService = inject(AuthServiceService);

  // Inyecto el servicio Router
  private router: Router = inject(Router);

  constructor(){
    // Inicializo la propiedad loginData
    this.loginData = {
      username: '',
      password: '',
    };
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  protected async onSubmit(loginForm: Userlogin) {
    this.loginData = loginForm;

    try {
      await this.authService.loginUser(this.loginData);

      this.router.navigate(['/daznfantasy/dashboard/home']);

      console.log('log in successfully');

    } catch {

      console.log('login failed');

    }
  }
}
