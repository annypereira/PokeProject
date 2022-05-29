let all_results = [];

const showPokemons = (pokemonsToShow) => {
    const pokeWeb$$ = document.querySelector("#pokeweb");
    pokeWeb$$.innerHTML = "";

    pokemonsToShow.forEach((pokemon) => {
        const pokeContainer$$ = document.createElement('div');
        const typesContainer$$ = document.createElement('div');

        const types = pokemon.types.reduce((acc, {type}) => {
            return acc.concat(`
            <div class="type__container type__container--${type.name}">
                ${type.name}
            </div> 
            `)
        }, "")
        
        const html = `
        <div class="card__container">
            <div class="img__container">
                <img src=${pokemon.sprites.front_default} alt=${pokemon.name}>
            </div>

            <div>
                <p>${pokemon.id}</p>
            </div>

            <div>
                <div>${pokemon.name}</div>
                <div>${types}</div>
            </div>
        </div>
        
        
        `;
        pokeContainer$$.innerHTML = html;
        pokeWeb$$.appendChild(pokeContainer$$);
       

    });
};

//Obtenemos informacion de pokemons desde la API
const getPokemonFromApi = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();

    all_results.push(pokemon);
}

//Obtenemos 151 pokemons desde la API
const getAllPokemons = async () => {
    for (let id = 1; id <= 151; id++) {
        await getPokemonFromApi(id);      
    }

    showPokemons(all_results);
};

//Buscamos pokemons en el input por ID y por nombre
const searchPokemon = () => {
const inputValue = document.querySelector("#search-input").value;

    const filtered = all_results.filter((pokemon) => {
        const findedID = [pokemon].find(({id}) => String(id).includes(inputValue))
        const findedName = [pokemon].find(({name}) => String(name).includes(inputValue))

        return findedID || findedName
    })

    return filtered
};

//Buscamos pokemons en el input por tipo
const searchByType = () => {
const inputValue = document.querySelectorAll("#search-input").text;

    const filtered = all_results.filter((pokemon) => {
        return pokemon.types.find(({type}) => type.name === inputValue)
    })

    return filtered
}

//Filtramos pokemons por tipos a traves del click en el DIV correspondiente a ese tipo
const searchPokemonByType = () => {

};

getAllPokemons();
