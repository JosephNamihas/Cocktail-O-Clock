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

        // RELATED COCKTAILS 
        var relatedCocktailsArr = [];

        // Populates 5 related list items
        for (let i = 1; i < 6; i++) {
            $("#related-cocktails").append(`<li><a href="./cocktail.html" class="relatedCocktailLink">${cocktailDataObject[i].name}</a></li>`);
            relatedCocktailsArr.push(cocktailDataObject[i].name);
        }
        
        relatedCocktailsArr.forEach(function(relatedCocktail) {
            $(".relatedCocktailLink").on('click', function (event) {
                event.preventDefault();
                
                var cocktailName = relatedCocktail;

                // Calls the below function using the users input
                getRelatedCocktail(cocktailName);
            });
         });
        // END OF RELATED COCKTAILS
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
    // Fetches value from favourite-cocktail localStorage and parses
    //localStorage.getItem(("Favourite-Cocktail", JSON.parse(storageArray)));
    console.log(storageArray);

    // On page load, cycles through loop and appends everything in local storage...
    for (let i = 0; i < storageArray.length; i++) {
        $("#favourite-cocktails").append("<li>" + storageArray[i] + "</li>");
    }
}

function backToSearch() {
    history.back();
    localStorage.clear();
}

$(document).ready(function () {

    retrieveCocktailImage();
    retrieveGifImage();

    // Hiding the related cocktails field if there are only 2 in the array
    if (cocktailDataObject.length <= 2) {
        $(".related").addClass("hide");
        $(".favourites").addClass("text-center")
    }

    loadStorage(); // Loads favourites on refresh in the ready function
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

loadStorage(); // Loads faviroutes on refresh*/


$("#add-to-favourites").on('click', function () {
    // Pushes current cocktail to empty array (storageArray)
    storageArray.push(cocktailDataObject[0].name);
    //Sets index of storage array to memory
    localStorage.setItem("Favourite-Cocktail", JSON.stringify(storageArray));
    //Appends to page
    $("#favourite-cocktails").append("<li>" + cocktailDataObject[0].name + "</li>");

});

/*function loadStorage() {

        localStorage.getItem(("Favourite-Cocktail", JSON.parse(storageArray)));
            console.log(storageArray);

            for(let i = 0; i < storageArray.length; i++) {
                $("#favourite-cocktails").append("<li>" + storageArray[i] + "</li>");
            } 
}*/

