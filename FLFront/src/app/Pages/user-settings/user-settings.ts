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

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.profileForm = new FormGroup({
      username:  new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email:     new FormControl(null, [Validators.required, Validators.email]),
      birthDate: new FormControl(null, [])
    });
  }

  ngOnInit(): void {
    // TODO: Llamar al backend con el userId para traer los datos del usuario
    // y rellenar el formulario con patchValue()
    //
    // this.userService.getProfile(this.userId).subscribe((user: IUser) => {
    //   this.profileForm.patchValue({
    //     username:  user.username,
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


  checkControl(formGroup: FormGroup, formControlName: string, validator: string): boolean | undefined {
    return formGroup.get(formControlName)?.hasError(validator) &&
      formGroup.get(formControlName)?.touched;
  }
}
