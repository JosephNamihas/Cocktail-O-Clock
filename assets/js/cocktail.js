// Getting the cocktail data from local storage and storing into a new variable
var cocktailDataObject = JSON.parse(localStorage.getItem("data"));
var cocktailImageSearch = localStorage.getItem("nameOfCocktail");
var storageArray = JSON.parse(localStorage.getItem("Favourites")) || []; // Used to store favourites

// Using the cocktail name to do the gif search
var giphySearchTerm = cocktailImageSearch;

function retrieveCocktailImage() {
    // 3rd API for generating cocktail image
    var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
        + cocktailImageSearch;

    $.ajax({
        url: cocktailURL,
        method: "GET"
    }).then(function (dbCocktail) {
        console.log(dbCocktail)

        var cocktailImageEl = $("#cocktailImg");
        cocktailImageEl.attr("src", dbCocktail.drinks[0].strDrinkThumb);

    });
};

function retrieveGifImage() {
    var apiKey = "&api_key=B1QMeeTfxi77NrOloXqbNZdThiCQkuho"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        giphySearchTerm + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Console log to test
        console.log('This works')
        // Random number generator to randomly select GIF
        var randomGIF = Math.floor(Math.random() * response.data.length);

        // Populates the Cocktail Name on the cocktail page
        var cocktailNameEl = cocktailDataObject[0].name
        var cocktailHeaderEl = $("#cocktail-name")
        cocktailHeaderEl.text(cocktailNameEl)

        // Populates the Cocktail GIF on the cocktail page
        var cocktailGifEl = $("#cocktailGif")
        cocktailGifEl.attr("src", response.data[randomGIF].images.original.url)

        //Populates the Cocktail ingredients
        for (let i = 0; i < cocktailDataObject[0].ingredients.length; i++) {

            $("#ingredients").append("<li>" + cocktailDataObject[0].ingredients[i] + "</li>");
            console.log(cocktailDataObject[0].ingredients[i]);
        }

        //Populates the Instructions
        $("#method").text(cocktailDataObject[0].instructions);

        // Populates 5 related list items
        for (let i = 1; i < 6; i++) {
            $("#related-cocktails").append(`<li><a href="#" class="related-items">${cocktailDataObject[i].name}</a></li>`);
        };

        // When clicking the list items, the text is stored and the getCocktail function is called again.
        $(".related-items").on('click', function (event) {
            event.preventDefault();

            var cocktailName = $(this).text()

            console.log(cocktailName)

            getCocktail(cocktailName)
        })
    });
};

function loadStorage() {
    console.log(storageArray)
    // If statement so that if the storage array is null it will not attempt to load the storage
    if (storageArray !== null) { // If the storage array has a value it will fetch it and display it
        // On page load, cycles through loop and appends everything in local storage...
        for (let i = 0; i < storageArray.length; i++) {
            $("#favourite-cocktails").append(`<li><a href="#" class="fav-items">${storageArray[i]}</a></li>`);
        };
        // When we click, it stores the cocktail name and uses this to get new images and cocktail data
        $(".fav-items").on('click', function (event) {
            event.preventDefault();

            var cocktailName = $(this).text()

            localStorage.setItem("nameOfCocktail", cocktailName);
            console.log(cocktailName)

            getCocktail(cocktailName)
        })
    };
};

function backToSearch() {
    window.location = './index.html';
}

$(document).ready(function () {

    retrieveCocktailImage();
    retrieveGifImage();
    loadStorage(); // Loads favourites on refresh in the ready function

    // Hiding the related cocktails field if there are only 2 in the array
    if (cocktailDataObject.length <= 2) {
        $(".related").addClass("hide");
        $(".favourites").addClass("text-center")
    }
});

// Making function for the copy icon to copy recipe
function copyRecipe() {
    var textCopy = document.getElementById("recipe").innerText;
    var textElem = document.createElement("textarea");
    document.body.appendChild(textElem);
    textElem.value = textCopy;
    textElem.select();

    if (navigator.clipboard) {
        navigator.clipboard.writeText(textCopy).then(() => {
            //alert("Copied!"); // for checking if it works? /
            //!make a modal???("Copied!");
        })
    } else {
        console.log("Browser not compatible") // for checking if errors
    }
}

$("#add-to-favourites").on('click', function () {
    // Validation to stop the user adding multiples of the same cocktail
    if (!storageArray.includes(cocktailDataObject[0].name)) {
        // Pushes current cocktail to empty array (storageArray)
        storageArray.push(cocktailDataObject[0].name);
        //Sets index of storage array to memory
        localStorage.setItem("Favourites", JSON.stringify(storageArray));
        //Appends to page
        $("#favourite-cocktails").append(`<li>${cocktailDataObject[0].name}</li>`)
    } else {
        console.log("You already have this saved")
    }
});

// Button to clear all favourites
$("#delete-favourites").on('click', function () {
    localStorage.removeItem("Favourites")
    location.reload();
});