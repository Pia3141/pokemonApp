const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeID = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const typesDiv = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const image = document.getElementById("image-container");
const pokemonListURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const displayData = (obj) => {
  pokeName.textContent = `${obj.name[0].toUpperCase() + obj.name.slice(1)}`;
  pokeID.textContent = `#${obj.id}`;
  weight.textContent = `Weight: ${obj.weight}`;
  height.textContent = `Height: ${obj.height}`;
  image.innerHTML = `<img id="sprite" src="${obj.sprites.front_default}"/>`;

  obj.types.forEach(
    (obj) =>
      (typesDiv.innerHTML += `<div id="${obj.slot}" class="type ${obj.type.name}">${obj.type.name}</div>`)
  );
  hp.textContent = obj.stats[0].base_stat;
  attack.textContent = obj.stats[1].base_stat;
  defense.textContent = obj.stats[2].base_stat;
  specialAttack.textContent = obj.stats[3].base_stat;
  specialDefense.textContent = obj.stats[4].base_stat;
  speed.textContent = obj.stats[5].base_stat;
};
const fetchDetail = (id) => {
  let detailURL = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id}`;
  fetch(detailURL)
    .then((res) => res.json())
    .then((data) => {
      displayData(data);
    })
    .catch((err) => console.log(err));
};

const fetchData = async () => {
  try {
    types.innerHTML = "";
    const res = await fetch(pokemonListURL);
    const data = await res.json();
    const pokeArr = data.results;
    let pokeId = 0;
    if (!isNaN(Number(searchInput.value))) {
      pokeId = Number(searchInput.value);
    } else {
      pokeId = pokeArr
        .map((item) => {
          if (item.name === searchInput.value.toLowerCase()) {
            return item.id;
          }
        })
        .join("");
    }
    if (pokeArr[pokeId - 1]) {
      fetchDetail(pokeId);
    } else {
      alert("Pokémon not found");
    }
  } catch (err) {
    console.log(err);
  }
};

searchBtn.addEventListener("click", fetchData);
