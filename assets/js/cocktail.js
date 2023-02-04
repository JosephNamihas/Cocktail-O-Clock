$(document).ready(function () {
    // Getting the cocktail data from local storage and storing into a new variable
    var cocktailDataObject = JSON.parse(localStorage.getItem("data"));
    var cocktailImageSearch = localStorage.getItem("nameOfCocktail");


    // Using the cocktail name to do the gif search
    var giphySearchTerm = cocktailDataObject[0].name; 

    console.log(cocktailDataObject);

        // 3rd API for generating cocktail image
        var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
        + cocktailImageSearch;

    $.ajax({
        url: cocktailURL,
        method: "GET"
    }).then(function (dbCocktail) {
        console.log(dbCocktail);
        
        var cocktailImageEl = $("#cocktailImg")
        cocktailImageEl.attr("src", dbCocktail.drinks[0].strDrinkThumb)
        console.log(dbCocktail.drinks[0].strDrinkThumb)
    });

    var apiKey = "&api_key=B1QMeeTfxi77NrOloXqbNZdThiCQkuho"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        giphySearchTerm + apiKey; 

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

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

        var btn = $("button");
        //Populates 5 related list items
        for (let i = 1; i < 6; i++) {

            $("related-cocktails").append("<li><a>" + cocktailDataObject[i].name + "</a></li>").attr("href", ); 


            /*$("#related-buttons").append("<li>" + cocktailDataObject[i].name + "</li>".attr());*/
            // Can't target attribute. innerHTML? target child? 
        }

        // TODO - 

        $("#add-to-favourites").on('click', function () {
            // Saves to favourites 
            localStorage.setItem("favourite-cocktail", cocktailDataObject[0].name); // May need to store in object / array otherwise key gets overwritten
            $("#favourite-cocktails").append("<li>" + cocktailDataObject[0].name + "</li>");


         })

    
    })
});

