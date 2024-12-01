import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import type { PokeapiResponse, Pokemon } from '../interfaces/pokeapi.response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon')
      .pipe(
        map(({ results }) => results),
        delay(2000),
        tap(console.log)
      );
  }
}
