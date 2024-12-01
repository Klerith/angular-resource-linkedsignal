import {
  Component,
  effect,
  inject,
  linkedSignal,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokeapi.response';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
})
export default class HomeComponent {
  private pokemonService = inject(PokemonService);
  // pokemonOptions = signal<Pokemon[]>([]);
  // selectedPokemon = signal<string>('');
  currentPage = signal(0);

  selectedPokemon = linkedSignal(() => {
    const selected = this.pokemonResource.hasValue()
      ? this.pokemonResource.value()![5].name
      : 'Ninguno';

    return selected;
  });

  pokemonResource = resource({
    request: () => ({ page: this.currentPage() }),

    loader: async ({ request }) => {
      const currentPage = request.page;
      return firstValueFrom(this.pokemonService.getPokemons(currentPage));
    },
  });

  loadNextPage() {
    this.currentPage.update((page) => page + 1);
  }

  onSelectedPokemon(value: string) {
    this.selectedPokemon.set(value);
  }

  // loadEffect = effect(() => {
  //   this.pokemonService.getPokemons().subscribe((pokemons) => {
  //     this.selectedPokemon.set(pokemons[5].name);
  //     this.pokemonOptions.set(pokemons);
  //   });
  // });

  // ngOnInit() {
  //   this.pokemonService.getPokemons().subscribe((pokemons) => {
  //     this.selectedPokemon.set(pokemons[5].name);
  //     this.pokemonOptions.set(pokemons);
  //   });
  // }
}
