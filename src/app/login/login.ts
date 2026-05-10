import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../log-services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private auth = inject(AuthService);

  username = '';
  password = '';
  error    = '';
  loading  = false;
  showPw   = false;

  onLogin() {
    if (!this.username || !this.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }
    this.loading = true;
    this.error   = '';

    this.auth.login(this.username, this.password).subscribe({
      next: () => { this.loading = false; },          // app.html bascule automatiquement
      error: () => {
        this.loading  = false;
        this.error    = 'Identifiants incorrects';
        this.password = '';
      }
    });
  }
}
