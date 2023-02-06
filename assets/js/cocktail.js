// Getting the cocktail data from local storage and storing into a new variable
var cocktailDataObject = JSON.parse(localStorage.getItem("data"));
var cocktailImageSearch = localStorage.getItem("nameOfCocktail");
var storageArray = []; // Used to store favourites

// Using the cocktail name to do the gif search
var giphySearchTerm = cocktailDataObject[0].name;

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

        // TODO - Only lists text. Need to make them links ideally? 
        // TODO - Work in progress!

        //Populates 5 related list items
        for (let i = 1; i < 6; i++) {

            $("#related-cocktails").append(`<li><a href="./cocktail.html" class="relatedCocktailLink">${cocktailDataObject[i].name}</a></li>`);

            $(".relatedCocktailLink").on('click', function (event) {
                event.preventDefault();
                var cocktailName = cocktailDataObject[i].name;

                localStorage.setItem("nameOfCocktail", cocktailName);

                // Calls the below function using the users input
                getRelatedCocktail(cocktailName);
            });

            // Gets the favourites from local storage

            //$("#favourite-cocktails").append("<li>" + cocktailDataObject[0].name + "</li>");
        }

    });
};

function getRelatedCocktail(cocktailName) {
    // ajax call to get the cocktail data from the users input
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/cocktail?name=' + cocktailName,
        headers: { 'X-Api-Key': 'oG7S2vqNUXRwDPUivFn60w==v3SxU4nBy9O504CG' },
        contentType: 'application/json',
        success: function (cocktailData) {
            // If the call is succesful the following will be executed
            console.log(cocktailData);

            // Stored the cocktailData object into local storage
            localStorage.setItem("data", JSON.stringify(cocktailData));

            window.location = './cocktail.html';
        },
        error: function ajaxError(errorData) {
            // If the call errors the following will be executed
            console.error('Error: ', errorData.responseText);

        }
    });
};

function loadStorage() {
    console.log("Loading");

            localStorage.getItem(("Favourite-Cocktail", JSON.parse(storageArray)));
            console.log(storageArray);

            for(let i = 0; i < storageArray.length; i++) {
                $("#favourite-cocktails").append("<li>" + storageArray[i] + "</li>");
            } 
        }

$(document).ready(function () {

    retrieveCocktailImage();
    retrieveGifImage();
    loadStorage(); // Loads faviroutes on refresh*/
});

$("#add-to-favourites").on('click', function () {
    // Saves to favourites / local Storage
    console.log("Clicked");
    console.log(cocktailDataObject[0].name);
    storageArray.push(cocktailDataObject[0].name);
    console.log(storageArray);
    //localStorage.setItem("favourite-cocktail", cocktailDataObject[0].name); // May need to store in object / array otherwise key gets overwritten
    localStorage.setItem("Favourite-Cocktail", JSON.stringify(storageArray));
    $("#favourite-cocktails").append("<li>" + cocktailDataObject[0].name + "</li>");

});

/*function loadStorage() {

            localStorage.getItem(("Favourite-Cocktail", JSON.parse(storageArray)));
            console.log(storageArray);

            for(let i = 0; i < storageArray.length; i++) {
                $("#favourite-cocktails").append("<li>" + storageArray[i] + "</li>");
            } 
        }*/
