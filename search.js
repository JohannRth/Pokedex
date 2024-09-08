// Suchfunktion mit Debouncing
function searchPokemon() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(handleSearch, 300);  // Verzögere die Suchabfrage um 300ms
}

// Überprüfe den Suchbegriff und filtere Pokémon, wenn nötig
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Wenn der Suchbegriff weniger als 3 Zeichen hat, zeige alle geladenen Pokémon an
    if (searchTerm.length < 3) {
        showAllPokemons();
    } else {
        filterAndShowPokemons(searchTerm);
    }
}

// Zeige alle geladenen Pokémon an (reset auf die komplette Liste)
function showAllPokemons() {
    currentPokemons = [...pokemons];  // Verwende die komplette Pokémon-Liste (alle geladenen Pokémon)
    renderListOfPokemons(currentPokemons);
}

// Filtere Pokémon nach dem Suchbegriff und zeige sie an
function filterAndShowPokemons(searchTerm) {
    // Suche nur in den bereits geladenen Pokémon (pokemons)
    currentPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    renderListOfPokemons(currentPokemons);
}