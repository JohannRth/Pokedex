
/**
 * 
 * @param {*} i 
 * @param {*} pokemonObj 
 * @returns 
 */
function generateTable(i, pokemonObj) {
    let mainType = pokemonObj.types[0].type.name;

    return /*html*/`
    <div id="pokeCard${i}" class="pokeCard" onclick="showPokemonModal(${pokemonObj.id})">
        <div class="card type-${mainType}">
            <h5 class="card-title">
                <p>#${pokemonObj.id}</p>
                <p>${capitalizeFirstLetter(pokemonObj.name)}</p>
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

function renderPokemonTypes(types) {
    return types.map(typeInfo => {
        let typeName = typeInfo.type.name;
        return `<span class="badge type-${typeName}">${typeName}</span>`;
    }).join(' ');
}
