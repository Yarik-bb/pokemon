let jsForm = document.querySelector(".js-search-form");
let jsCardContainer = document.querySelector(".js-card-container");
let gifContainer = document.getElementById("gif-container");
let pokemonAudio = document.getElementById("pokemon-audio");

jsForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let eventTarg = event.target.elements.query.value.trim();

    if (!eventTarg) {
        console.log("Введіть коректне ім'я покемона.");
        jsCardContainer.innerHTML = `<p class="error">Введіть коректне ім'я покемона.</p>`;
        return;
    }


    gifContainer.hidden = false;
    pokemonAudio.currentTime = 0;
    pokemonAudio.play();

    setTimeout(() => {
        gifContainer.hidden = true;
    }, 3000);

    let pokemonTemplate = document.querySelector("#pokemon-template").innerHTML;
    let template = Handlebars.compile(pokemonTemplate);

    fetch(`https://pokeapi.co/api/v2/pokemon/${eventTarg.toLowerCase()}`, {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Покемона не знайдено");
        }
        return response.json();
    })
    .then(data => {
        let pokemonHTML = template(data);
        jsCardContainer.innerHTML = pokemonHTML;
    })
    .catch(error => {
        jsCardContainer.innerHTML = `<p class="error">Помилка: ${error.message}</p>`;
        console.log(error);
    });
});
