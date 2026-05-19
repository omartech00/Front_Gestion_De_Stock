import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../log-services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  // Ajout automatique du token
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {

      // 🔥 TOKEN EXPIRÉ → REFRESH
      if (err.status === 401 && auth.refreshToken()) {

        return auth.refreshToken().pipe(
          switchMap((res: any) => {

            // ✅ IMPORTANT : sauvegarde du nouveau token
            auth.saveToken(res.access);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.access}`
              }
            });

            return next(retryReq);
          }),

          catchError((refreshError) => {
            auth.logout();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
