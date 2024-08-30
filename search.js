function searchPokemon() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));

    // Leere die aktuelle Anzeige und zeige die gefilterten Pokémon an
    document.getElementById('content').innerHTML = '';
    renderListOfPokemons(filteredPokemons);

    // Falls das Suchfeld leer ist, zeige alle geladenen Pokémon
    if (searchTerm === '') {
        renderListOfPokemons(pokemons);
    }
}