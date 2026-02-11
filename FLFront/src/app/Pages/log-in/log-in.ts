import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-log-in',
  imports: [RouterLink],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {
  passwordVisible: boolean = false;

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
