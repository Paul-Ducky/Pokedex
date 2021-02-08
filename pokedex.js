// get DOM-Elements //

const pFrontSprite = document.querySelector("");
const pTypeOne = document.querySelector("");
const pTypeTwo = document.querySelector("");
const pWeight = document.querySelector("");
const pHeight = document.querySelector("");
const pName = document.querySelector("");
const pId = document.querySelector("");
const pMoves = document.querySelectorAll("");

// buttons

const pEvoUp = document.querySelector("");
const pEvoDown = document.querySelector("");
const nextP = document.querySelector("");
const previousP = document.querySelector("");

// input //

const pByInput = document.querySelector("").value; // accepts both ID and Name to browse the API.

// functions //

async function fetchPokemons() {
    try {
        let pResult = await fetch('https://pokeapi.co/api/v2/pokemon/1');
        let pData = await pResult.json();
        return pData;
    } catch (error) {
        console.error(error);
        console.log("all the pokemon just died because of you")
    }
    displayPokemon();
}

function displayPokemon(pData) {
    pFrontSprite.src = pData.sprites.front_default;
    pTypeOne.textContent = pData.t2;
    pTypeTwo.textContent = pData.t1;
    pWeight.textContent = pData.weight;
    pHeight.textContent = pData.height;
    pName.textContent = pData.name;
    pId.textContent = pData.id;
    if (pData.moves.length === 1) {
        pMoves[0].textContent = pData.moves[0].name;
        pMoves[1].textContent = "-"
        pMoves[2].textContent = "-"
        pMoves[3].textContent = "-"
    } else {
        for (let i = 0; i < pMoves; i++) {
            pMoves[i].textContent = pData.moves[i].name
        }
    }

}

fetchPokemons();
