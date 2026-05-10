import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../log-services/auth-service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;          // ✅ connecté → accès autorisé
  }

  router.navigate(['/login']);
  return false;           // ❌ pas connecté → retour login
};
