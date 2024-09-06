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
async function importPokemons() {
    showLoadingScreen();
    let url = `${BASE_URL}offset=${offset}&limit=${loadLimit}`;
    let data = await fetchDataJson(url);
    allPokemons = allPokemons.concat(data.results); // Neue Pokémon zur Liste hinzufügen
    currentPokemons = allPokemons;
    await renderListOfPokemons(data.results); // Nur neue Pokémon rendern
    hideLoadingScreen();
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
        importPokemons();
    }
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
async function renderListOfPokemons(array) {
    document.getElementById('content').innerHTML = ''; // Bestehenden Inhalt leeren
    let html = await getPokemonHtml(array); // HTML für Pokémon holen
    document.getElementById('content').innerHTML = html; // HTML einfügen
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