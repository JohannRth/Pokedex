function searchPokemon() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Leere die aktuelle Anzeige vor jeder neuen Suche
    document.getElementById('content').innerHTML = '';

    // Wenn der Suchbegriff weniger als 3 Zeichen hat, zeige alle geladenen Pokémon
    if (searchTerm.length < 3) {
        renderListOfPokemons(pokemons);
        return;
    }

    // Suche nach Pokémon, deren Namen den Suchbegriff enthalten
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));

    // Zeige die gefilterten Pokémon an
    renderListOfPokemons(filteredPokemons);
}
