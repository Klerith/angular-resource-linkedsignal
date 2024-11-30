import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokeapi.response';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  pokemonOptions = signal<Pokemon[]>([]);
  selectedPokemon = signal<string>('');

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((pokemons) => {
      this.selectedPokemon.set(pokemons[5].name);
      this.pokemonOptions.set(pokemons);
    });
  }
}
