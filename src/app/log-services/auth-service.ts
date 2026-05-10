import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://127.0.0.1:8000/api';

  // ← Signal réactif : Angular re-render automatiquement quand il change
  isLoggedIn = signal<boolean>(this.checkToken());

  login(username: string, password: string) {
    return this.http.post<{ access: string; refresh: string }>(
      `${this.apiUrl}/token/`, { username, password }
    ).pipe(
      tap(tokens => {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        this.isLoggedIn.set(true);   // ← déclenche le re-render
      })
    );
  }

  refreshToken() {
    return this.http.post<{ access: string }>(
      `${this.apiUrl}/token/refresh/`,
      { refresh: localStorage.getItem('refresh_token') }
    ).pipe(tap(res => localStorage.setItem('access_token', res.access)));
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn.set(false);      // ← déclenche le re-render
    this.router.navigate(['/login']);
  }

  getToken() { return localStorage.getItem('access_token'); }

  private checkToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch { return false; }
  }
}
