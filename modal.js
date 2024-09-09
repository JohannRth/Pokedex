function showPokemonModal(pokemonId) {
    let pokemon = getPokemonFromCache(pokemonId);
    if (!pokemon) return;

    let mainType = getPokemonMainType(pokemon);

    setModalType(mainType);
    setModalHeader(pokemon);
    setModalBody(pokemon);

    // Bootstrap Modal anzeigen
    let pokemonModal = new bootstrap.Modal(document.getElementById('pokemonModal'));
    pokemonModal.show();
}

// Holt das Pokémon aus dem Cache basierend auf der ID
function getPokemonFromCache(pokemonId) {
    return Object.values(pokemonDetailsCache).find(pokemon => pokemon.id === pokemonId);
}

// Holt den Haupttyp des Pokémons (erster Typ in der Liste)
function getPokemonMainType(pokemon) {
    return pokemon.types[0].type.name;
}

// Setzt die Typenklasse basierend auf dem Haupttyp für das gesamte Modal (modal-content)
function setModalType(mainType) {
    let modalContent = document.querySelector('.modal-content');
    modalContent.className = 'modal-content';  // Setzt die Klasse zurück
    modalContent.classList.add(`type-${mainType}`);  // Fügt die Typenklasse hinzu
}

// Setzt den Header des Modals mit der ID und dem Namen des Pokémons
function setModalHeader(pokemon) {
    document.getElementById('pokemonModalLabel').innerHTML = `#${pokemon.id} - ${pokemon.name}`;
}

// Zeigt das nächste Pokémon im Modal an
function nextPokemon(currentId) {
    let nextIndex = getNextIndex(currentId);
    showNewPokemonModal(nextIndex);
}

// Zeigt das vorherige Pokémon im Modal an
function previousPokemon(currentId) {
    let prevIndex = getPreviousIndex(currentId);
    showNewPokemonModal(prevIndex);
}

// Hilfsfunktion, um das nächste Pokémon in der Liste zu finden
function getNextIndex(currentId) {
    let currentIndex = getCurrentIndex(currentId);
    return (currentIndex + 1) % pokemons.length;
}

// Hilfsfunktion, um das vorherige Pokémon in der Liste zu finden
function getPreviousIndex(currentId) {
    let currentIndex = getCurrentIndex(currentId);
    return (currentIndex - 1 + pokemons.length) % pokemons.length;
}

// Findet den aktuellen Index des Pokémons in der Liste
function getCurrentIndex(currentId) {
    return pokemons.findIndex(pokemon => pokemonDetailsCache[pokemon.name].id === currentId);
}

// Schließt das aktuelle Modal und zeigt das neue Pokémon-Modal an
function showNewPokemonModal(pokemonIndex) {
    let newPokemon = pokemons[pokemonIndex];

    closeCurrentModal();
    showPokemonModal(pokemonDetailsCache[newPokemon.name].id);
}

// Schließt das aktuelle Pokémon-Modal
function closeCurrentModal() {
    let pokemonModal = bootstrap.Modal.getInstance(document.getElementById('pokemonModal'));
    pokemonModal.hide();
}