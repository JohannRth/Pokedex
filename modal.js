// Zeige die Pokémon-Details im Modal an
async function showPokemonDetails(pokemonId) {
    let pokemonData = await fetchPokemonData(pokemonId); // Abrufe der Pokémon-Daten
    if (!pokemonData) return; // Fehlerbehandlung, falls Daten nicht geladen werden konnten
    
    updateModalContent(pokemonData, pokemonId);  // Update des Modal-Inhalts (Bild, Typen, Stats, Navigation)
    setModalBackground(pokemonData);  // Setze den Hintergrund entsprechend des Haupttyps
    
    openModal();  // Öffne das Modal
    
    setupNavigationButtons(pokemonId);  // Setze die Navigation für die Pfeiltasten (Vorheriges/Nächstes Pokémon)
}

// Abrufe der Pokémon-Daten von der API
async function fetchPokemonData(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    let pokemonData = await fetchDataJson(url);
    if (!pokemonData) {
        console.error('Pokémon-Daten konnten nicht geladen werden:', pokemonId);
    }
    return pokemonData;
}

// Update des Modal-Inhalts (Bild, Typen, Stats und Navigationspfeile)
function updateModalContent(pokemonData, pokemonId) {
    let modalBody = document.getElementById('pokemonModalBody');
    modalBody.innerHTML = generatePokemonDetails(pokemonData, pokemonId);

    let modalTitle = document.getElementById('pokemonModalLabel');
    modalTitle.textContent = `#${pokemonData.id} ${capitalizeFirstLetter(pokemonData.name)}`;
}

// Setze den Hintergrund des Modals auf den Haupttyp des Pokémon
function setModalBackground(pokemonData) {
    let mainType = pokemonData.types[0].type.name;
    document.getElementById('pokemonModalContent').className = `modal-content type-${mainType}`;
}

// Öffne das Modal
function openModal() {
    let myModal = new bootstrap.Modal(document.getElementById('pokemonModal'));
    myModal.show();
}

// Setze die Navigation für die Pfeiltasten (Vorheriges und Nächstes Pokémon)
function setupNavigationButtons(pokemonId) {
    document.getElementById('prevPokemon').addEventListener('click', () => navigatePokemon(pokemonId - 1));
    document.getElementById('nextPokemon').addEventListener('click', () => navigatePokemon(pokemonId + 1));
}

// Navigation zwischen den Pokémon (Vorheriges/Nächstes)
function navigatePokemon(newPokemonId) {
    if (newPokemonId > 0 && newPokemonId <= MAX_POKEMON) {
        showPokemonDetails(newPokemonId);
    }
}

