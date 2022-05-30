// Array vacio para guardar todos los pokemons que recibimos de la API
const ALL_POKEMONS = [];


// Obtenemos informacion de pokemons desde la API
const getPokemonFromApi = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const response = await fetch(url);
  const pokemon = await response.json();

  ALL_POKEMONS.push(pokemon);
};


//Obtenemos 151 pokemons desde la API
const getAllPokemons = async () => {
  for (let id = 1; id <= 151; id++) {
    await getPokemonFromApi(id);
  }

  showPokemons(ALL_POKEMONS);
};


// Función para mostrar los pokemons con su imagen, nombre, id y tipo
const showPokemons = (pokemonsToShow) => {
  const pokeWeb$$ = document.querySelector("#pokeweb");
  pokeWeb$$.innerHTML = "";

  pokemonsToShow.forEach((pokemon) => {
    const types = pokemon.types.reduce((acc, { type }) => {
      return acc.concat(`
          <div class="type__container type__container--${type.name}">
              ${type.name}
          </div> 
          `);
    }, "");

    const html = `
      <div class="card__container">
        <div class="img__container">
            <img src=${pokemon.sprites.other["home"].front_default} alt=${pokemon.name}>
        </div>
        <div class="id__container">
            <p>ID: ${pokemon.id}</p>
        </div>
        <div class="nameType__container">
            <div class="name__container">${pokemon.name}</div>
            <div>${types}</div>
        </div>
      </div>
      `;
    pokeWeb$$.innerHTML += html;
  });
};


//Buscamos pokemons en el input por ID y por nombre
const searchPokemon = (inputValue) => {
  const filtered = ALL_POKEMONS.filter((pokemon) => {
    const findedID = [pokemon].find(({ id }) =>
      String(id).includes(inputValue)
    );
    const findedName = [pokemon].find(({ name }) =>
      String(name).includes(inputValue)
    );

    return findedID || findedName;
  });

  showPokemons(filtered);
};


//Buscamos pokemons en los 'botones' por tipo
const searchByType = (inputValue) => {
  if (inputValue === "all") {
    showPokemons(ALL_POKEMONS);
    return;
  }

  const filtered = ALL_POKEMONS.filter((pokemon) => {
    return pokemon.types.find(({ type }) => type.name === inputValue);
  });

  showPokemons(filtered);
};


//Añadimos el evento al input y a los 'botones' de los tipos de pokemons
document.getElementById("search-input").addEventListener("input", ({ target }) => {
    searchPokemon(target.value);
});

document.querySelectorAll(".type__selector").forEach((button) => {
  button.addEventListener("click", ({ target }) => {
    searchByType(target.id);
  });
});


getAllPokemons();