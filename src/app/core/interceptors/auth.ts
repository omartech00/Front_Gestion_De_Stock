import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../log-services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  // Ajoute le token à chaque requête
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      // Token expiré → refresh automatique
      if (err.status === 401) {
        return auth.refreshToken().pipe(
          switchMap(res => next(
            req.clone({ setHeaders: { Authorization: `Bearer ${res.access}` } })
          )),
          catchError(() => {
            auth.logout(); // refresh échoué → retour au login
            return throwError(() => err);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
