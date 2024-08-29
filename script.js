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
    pokemons = data.results;
    await renderListOfPokemons(pokemons);
    hideLoadingScreen(); // Lade-Screen verbergen
}

async function renderListOfPokemons(array) {
    let content = document.getElementById('content');

    for (let i = 0; i < array.length; i++) {
        let pokemonObj = array[i];
        let pokemonData = await fetchDataJson(pokemonObj.url);  // Detaildaten für jedes Pokémon abrufen
        content.innerHTML += generateTable(i + offset, pokemonData);  // Übergeben der Detaildaten an generateTable
    }
}

// Erstellen der einzelnen Karten für die Pokemon
function generateTable(i, pokemonObj) {
    let mainType = pokemonObj.types[0].type.name;

    return /*html*/`
    <div id="pokeCard${i}" class="pokeCard">
        <div class="card type-${mainType}">
            <h5 class="card-title">
                <p>#${pokemonObj.id}</p>
                <p>${pokemonObj.name}</p>
            </h5>
            <div class="card-img">
                <img src="${pokemonObj.sprites.other.showdown.front_default}" class="poke-img">
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
    if (offset >= MAX_POKEMON) {
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