let loadLimit = 26;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${loadLimit}`;
let pokemons = [];

function init() {
    importPokemons();
}

async function fetchDataJson(url) {
    let response = await fetch(url);
    return response.json();
}

async function importPokemons() {
    let data = await fetchDataJson(BASE_URL);
    pokemons = data.results;
    renderListOfPokemons(pokemons);
}

async function renderListOfPokemons(array) {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        let pokemonObj = array[i];
        let pokemonData = await fetchDataJson(pokemonObj.url);  // Detaildaten für jedes Pokémon abrufen
        content.innerHTML += generateTable(i, pokemonData);  // Übergeben der Detaildaten an generateTable
    }
}

function generateTable(i, pokemonObj) {
    return /*html*/`
    <div id="pokeCard${i}" class="col">
        <div class="card h-100">
            <img src="${pokemonObj.sprites.other.showdown.front_default}" class="poke-img">
            <div class="card-body">
                <h5 class="card-title">
                    <p>#${pokemonObj.id}</p>
                    <p>${pokemonObj.name}</p></h5>
                <p class="card-text">

                </p>
            </div>
        </div>
    </div>
    `;
}
