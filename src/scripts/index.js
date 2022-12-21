/* 
<li data-id="1">
    <img src="/src/assets/1 2.png" alt="">
    <h2>Magikarp</h2>
</li>
*/

function renderAllPokemons(pokemonsArray){

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