import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import type { PokeapiResponse } from '../interfaces/pokeapi.response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  getPokemons() {
    return this.http
      .get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon')
      .pipe(tap(console.log));
  }
}
