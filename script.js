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
            <div class="d-flex justify-content-center">
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

// Typen anzeigen
function renderPokemonTypes(types) {
    return types.map(typeInfo => {
        let typeName = typeInfo.type.name;
        return `<span class="badge type-${typeName}">${typeName}</span>`;
    }).join(' ');  // Fügt die Typen zu einem String zusammen
}

// Funktion zum Laden weiterer Pokémon
function loadMorePokemons() {
    // Prüfen, ob noch weitere Pokémon geladen werden können
    if (offset < MAX_POKEMON) {
        offset += loadLimit; // Offset erhöhen, um die nächsten Pokémon zu laden
        // Falls das nächste Offset größer als MAX_POKEMON wäre, wird es angepasst
        if (offset + loadLimit > MAX_POKEMON) {
            loadLimit = MAX_POKEMON - offset;
        }
        importPokemons(); // Weitere Pokémon importieren
    }

    // Ausblenden des Buttons, wenn das Limit erreicht ist
    if (offset >= MAX_POKEMON) {
        document.querySelector('#loadMoreButton').style.display = 'none !important'; // Button ausblenden
    }
}

// Funktion zum Laden von 151 Pokémon
function loadAllPokemons() {
    loadLimit = MAX_POKEMON; // Setzt das Limit auf 151 Pokémon
    offset = 0; // Startet wieder bei 0
    document.getElementById('content').innerHTML = ''; // Inhalt leeren, um eine neue Liste anzuzeigen
    importPokemons(); // Lade alle Pokémon
    // Button ausblenden, da wir bereits alle Pokémon laden
    document.querySelector('#loadMoreButton').style.display = 'none';
}





// pokemonObj.sprites.other.showdown.front_default