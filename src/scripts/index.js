import {getAllPokemons, getPokemonByName, loadMorePokemons} from './requests.js'

let baseNextRequest = await getAllPokemons();

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
        if(input.value == ''){
            return;
        }
        return getPokemonByName(input.value.toLowerCase().trim())
       
    });

    input.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            return getPokemonByName(input.value.toLowerCase().trim());
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

function scrollendLoad(){
    const element = document.querySelector("body");
    const output = document.querySelector("main");

    window.addEventListener("scroll", (event) => {
        console.log(document.documentElement.scrollTop)
        console.log(window.innerHeight)
        console.log(`body height`, document.body.scrollHeight)

    });

}

export async function scrollAndLoad(){
        
    window.addEventListener('scroll', () => {

        if(window.scrollY + window.innerHeight >=document.documentElement.scrollHeight){
            checkScroll()
        }

    })
    
}

async function checkScroll(){

    const newBaseNexRequest = await loadMorePokemons(baseNextRequest);

    baseNextRequest = newBaseNexRequest; //change value of baseNexresquest;

    return baseNextRequest


}

export function render20MorePokemons(pokemonsArray){
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
    
}


scrollAndLoad()
searchPokemon()
cleanInput()
scrollendLoad()