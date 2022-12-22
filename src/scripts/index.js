import {getAllPokemons, getPokemonByName} from './requests.js'

export function renderAllPokemons(pokemonsArray){

    const pokemonList = document.querySelector('.pokemonsList__container');

    const pokemons = pokemonsArray.forEach(({name, url}) => {
        pokemonList.insertAdjacentHTML('beforeend', 
        `
        <li data-id=${url.slice(34, -1)}>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.slice(34, -1)}.png' alt="Pokemon ${name}">
            <h2>${name}</h2>
        </li>
        
        `)
    })

    return pokemons;
}

export function searchPokemon(){
    const searchButton = document.querySelector('.nav__container > button');
    const input = document.querySelector('.nav__container > input');

    const pokemonName = searchButton.addEventListener('click', (event) => {

        return getPokemonByName(input.value)
       
    });

    input.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            return getPokemonByName(input.value);
        }

    })

}



export function renderPokemonSearched({name, url}){

    cleanPokemonList();
    console.log({name, url})

    const pokemonList = document.querySelector('.pokemonsList__container');

    console.log(name, url)

    pokemonList.insertAdjacentHTML('beforeend', `
        <li data-id=${url.slice(38, -1)}>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.slice(38, -1)}.png' alt="Pokemon ${name}">
            <h2>${name}</h2>
        </li>
    
    `)

    return pokemonList;
}

function cleanInput(){
    const input = document.querySelector('.nav__container > input');

    input.addEventListener('input', (event) => {
        if(event.target.value ==''){
            return getAllPokemons();
        }
    })

}

export function cleanPokemonList(){
    const pokemonList = document.querySelector('.pokemonsList__container');

    pokemonList.innerHTML = '';
}

searchPokemon()
cleanInput()