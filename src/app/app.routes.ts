import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth';

export const routes: Routes = [
  { path: 'login',        loadComponent: () => import('./login/login').then(m => m.LoginComponent) },
  { path: 'dashboard',    canActivate: [authGuard], loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'stock',        canActivate: [authGuard], loadComponent: () => import('./stock/stock').then(m => m.Stock) },
  { path: 'ventes',       canActivate: [authGuard], loadComponent: () => import('./ventes/ventes').then(m => m.Ventes) },
  { path: 'commandes',    canActivate: [authGuard], loadComponent: () => import('./commandes/commandes').then(m => m.Commandes) },
  { path: 'fournisseur',  canActivate: [authGuard], loadComponent: () => import('./fournisseur/fournisseur').then(m => m.Fournisseur) },
  { path: 'new-order',    canActivate: [authGuard], loadComponent: () => import('./new-order/new-order').then(m => m.NewOrder) },
  { path: 'a-propos',     canActivate: [authGuard], loadComponent: () => import('./a-propos/a-propos').then(m => m.APropos) },
  { path: '',             redirectTo: 'login', pathMatch: 'full' },
  { path: '**',           redirectTo: 'login' },
];
