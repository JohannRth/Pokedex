// Suchfunktion mit Debouncing
function searchPokemon() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(handleSearch, 300);
}

// Überprüfe den Suchbegriff und filtere Pokémon, wenn nötig
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    searchTerm.length < 3 ? showAllPokemons() : filterAndShowPokemons(searchTerm);
}

// Zeige alle geladenen Pokémon an
function showAllPokemons() {
    currentPokemons = allPokemons;
    renderListOfPokemons(currentPokemons);
}

// Filtere Pokémon nach dem Suchbegriff und zeige sie an
function filterAndShowPokemons(searchTerm) {
    currentPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    renderListOfPokemons(currentPokemons);
}