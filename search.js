function searchPokemon() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(handleSearch, 300);
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    if (searchTerm.length < 3) {
        showAllPokemons();
    } else {
        filterAndShowPokemons(searchTerm);
    }
}

function showAllPokemons() {
    currentPokemons = [...pokemons];
    renderListOfPokemons(currentPokemons);
}

function filterAndShowPokemons(searchTerm) {
    currentPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    renderListOfPokemons(currentPokemons);
}