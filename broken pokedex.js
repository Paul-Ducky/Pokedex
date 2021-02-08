// Globals //
const baseAPILink = "https://pokeapi.co/api/v2/pokemon/bulbusaur";
const totalPokemon = 898;
let APILink = "https://pokeapi.co/api/v2/pokemon/1";

// buttons
const pEvoUp = document.querySelector("#btn-up");
const pEvoDown = document.querySelector("#btn-down");
const previousP = document.querySelector("#btn-l");
const nextP = document.querySelector("#btn-r");

// input //
const pByInput = document.querySelector("#text-num"); // accepts both ID and Name to browse the API.

// functions //
async function fetchPokemons(APILink) {
    try {
        let pResult = await fetch(APILink);
        let pData = await pResult.json();
        return pData;
    } catch (error) {
        console.error(error);
        console.log("all the pokemon just died because of you")
    }
    return pData;
}

async function fetchSpecies(pData) {
    try {
        console.log("test2")
        let pSResult = await fetch(pData.species.url);
        let pSData = await pSResult.json();
        return pSData
    } catch (error) {
        console.error(error);
        console.log("What have you done?! Why would anyone break all the poké eggs?!")
    }
}

async function fetchEvolutions(pSData) {
    try {
        console.log("test3")
        let pEResult = await fetch(pSData.evolution_chain.url);
        let pEData = await pEResult.json();
        //displayEvolutions(pEData);
    } catch (error) {
        console.error(error);
        console.log("Hello? Can anyone hear me?! I've been stuck here since 1995")
    }
}

/*function displayEvolutions(pEData) {
    const pEv0 = document.querySelector("#img-1");
    const pEv1 = document.querySelector("#img-2");
    const pEv2 = document.querySelector("#img-3");
    if (evolution.chain.evolves_to.length === 1) {
      // let ev0Link =
    }
}*/

function displayPokemon() {
    pData = fetchPokemons(APILink);
    console.log("testing" + pData);
    fetchSpecies(pData);
    fetchEvolutions(pSData);

    const pFrontSprite = document.querySelector("#poke-sprite");
    const pTypeOne = document.querySelector("#type1-s");
    const pTypeTwo = document.querySelector("#type2-s");
    const pWeight = document.querySelector("#weight");
    const pHeight = document.querySelector("#height");
    const pName = document.querySelector("#poke-name");
    const pId = document.querySelector("#poke-id");
    const pMoves = document.querySelectorAll(".moves");
    pFrontSprite.src = pData.sprites.front_default;
    pName.textContent = pData.name;
    pId.textContent = pData.id;
    pHeight.textContent = pData.height;
    pWeight.textContent = pData.weight;

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
    if (pData.types.length > 1) {
        pTypeOne.textContent = pData.types[0].name;
    } else {
        pTypeOne.textContent = pData.types[0].name;
        pTypeTwo.textContent = pData.types[1].name;
    }
    nextP.addEventListener("click", () => {
        let newId = Number(pData.id) + 1;
        if (newId > totalPokemon) {
            newId = 1;
        }
        APILink = baseAPILink + newId
        fetchPokemons(APILink);
    });

    previousP.addEventListener("click", () => {
        let newId = Number(pData.id) - 1;
        if (newId === 0) {
            newId = totalPokemon;
        }
        APILink = baseAPILink + newId
        fetchPokemons(APILink);
    });

    pByInput.addEventListener("keyup", (event) => {
        if (event.code === 'enter') {
            let nameOrId = pByInput.value;
            APILink = baseAPILink + nameOrId;
            fetchPokemons(APILink);
        }
    });

}

// Execution //
displayPokemon();





