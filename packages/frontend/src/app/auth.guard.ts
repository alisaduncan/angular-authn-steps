import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state, authService = inject(AuthService)) => {
  return authService.isAuthenticated$;
};
