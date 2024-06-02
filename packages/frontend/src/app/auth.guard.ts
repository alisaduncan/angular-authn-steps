import { CanActivateFn } from '@angular/router';
import { ACR_VALUES_2FA, AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state, authService = inject(AuthService)) => {
  return authService.isAuthenticated$;
};

export const stepUpGuard: CanActivateFn = (route, state, authService = inject(AuthService)) => {
  if (authService.idTokenAcrClaim() === route.data['acrVal']) {
    return true;
  }

  authService.login(route.data['acrVal'], state.url);
  return false;
};
