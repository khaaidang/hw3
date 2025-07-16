// Event Listeners
document.querySelector("#inputForm").addEventListener("submit", function (event) { event.preventDefault(); validateForm(event) });

// Functions
async function displayInfo() {
    let name = document.querySelector("#characterName").value;
    let species = document.querySelector("#characterSpecies").value;
    let img = document.querySelector("#characterImage");

    let url = `https://rickandmortyapi.com/api/character/?name=${name}&species=${species}`;

    let response = await fetch(url);
    let data = await response.json();

    if (data.results) {
        let character = data.results[0];
        img.src = character.image;
        img.alt = character.name;
        img.style.display = "block";
        document.querySelector("#characterError").innerHTML = "";
        document.querySelector("#status").innerHTML = `Status: ${character.status}`;
        document.querySelector("#species").innerHTML = `Species: ${character.species}`;
        document.querySelector("#gender").innerHTML = `Gender: ${character.gender}`;
        document.querySelector("#origin").innerHTML = `Origin: ${character.origin.name}`;
        document.querySelector("#location").innerHTML = `Location: ${character.location.name}`;
    }
    else {
        img.style.display = "none";
        img.src = "";
        img.alt = "";
        document.querySelector("#characterError").innerHTML = "Nope. Not in this universe. Spell it right or try someone else.";
    }
}

// Form Validation
function validateForm(e) {
    // Variables
    let isValid = true;

    document.querySelector("#nameError").innerHTML = "";
    document.querySelector("#speciesError").innerHTML = "";

    let name = document.querySelector("#characterName").value.trim();
    let species = document.querySelector("#characterSpecies").value.trim();

    if (name.length == 0) {
        document.querySelector("#nameError").innerHTML = "What's the name, genius?";
        isValid = false;
    }

    if (species.length == 0) {
        document.querySelector("#speciesError").innerHTML = "You think the multiverse runs on vibes? Put in a species!";
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
    if (isValid) {
        displayInfo();
    }
}