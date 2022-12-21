async function getAllPokemons() {

    const loading = document.querySelector('#loading');
    
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon')
    .then((resp) => resp.json())
    .then((resp) => {
        renderAllPokemons(resp.results)
    })

    loading.classList.add('hidden')
    
    return pokemons;
}

getAllPokemons()


