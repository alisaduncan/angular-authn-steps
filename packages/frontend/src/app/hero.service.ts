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

  getFeaturedHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('/api/featured').pipe(
      map(res => res || [])
    );
  }

  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>('/api/heroes').pipe(
      map(res => res || [])
    );
  }
}

