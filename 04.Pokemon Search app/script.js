const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const outputContainer = document.querySelector(".output");
const pokName = document.getElementById("pokemon-name");
const pokID = document.getElementById("pokemon-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const spriteContainer = document.getElementById("sprite-container");
const typesEl = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const searchForm = document.getElementById("search-form");

// ///////////////////////////////////////////////////////////////////////
// API FROM FREECODECAMP
/////////////////////////////////////////////////////////////////////////

const fetchData = async function () {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
    );
    let data = await response.json();

    pokName.textContent = `${data.name.toUpperCase()}`;
    pokID.textContent = `#${data.id}`;
    weightEl.textContent = `Weight: ${data.weight}`;
    heightEl.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">`;

    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    spAttack.textContent = data.stats[3].base_stat;
    spDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    typesEl.innerHTML = data.types
      .map(
        (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`
      )
      .join("");
  } catch (error) {
    clearContainer();
    alert("Pokemon not found");
    console.log(error);
  }
};

const clearContainer = function () {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  pokName.textContent = "";
  pokID.textContent = "";
  weightEl.textContent = "";
  heightEl.textContent = "";
  spriteContainer.innerHTML = "";

  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  spAttack.textContent = "";
  spDefense.textContent = "";
  speed.textContent = "";
  typesEl.innerHTML = "";
};

searchForm.addEventListener("submit", (e) => {
  outputContainer.style.display = "block";
  e.preventDefault();
  fetchData();
});
