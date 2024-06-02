import { Injectable, inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { AuthState, TokenParams, decodeToken } from '@okta/okta-auth-js';
import { map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oktaAuth = inject(OKTA_AUTH);
  private oktaAuthStateService = inject(OktaAuthStateService);
  public isAuthenticated$ = this.oktaAuthStateService.authState$.pipe(
    map((authState: AuthState) => authState.isAuthenticated ?? false)
  );
  
  public accessToken(): string {
    return this.oktaAuth.getAccessToken() ?? '';
  }

  public idTokenClaim(): string {
    return decodeToken(this.oktaAuth.getIdToken() ?? '').payload.name ?? '';
  }

  public async login(): Promise<void> {
    return this.oktaAuth.signInWithRedirect();
  }

  public async logout(): Promise<boolean> {
    return this.oktaAuth.signOut();
  }
}
