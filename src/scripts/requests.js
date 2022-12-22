import {renderAllPokemons, searchPokemon, renderPokemonSearched, cleanPokemonList} from './index.js'

export async function getAllPokemons() {

    cleanPokemonList();

    const loading = document.querySelector('#loading');
    loading.classList.remove('hidden');

    const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon')
    .then((resp) => resp.json())
    .then((resp) => {
        renderAllPokemons(resp.results)
    })

    loading.classList.add('hidden')

    return pokemons;
}


export async function getPokemonByName(pokemonName){
    const loading = document.querySelector('#loading');
    loading.classList.remove('hidden');

    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then((res) => res.json())
    .then((res) => {
        loading.classList.add('hidden');
        console.log(res.forms)
        renderPokemonSearched(res.forms[0])
        return res;
    })
    .catch((err) => console.log(`er2ro ${err}`))

    return pokemon;
};

getAllPokemons()


