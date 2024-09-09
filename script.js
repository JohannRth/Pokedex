let loadLimit = 26;
let offset = 0; // Start-Offset für die API-Abfrage
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?`;
let pokemons = [];
let allPokemons = [];
let currentPokemons = [];
let pokemonDetailsCache = {};
const MAX_POKEMON = 151; // Maximale Anzahl von Pokémon
let debounceTimer;

function init() {
    importPokemons();
}

// Daten von der API abrufen und als JSON zurückgeben
async function fetchDataJson(url) {
    let response = await fetch(url);
    return response.json();
}

// Pokémon von der API laden
async function importPokemons(append = false) {
    showLoadingScreen();  // Lade-Screen anzeigen
    let url = `${BASE_URL}offset=${offset}&limit=${loadLimit}`;
    let data = await fetchDataJson(url);
    
    // Pokémon-Liste erweitern (damit alle geladenen Pokémon gespeichert bleiben)
    pokemons = pokemons.concat(data.results);  
    
    // Rendern und abhängig vom "append" die Pokémon anhängen oder überschreiben
    await renderListOfPokemons(data.results, append);  
    hideLoadingScreen();  // Lade-Screen verbergen
}

// Zeige Lade-Screen
function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'flex';
}

// Verberge Lade-Screen
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
        importPokemons(true);  // Append wird auf true gesetzt, um die Pokémon an den vorhandenen Inhalt anzuhängen
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
    document.querySelector('#loadMoreButton').style.display = 'none';
}

// Pokémon-Details rendern
async function renderListOfPokemons(array, append = false) {
    let content = document.getElementById('content');
    
    // Wenn append true ist, behalte den bestehenden Inhalt, ansonsten leere den Inhalt
    if (!append) {
        content.innerHTML = '';
    }

    let html = await getPokemonHtml(array); // HTML für Pokémon holen
    content.insertAdjacentHTML('beforeend', html); // HTML an das Ende des Inhalts einfügen
}

// HTML für Pokémon erstellen
async function getPokemonHtml(array) {
    let html = '';
    for (let i = 0; i < array.length; i++) {
        let data = await getPokemonData(array[i]); // Daten aus dem Cache oder API holen
        html += generateTable(i, data); // HTML für das Pokémon generieren
    }
    return html;
}

// Pokémon-Daten holen und cachen
async function getPokemonData(pokemon) {
    if (!pokemonDetailsCache[pokemon.name]) {
        pokemonDetailsCache[pokemon.name] = await fetchDataJson(pokemon.url);
    }
    return pokemonDetailsCache[pokemon.name];
}

// pokemonObj.sprites.other.showdown.front_default