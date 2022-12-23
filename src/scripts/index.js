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

    const input = document.querySelector('input');

    const pokemonName = searchButton.addEventListener('click', (event) => {
        const inputValue = input.value.trim().toLowerCase();

        if(inputValue === ''){
            return;
        } 
        return getPokemonByName(inputValue);
               
    });

    input.addEventListener('keydown', (event) => {
        const inputValue = input.value.trim().toLowerCase();

        if(event.key === 'Enter'){
            return getPokemonByName(inputValue);
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
        const warning = document.getElementById('warning');

        if(event.target.value ==''){
            if(warning){
                warning.remove();
            }
            return getAllPokemons();
        }
    })

}

export function cleanPokemonList(){
    const pokemonList = document.querySelector('.pokemonsList__container');

    pokemonList.innerHTML = '';
}

export async function scrollAndLoad(){
        
    window.addEventListener('scroll', () => {

        if(window.scrollY + window.innerHeight >=document.documentElement.scrollHeight){
            checkScroll()
        }

    })
    
}

async function checkScroll(){

    if(!baseNextRequest){
        const warning = document.getElementById('warning');

        if(!warning){
            const main = document.querySelector('main'); 
            
            main.insertAdjacentHTML('beforeend', `
            
            <p id="warning">All pokemons are above.</p>
            `)
            return;
            
        }
        return;
    }

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

function logoReload(){
    const logo = document.querySelector('#pokeApiLogo');
    const input = document.querySelector('.nav__container > input');

    logo.addEventListener('click', () => {
        input.value = '';
        return getAllPokemons();
        
    })
}

scrollAndLoad()
searchPokemon()
cleanInput()
logoReload()
