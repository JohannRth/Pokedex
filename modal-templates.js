function setModalBody(pokemon) {
    let modalContent = `
        <div class="text-center">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" class="poke-img-lg img-fluid">
        </div>
        <div class="types text-center my-3">
            ${renderPokemonTypes(pokemon.types)}
        </div>
        <div class="stats">
            ${renderProgressBar('HP', pokemon.stats[0].base_stat)}
            ${renderProgressBar('Attack', pokemon.stats[1].base_stat)}
            ${renderProgressBar('Defense', pokemon.stats[2].base_stat)}
            ${renderProgressBar('Special Attack', pokemon.stats[3].base_stat)}
            ${renderProgressBar('Special Defense', pokemon.stats[4].base_stat)}
            ${renderProgressBar('Speed', pokemon.stats[5].base_stat)}
        </div>
        <div class="modal-footer d-flex justify-content-around">
            <button id="previousButton" class="btn btn-primary" onclick="previousPokemon(${pokemon.id})">Previous</button>
            <button id="nextButton" class="btn btn-primary" onclick="nextPokemon(${pokemon.id})">Next</button>
        </div>
    `;

    document.getElementById('pokemonModalContent').innerHTML = modalContent;
}

function renderProgressBar(statName, value) {
    // Definiere eine maximale Skala für den Fortschrittsbalken
    const MAX_STAT_VALUE = 200;  // Höchster Wert, den ein Pokémon-Stat erreichen kann (als Beispiel)
    
    // Berechne die Breite des Fortschrittsbalkens proportional zum Wert
    const percentage = Math.min(100, (value / MAX_STAT_VALUE) * 100);

    return `
        <div class="progress mb-2">
            <div class="progress-bar" role="progressbar" style="width: ${percentage}%" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="${MAX_STAT_VALUE}">
                ${statName}: ${value}
            </div>
        </div>
    `;
}