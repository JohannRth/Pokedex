// Generiere den Inhalt des Modals (Bild, Typen, Stats und Navigation)
function generatePokemonDetails(pokemonData, pokemonId) {
    return `
        <div class="pokemon-modal-content text-center">
            <img src="${pokemonData.sprites.other['official-artwork'].front_default}" class="img-fluid mb-3" alt="${pokemonData.name}">
            <div class="poke-card-type-box mb-3">
                ${renderPokemonTypes(pokemonData.types)}
            </div>
            <div class="pokemon-stats mb-3">
                <h6>Stats:</h6>
                ${generateProgressBars(pokemonData.stats)}
            </div>
            <div class="pokemon-navigation d-flex justify-content-between">
                <button id="prevPokemon" class="btn btn-primary">
                    <i class="bi bi-arrow-left"></i> Previous
                </button>
                <button id="nextPokemon" class="btn btn-primary">
                    Next <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// Generiere die Fortschrittsbalken für die Pokémon-Stats
function generateProgressBars(stats) {
    return stats.map(stat => {
        return `
            <div class="progress-container mb-2">
                <span class="stat-name">${capitalizeFirstLetter(stat.stat.name)}: ${stat.base_stat}</span>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${stat.base_stat}%" aria-valuenow="${stat.base_stat}" aria-valuemin="0" aria-valuemax="100">${stat.base_stat}</div>
                </div>
            </div>
        `;
    }).join('');
}