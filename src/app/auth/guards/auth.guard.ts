import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { Observable, tap } from 'rxjs';

export const authGuard =():Observable<boolean> =>{

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
  .pipe(
    tap( isAuthenticated => console.log('Authenticated:', isAuthenticated)),
    tap(isAuthenticated => {
      if(!isAuthenticated){
        router.navigate(['./auth/login'])
      }
    }),
  )
}
