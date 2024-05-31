import { Injectable, inject } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from './hero';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private http = inject(HttpClient);
  private router = inject(Router);

  getFeaturedHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('/api/featured').pipe(
      map(res => res || [])
    );
  }

  getHeroes(): Observable<Hero[]> {
    const currentUrl = this.router.routerState.snapshot.url;

    // catch error, and respond
    return this.http.get<Hero[]>('/api/heroes').pipe(
      map(res => res || [])
    );
  }
}

