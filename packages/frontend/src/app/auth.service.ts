import { Injectable, inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { AuthState, TokenParams, decodeToken } from '@okta/okta-auth-js';
import { map, of } from 'rxjs';

export const ACR_VALUES_2FA = 'urn:okta:loa:2fa:any';

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

  public idTokenAcrClaim(): string {
    return decodeToken(this.oktaAuth.getIdToken() ?? '').payload.acr ?? '';
  }

  public async login(acrVal?: string, route?: string): Promise<void> {
    const options:TokenParams = { acrValues:acrVal ?? undefined };

    if (route) {
      this.oktaAuth.setOriginalUri(route);
    }

    return this.oktaAuth.signInWithRedirect(options);
  }

  public async logout(): Promise<boolean> {
    return this.oktaAuth.signOut();
  }
}
