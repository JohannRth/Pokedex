let loadLimit = 26;
let offset = 0; 
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?`;
let pokemons = [];
let allPokemons = [];
let currentPokemons = [];
let pokemonDetailsCache = {};
const MAX_POKEMON = 151; 
let debounceTimer;

function init() {
    importPokemons();
}

async function fetchDataJson(url) {
    let response = await fetch(url);
    return response.json();
}

async function importPokemons(append = false) {
    showLoadingScreen();  
    let url = `${BASE_URL}offset=${offset}&limit=${loadLimit}`;
    let data = await fetchDataJson(url);

    pokemons = pokemons.concat(data.results);

    await renderListOfPokemons(data.results, append);
    hideLoadingScreen(); 
}

function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'flex';
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
}

function loadMorePokemons() {
    if (offset < MAX_POKEMON) {
        offset += loadLimit;
        if (offset + loadLimit > MAX_POKEMON) {
            loadLimit = MAX_POKEMON - offset;
        }
        importPokemons(true);
    }
    if (offset + loadLimit >= MAX_POKEMON) {
        document.querySelector('#loadMoreButton').style.display = 'none';
    }
}

function loadAllPokemons() {
    loadLimit = MAX_POKEMON;
    offset = 0;
    document.getElementById('content').innerHTML = '';
    importPokemons();
    document.querySelector('#loadMoreButton').style.display = 'none';
}

async function renderListOfPokemons(array, append = false) {
    let content = document.getElementById('content');

    if (!append) {
        content.innerHTML = '';
    }

    let html = await getPokemonHtml(array); 
    content.insertAdjacentHTML('beforeend', html);
}

async function getPokemonHtml(array) {
    let html = '';
    for (let i = 0; i < array.length; i++) {
        let data = await getPokemonData(array[i]); 
        html += generateTable(i, data);
    }
    return html;
}

async function getPokemonData(pokemon) {
    if (!pokemonDetailsCache[pokemon.name]) {
        pokemonDetailsCache[pokemon.name] = await fetchDataJson(pokemon.url);
    }
    return pokemonDetailsCache[pokemon.name];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
