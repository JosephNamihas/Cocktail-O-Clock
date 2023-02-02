// Global variable to store user's search input

// Make a function that will call the cocktail API using the user's input

// Event listener on the search button

var cocktailName = "";

function getCocktail() {
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/cocktail?name=' + cocktailName,
    headers: { 'X-Api-Key': 'oG7S2vqNUXRwDPUivFn60w==v3SxU4nBy9O504CG' },
    contentType: 'application/json',
    success: function (cocktailData) {
      console.log(cocktailData);

      // Todo: Look into local storage to store the users input - retrieve that on cocktail API
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
};

function showCocktail() {
  var apiKey = "&api_key=B1QMeeTfxi77NrOloXqbNZdThiCQkuho"

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cocktailName + apiKey; // Rochelle's key

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);

    var cocktailGifEl = $("#cocktailGif")
    cocktailGifEl.attr("src", response.data[0].source)

  });
}

$("#search-btn").on('click', function (event) {
  event.preventDefault();

  cocktailName = $("#search-input").val();
  
  getCocktail();
});
