// $(document).ready(function () {
//     var giphySearchTerm = "mojito"; // Example Search term -- Pulls from search bar
//     var apiKey = "&api_key=B1QMeeTfxi77NrOloXqbNZdThiCQkuho"

//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         giphySearchTerm + apiKey; // Rochelle's key

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {

//         console.log(response);
//         console.log(cocktailResponse);

//         var cocktailGifEl = $("#cocktailGif")
//         cocktailGifEl.attr("src", response.data[0].source)

//     })

// });