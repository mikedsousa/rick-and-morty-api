import fetchData from "./fetch.js";

const result = document.querySelector(".result");
const btn = document.querySelector(".btn");
const input = document.getElementById("search");

const characters = await fetchData();
const choosenOne = await fetchData(118);

// Filter the characters by name when user types in the input

let choosenId;

input.addEventListener("keyup", (event) => {
  result.innerHTML = "";

  const value = event.target.value.toLowerCase();
  const filteredCharacters = characters.filter((character) => {
    return character.name.toLowerCase().includes(value);
  });

  for (let i = 0; i < filteredCharacters.length; i++) {
    const div = document.createElement("div");
    div.className = "item";

    const pName = document.createElement("p");
    pName.textContent = filteredCharacters[i].name;
    pName.className = "name";

    const pId = document.createElement("p");
    pId.textContent = filteredCharacters[i].id;
    pId.className = "id";

    const img = document.createElement("img");
    img.className = "profile";
    img.src = filteredCharacters[i].image;

    div.appendChild(img);
    div.appendChild(pId);
    div.appendChild(pName);
    result.appendChild(div);

    if (value === "") {
      result.innerHTML = "";
    }
  }
  const item = document.querySelectorAll(".item");

  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener("click", () => {
      choosenId = item[i].querySelector(".id").textContent;
      const value = item[i].querySelector(".name").textContent;
      input.value = value;
      result.innerHTML = "";
    });
  }


});

btn.addEventListener("click", () => {
  // const name = input.value.toLowerCase();
  const choosedCharacter = characters.find((character) => {
    return character.id === Number(choosenId);
  });

  const grid = document.querySelector(".grid");
  const divCard = document.createElement("div");
  divCard.className = "card";

  // Check if the choosed character is the same as the daily character

  let isIdTrue = choosedCharacter.id === choosenOne.id
  ? divCard.classList.add("border-green")
  : divCard.classList.add("border-error");

  const divContainer = document.createElement("div");
  divContainer.className = "card-container";
  const img = document.createElement("img");
  img.className = "card-img";
  img.src = choosedCharacter.image;

  const divBody = document.createElement("div");
  divBody.className = "card-body";

  // Check if the choosed character has the same name as the daily character
  const h2 = document.createElement("h2");
  h2.className = "card-name";
  h2.textContent = `Name: ${choosedCharacter.name}`;

  if (choosedCharacter.name != choosenOne.name) {
    h2.classList.add("error-text");
  } else {
    h2.classList.add("green-text");
  }

  // Check if the choose character has the same gender as the daily character
  const pGender = document.createElement("p");
  pGender.textContent = `Gender: ${choosedCharacter.gender}`;
  if (choosedCharacter.gender != choosenOne.gender) {
    pGender.classList.add("error-text");
  } else {
    pGender.classList.add("green-text");
  }


  // Check if the choosed character has the same species as the daily character
  const pSpecies = document.createElement("p");
  pSpecies.textContent = `Species: ${choosedCharacter.species}`;
  if (choosedCharacter.species != choosenOne.species) {
    pSpecies.classList.add("error-text");
  } else { 
    pSpecies.classList.add("green-text");
  } 


  // Check if the choosed character has the same status as the daily character
  const pStatus = document.createElement("p");
  pStatus.textContent = `Status: ${choosedCharacter.status}`;

  const isAlive = choosenOne.status;
  pStatus.textContent = `Status: ${choosedCharacter.status}`;
  if (choosedCharacter.status != isAlive) {
    pStatus.classList.add("error-text");
  } else {
    pStatus.classList.add("green-text");
  }


  // Check if the choosed character has more or less episodes than the daily character
  const pEps = document.createElement("p");

  if (choosedCharacter.episode.length > choosenOne.episode.length) {
    pEps.innerHTML = `Nº of Episodes: ${choosedCharacter.episode.length} <i class="fa-solid fa-chevron-down fa-sm" style="color: #ff0000;"></i>`;

  } else if (choosedCharacter.episode.length < choosenOne.episode.length) {
    pEps.innerHTML = `Nº of Episodes: ${choosedCharacter.episode.length} <i class="fa-solid fa-chevron-up fa-sm" style="color: #ff0000;"></i>`;
  } else {
    pEps.innerHTML = `Nº of Episodes: ${choosedCharacter.episode.length} <i class="fa-solid fa-minus fa-sm" style="color: #00ff00;"></i>`;
  }

  if (choosedCharacter.episode.length != choosenOne.episode.length) {
    pEps.classList.add("error-text");
  } else {
    pEps.classList.add("green-text");
  }

  // Append all the elements to the DOM

  divBody.appendChild(h2);
  divBody.appendChild(pGender);
  divBody.appendChild(pSpecies);
  divBody.appendChild(pStatus);
  divBody.appendChild(pEps);

  divContainer.appendChild(img);
  divContainer.appendChild(divBody);

  divCard.appendChild(divContainer);

  grid.appendChild(divCard);


  // Reset the input value
  input.value = "";
});
