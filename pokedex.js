// Globals //
const baseAPILink = "https://pokeapi.co/api/v2/pokemon/";
const totalPokemon = 898;
let APILink = "https://pokeapi.co/api/v2/pokemon/1";

// buttons
const pEvoUp = document.querySelector("#btn-up");
const pEvoDown = document.querySelector("#btn-down");
const previousP = document.querySelector("#btn-l");
const nextP = document.querySelector("#btn-r");

// input //
const pByInput = document.querySelector("#text-num"); // accepts both ID and Name to browse the API.
//functions//

async function fetchPokemons(APILink) {
    try {
        let pResult = await fetch(APILink);
        let pData = await pResult.json();
        console.log(pData);
        displayPokemon(pData);
        await fetchSpecies(pData);
        return pData;
    } catch (error) {
        console.error(error);
        console.log("all the pokemon just died because of you")
    }

}

async function fetchSpecies(pData) {
    try {
        let pSResult = await fetch(pData.species.url);
        let pSData = await pSResult.json();
        await fetchEvolutions(pSData)
        console.log(pSData);
    } catch (error) {
        console.error(error);
        console.log("What have you done?! Why would anyone break all the poké eggs?!")
    }
}

async function fetchEvolutions(pSData) {
    try {
        let pEResult = await fetch(pSData.evolution_chain.url);
        let pEData = await pEResult.json();
        console.log(pEData);
        displayEvolutions()
    } catch (error) {
        console.error(error);
        console.log("Hello? Can anyone hear me?! I've been stuck here since 1995")
    }
}

async function nextPokemon() {
    let temp = await fetchPokemons(APILink);
    let newId = Number(temp.id) + 1;
    if (newId > totalPokemon) {
        newId = 1;
    }
    APILink = baseAPILink + newId;
    fetchPokemons(APILink);
}

async function previousPokemon() {
    let temp = await fetchPokemons(APILink);
    console.log(temp.id + " wooooooooooooooooooooooooooooooo")
    let newId = Number(temp.id) - 1
    if (newId === 0) {
        APILink = baseAPILink + totalPokemon;
        fetchPokemons(APILink);
    } else {
        APILink = baseAPILink + newId;
        fetchPokemons(APILink);
    }
}

function displayPokemon(pData) {
    const pFrontSprite = document.querySelector("#poke-sprite");
    const pTypeOne = document.querySelector("#type1-s");
    const pTypeTwo = document.querySelector("#type2-s");
    const pWeight = document.querySelector("#weight");
    const pHeight = document.querySelector("#height");
    const pName = document.querySelector("#poke-name");
    const pId = document.querySelector("#poke-id");
    const pMoves = document.getElementsByClassName("moves");
    pFrontSprite.src = pData.sprites.front_default;
    pName.textContent = pData.name;
    pId.textContent = pData.id.toString().padStart(3, "0");
    pHeight.innerHTML = `<p>Height: ${pData.height} Poké-units</p>`;
    pWeight.innerHTML = `<P>Weight: ${pData.weight} Poké-units</p>`;
    console.log('moves')
    if (pData.moves.length === 1) {
        pMoves[0].innerText = pData.moves[0].name;
        pMoves[1].innerText = "-"
        pMoves[2].innerText = "-"
        pMoves[3].innerText = "-"
    } else if (pData.moves.length === 0) {
        pMoves[0].innerText = "-"
        pMoves[1].innerText = "-"
        pMoves[2].innerText = "-"
        pMoves[3].innerText = "-"
    } else {
        for (let i = 0; i < pMoves.length; i++) {
            pMoves[i].innerText = pData.moves[i].move.name
        }
    }
    pTypeOne.textContent = "";
    pTypeTwo.textContent = "";
    if (pData.types.length === 1) {
        pTypeOne.textContent = pData.types[0].type.name;
    } else {
        pTypeOne.textContent = pData.types[0].type.name;
        pTypeTwo.textContent = pData.types[1].type.name;
    }

    pByInput.addEventListener("keyup", (event) => {
        if (event.key === 'Enter') {
            let nameOrId = pByInput.value;
            APILink = baseAPILink + nameOrId;
            fetchPokemons(APILink);
        }
    });
}

// Execution //
fetchPokemons(APILink);

