function init(){
    importPokemons();
}

async function fetchDataJson(){
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    return response.json();
}

async function importPokemons(){
    let response = await fetchDataJson();
    renderListOfPokemons(response);
}

function renderListOfPokemons(array){ 
    let content = document.getElementById('pokedex-container');
    content.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        let pokemonObj = array[i];

        content.innerHTML += generateTable(pokemonObj, i,)
    }
}

function generateTable(pokemonObj, i,) {
    return /*html*/`
    <tr class="d-flex col">
        <td class="position-rel" onclick="handleCellClick('nestedTable${i}', 'dropdownIcon${i}')">
            <h2>${pokemonObj['name']}</h2>
        </td>
        <td id="nestedTable${i}" class="d-none">
            <table>
                <tr>
                    <td class="border-left-right-0">Kohlenhydrate</td>
                    <td class="border-left-right-0">${pokemonObj['nutritions']['carbohydrates']} g</td>
                </tr>
                <tr>
                    <td class="border-left-right-0">Protein</td>
                    <td class="border-left-right-0">${pokemonObj['nutritions']['protein']} g</td>
                </tr>
                <tr>
                    <td class="border-left-right-0">Fett</td>
                    <td class="border-left-right-0">${pokemonObj['nutritions']['fat']} g</td>
                </tr>
                <tr>
                    <td class="border-left-right-0"><b>Kalorien</b></td>
                    <td class="border-left-right-0"><b>${pokemonObj['nutritions']['calories']} g</b></td>
                </tr>
            </table>
        </td>
    </tr>
`;
}