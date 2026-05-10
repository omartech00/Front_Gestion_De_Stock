import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  // Route publique
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  },

  // Routes protégées
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'stock',
    canActivate: [authGuard],
    loadComponent: () => import('./stock/stock').then(m => m.Stock)
  },
  {
    path: 'ventes',
    canActivate: [authGuard],
    loadComponent: () => import('./ventes/ventes').then(m => m.Ventes)
  },
  {
    path: 'commandes',
    canActivate: [authGuard],
    loadComponent: () => import('./commandes/commandes').then(m => m.Commandes)
  },
  {
    path: 'fournisseur',
    canActivate: [authGuard],
    loadComponent: () => import('./fournisseur/fournisseur').then(m => m.Fournisseur)
  },

  { path: '',   redirectTo: 'login', pathMatch: 'full' },  // ← par défaut → login
  { path: '**', redirectTo: 'login' },                     // ← route inconnue → login
];
