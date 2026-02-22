import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// TODO: Importar el servicio de usuario cuando esté listo
// import { UserService } from '../../services/user.service';

// TODO: Importar la interfaz de usuario
// import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-settings',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-settings.html',
  styleUrl: './user-settings.css',
})
export class UserSettings implements OnInit {

  userId: string | null = null;

  // TODO: Inyectar el servicio de usuario cuando esté listo
  // userService = inject(UserService);

  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.profileForm = new FormGroup({
      username:  new FormControl(null, [Validators.required, Validators.minLength(3)]),
      fullName:  new FormControl(null, [Validators.required]),
      email:     new FormControl(null, [Validators.required, Validators.email]),
      birthDate: new FormControl(null, []),
    });

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required]),
      newPassword:     new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),

      // TODO: Añadir validador personalizado a nivel de grupo para
      // comprobar que newPassword y confirmPassword coinciden
    });
  }

  ngOnInit(): void {
    // TODO: Llamar al backend con el userId para traer los datos del usuario
    // y rellenar el formulario con patchValue()
    //
    // this.userService.getProfile(this.userId).subscribe((user: IUser) => {
    //   this.profileForm.patchValue({
    //     username:  user.username,
    //     fullName:  user.fullName,
    //     email:     user.email,
    //     birthDate: user.birthDate,
    //   });
    // });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;

    // TODO: Enviar datos actualizados al backend
    //
    // let user = this.profileForm.value as IUser;
    // this.userService.updateProfile(user).subscribe(() => {
    //   alert('Perfil actualizado correctamente');
    // });

    console.log('Guardar perfil:', this.profileForm.value);
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) return;

    // TODO: Enviar cambio de contraseña al backend
    //
    // this.userService.updatePassword({
    //   currentPassword: this.passwordForm.value.currentPassword,
    //   newPassword:     this.passwordForm.value.newPassword,
    // }).subscribe(() => {
    //   alert('Contraseña actualizada correctamente');
    //   this.passwordForm.reset();
    // });

    console.log('Actualizar contraseña:', this.passwordForm.value);
  }

  deleteAccount(): void {
    // TODO: Mostrar modal de confirmación antes de llamar al backend
    //
    // this.userService.deleteAccount(this.userId).subscribe(() => {
    //   // Cerrar sesión y redirigir al login
    // });

    console.log('Eliminar cuenta');
  }

  checkControl(formGroup: FormGroup, formControlName: string, validator: string): boolean | undefined {
    return formGroup.get(formControlName)?.hasError(validator) &&
      formGroup.get(formControlName)?.touched;
  }
}
