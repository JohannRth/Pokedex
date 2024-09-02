let loadLimit = 26;
let offset = 0; // Start-Offset für die API-Abfrage
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?`;
let pokemons = [];
const MAX_POKEMON = 151; // Maximale Anzahl von Pokémon

function init() {
    importPokemons();
}

async function fetchDataJson(url) {
    let response = await fetch(url);
    return response.json();
}

async function importPokemons() {
    showLoadingScreen(); // Lade-Screen anzeigen
    let url = `${BASE_URL}offset=${offset}&limit=${loadLimit}`;
    let data = await fetchDataJson(url);
    pokemons = pokemons.concat(data.results); // Neue Daten zu bestehenden hinzufügen
    await renderListOfPokemons(data.results); // Nur die neu geladenen Pokémon rendern
    hideLoadingScreen(); // Lade-Screen verbergen
}

async function renderListOfPokemons(array) {
    let content = document.getElementById('content');
    for (let i = 0; i < array.length; i++) {
        let pokemonObj = array[i];
        let pokemonData = await fetchDataJson(pokemonObj.url);  // Detaildaten für jedes Pokémon abrufen
        let pokemonHTML = generateTable(i + offset, pokemonData);  // Übergeben der Detaildaten an generateTable
        content.insertAdjacentHTML('beforeend', pokemonHTML);
    }
}

// Funktion zum Anzeigen des Lade-Screens
function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'flex';
}

// Funktion zum Verbergen des Lade-Screens
function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
}

// Funktion zum Laden weiterer Pokémon
function loadMorePokemons() {
    if (offset < MAX_POKEMON) {
        offset += loadLimit;
        if (offset + loadLimit > MAX_POKEMON) {
            loadLimit = MAX_POKEMON - offset;
        }
        importPokemons();
    }
    // Button ausblenden, wenn das Limit erreicht ist
    if (offset + loadLimit >= MAX_POKEMON) {
        document.querySelector('#loadMoreButton').style.display = 'none';
    }
}

// Funktion zum Laden von 151 Pokémon
function loadAllPokemons() {
    loadLimit = MAX_POKEMON;
    offset = 0;
    document.getElementById('content').innerHTML = '';
    importPokemons();

    // Button ausblenden, da wir alle Pokémon laden
    document.querySelector('#loadMoreButton').style.display = 'none';
}


// pokemonObj.sprites.other.showdown.front_default