var cocktailName = ""; // Example search term

function getCocktail(){
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/cocktail?name=' + cocktailName,
    headers: { 'X-Api-Key': 'oG7S2vqNUXRwDPUivFn60w==v3SxU4nBy9O504CG'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
        window.location="./cocktail.html"
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }

});}

$("#search-btn").on('click', function(){
  cocktailName = $("#search-input").val()
  getCocktail()


})



var giphySearchTerm = "cocktail"; // Example Search term -- Pulls from search bar
var apiKey = "&api_key=B1QMeeTfxi77NrOloXqbNZdThiCQkuho"

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  giphySearchTerm + apiKey; // Rochelle's key

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

  console.log(response);

});

// Global variable to store user's search input

// Make a function that will call the cocktail API using the user's input

// Event listener on the search button

