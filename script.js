let loadLimit = 26;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${loadLimit}`;
let pokemons = [];


function init() {
    importPokemons();
}

async function fetchDataJson() {
    let response = await fetch(BASE_URL);
    return response.json();
}

async function importPokemons() {
    let data = await fetchDataJson();
    pokemons = data.results;
    renderListOfPokemons(pokemons);
}

function renderListOfPokemons(array) {
    let content = document.getElementById('content');
    content.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        let pokemonObj = array[i];

        content.innerHTML += generateTable(pokemonObj, i,)
    }
}

function generateTable(pokemonObj, i,) {
    return /*html*/`
    <H1>Hello World
    ${pokemonObj['name']}
    ${i}</H1>
`;
}