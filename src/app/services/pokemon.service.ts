import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs';
import type { PokeapiResponse } from '../interfaces/pokeapi.response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  getPokemons() {
    return this.http
      .get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon')
      .pipe(
        map(({ results }) => results),
        delay(2000),
        tap(console.log)
      );
  }
}
