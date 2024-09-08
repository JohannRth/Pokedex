let loadLimit = 26;
let offset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?`;
let pokemons = [];
let pokemonDetailsCache = {};
const MAX_POKEMON = 151;
let debounceTimer;

// Initialisieren und Pokémon importieren
function init() {
    importPokemons();
}

// Abrufen von JSON-Daten von einer URL
async function fetchDataJson(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Netzwerkfehler: ' + response.statusText);
        return await response.json();
    } catch (error) {
        console.error('Fetch-Fehler:', error);
        return null;
    }
}

// Pokémon von der API laden
async function importPokemons(append = false) {
    showLoadingScreen();
    let url = `${BASE_URL}offset=${offset}&limit=${loadLimit}`;
    let data = await fetchDataJson(url);
    
    if (data && data.results) {
        pokemons = pokemons.concat(data.results);
        await renderListOfPokemons(data.results, append);
    }
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
        importPokemons(true);
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
async function renderListOfPokemons(array, append = false) {
    let content = document.getElementById('content');
    if (!append) {
        content.innerHTML = '';
    }

    let html = await getPokemonHtml(array);
    content.insertAdjacentHTML('beforeend', html);

    addPokemonClickListener();
}

// HTML für Pokémon erstellen
async function getPokemonHtml(array) {
    let html = '';
    for (let i = 0; i < array.length; i++) {
        let data = await getPokemonData(array[i]);
        html += generateTable(array[i].id, data);
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

// Hilfsfunktion zum ersten Großbuchstaben
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Navigation zwischen den Pokémon
function navigatePokemon(newPokemonId) {
    if (newPokemonId > 0 && newPokemonId <= MAX_POKEMON) {
        showPokemonDetails(newPokemonId);
    }
}

// Füge den Event Listener für das Klicken auf ein Pokémon hinzu
function addPokemonClickListener() {
    document.querySelectorAll('.pokeCard').forEach(card => {
        card.addEventListener('click', () => {
            let pokemonId = parseInt(card.getAttribute('data-id'), 10);
            if (!isNaN(pokemonId)) {
                showPokemonDetails(pokemonId);
            } else {
                console.error('Ungültige Pokémon-ID:', card.getAttribute('data-id'));
            }
        });
    });
}

// Generiere HTML für die Pokémon-Karten
function generateTable(id, pokemonObj) {
    let mainType = pokemonObj.types[0].type.name;
    return /*html*/`
    <div id="pokeCard${id}" class="pokeCard" data-id="${id}">
        <div class="card type-${mainType}">
            <h5 class="card-title">
                <p>#${pokemonObj.id}</p>
                <p>${pokemonObj.name}</p>
            </h5>
            <div class="card-img">
                <img src="${pokemonObj.sprites.other['official-artwork'].front_default}" class="poke-img">
            </div>
            <div class="card-body">
                <div class="poke-card-type-box">
                    ${renderPokemonTypes(pokemonObj.types)}
                </div>
            </div>
        </div>
    </div>
    `;
}

// Typen anzeigen und Hintergrundfarbe setzen
function renderPokemonTypes(types) {
    return types.map(typeInfo => {
        let typeName = typeInfo.type.name;
        return `<span class="badge type-${typeName}">${typeName}</span>`;
    }).join(' ');
}

// pokemonObj.sprites.other.showdown.front_default