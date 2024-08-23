let loadLimit = 26;
let offset = 0; // Neu: Start-Offset für die API-Abfrage
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?`;
let pokemons = [];

function init() {
    importPokemons();
}

async function fetchDataJson(url) {
    let response = await fetch(url);
    return response.json();
}

async function importPokemons() {
    let url = `${BASE_URL}offset=${offset}&limit=${loadLimit}`;
    let data = await fetchDataJson(url);
    pokemons = data.results;
    renderListOfPokemons(pokemons);
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
    return /*html*/`
    <div id="pokeCard${i}" class="">
        <div class="card">
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

// <!-- Typen anzeigen -->
function renderPokemonTypes(types) {
    return types.map(typeInfo => {
        let typeName = typeInfo.type.name;
        return `<span class="badge type-${typeName}">${typeName}</span>`;
    }).join(' ');  // Fügt die Typen zu einem String zusammen
}

// Neu: Funktion zum Laden weiterer Pokémon
function loadMorePokemons() {
    offset += loadLimit; // Offset erhöhen, um die nächsten Pokémon zu laden
    importPokemons(); // Weitere Pokémon importieren
}
