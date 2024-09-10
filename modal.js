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

function getPokemonFromCache(pokemonId) {
    return Object.values(pokemonDetailsCache).find(pokemon => pokemon.id === pokemonId);
}

function getPokemonMainType(pokemon) {
    return pokemon.types[0].type.name;
}

function setModalType(mainType) {
    let modalContent = document.querySelector('.modal-content');
    modalContent.className = 'modal-content'; 
    modalContent.classList.add(`type-${mainType}`);
}

function setModalHeader(pokemon) {
    document.getElementById('pokemonModalLabel').innerHTML = `#${pokemon.id} - ${capitalizeFirstLetter(pokemon.name)}`;
}

function nextPokemon(currentId) {
    let nextIndex = getNextIndex(currentId);
    showNewPokemonModal(nextIndex);
}

function previousPokemon(currentId) {
    let prevIndex = getPreviousIndex(currentId);
    showNewPokemonModal(prevIndex);
}

function getNextIndex(currentId) {
    let currentIndex = getCurrentIndex(currentId);
    return (currentIndex + 1) % pokemons.length;
}

function getPreviousIndex(currentId) {
    let currentIndex = getCurrentIndex(currentId);
    return (currentIndex - 1 + pokemons.length) % pokemons.length;
}

function getCurrentIndex(currentId) {
    return pokemons.findIndex(pokemon => pokemonDetailsCache[pokemon.name].id === currentId);
}

function showNewPokemonModal(pokemonIndex) {
    let newPokemon = pokemons[pokemonIndex];

    closeCurrentModal();
    showPokemonModal(pokemonDetailsCache[newPokemon.name].id);
}

function closeCurrentModal() {
    let pokemonModal = bootstrap.Modal.getInstance(document.getElementById('pokemonModal'));
    pokemonModal.hide();
}