import { Injectable, inject } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { AuthState, TokenParams, decodeToken } from '@okta/okta-auth-js';
import { map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated$ = of(false);


  public async login(): Promise<void> {
    return;
  }

  public async logout(): Promise<boolean> {
    return false;
  }
}
