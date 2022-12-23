import {renderAllPokemons, renderPokemonSearched, cleanPokemonList,  render20MorePokemons, searchPokemon} from './index.js'


export async function getAllPokemons() {

    cleanPokemonList();

    const loading = document.querySelector('#loading');
    loading.classList.remove('hidden');

    const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon')
    .then((resp) => resp.json())
    .then((resp) => {
        renderAllPokemons(resp.results)

        let nextBaseUrl = resp.next;

        return nextBaseUrl;
    })

    loading.classList.add('hidden')

    return pokemons;
}


export async function getPokemonByName(pokemonName){
    const loading = document.querySelector('#loading');
    const pokemonlist = document.querySelector('.pokemonsList__container');
    pokemonlist.innerHTML = '';
    loading.classList.remove('hidden');
    
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then((res) => res.json())
    .then((res) => {
        loading.classList.add('hidden');
        console.log(res.forms)
        renderPokemonSearched(res.forms[0])
        return res;
    })
    .catch((err) => {
        const warning = document.getElementById('warning');

        if (warning){
            cleanPokemonList()
            loading.classList.add('hidden');

            return;
        }
        else if(!warning){

            cleanPokemonList()
            const main = document.querySelector('main'); 
            loading.classList.add('hidden');
            
            main.insertAdjacentHTML('beforeend', `
            
            <p id="warning">Pokemon not found. Please try again.</p>
            `)
            return;
            
        } 
        return;
    })

    return pokemon;
};

export async function loadMorePokemons(baseURL){

    const totalPokemons = baseURL.slice(41, -9);
    
    const next20Pokemons = await fetch(baseURL, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((data) => {
        const {count, next, results} = data;

        let nextBaseUrl = next;

        render20MorePokemons(results);

        return nextBaseUrl;
   
    })

    return next20Pokemons;
}


getAllPokemons()


