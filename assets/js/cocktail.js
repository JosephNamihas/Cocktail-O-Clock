$(document).ready(function () {
    // Getting the cocktail data from local storage and storing into a new variable
    var cocktailDataObject = JSON.parse(localStorage.getItem("data"));

    // Using the cocktail name to do the gif search
    var giphySearchTerm = cocktailDataObject[0].name; 

    console.log(cocktailDataObject);

    var apiKey = "&api_key=B1QMeeTfxi77NrOloXqbNZdThiCQkuho"
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        giphySearchTerm + apiKey; 

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        // Populates the Cocktail Name on the cocktail page
        var cocktailNameEl = cocktailDataObject[0].name
        var cocktailHeaderEl = $("#cocktail-name")
        cocktailHeaderEl.text(cocktailNameEl)

        // Populates the Cocktail GIF on the cocktail page
        var cocktailGifEl = $("#cocktailGif")
        cocktailGifEl.attr("src", response.data[0].images.original.url)

    })

});