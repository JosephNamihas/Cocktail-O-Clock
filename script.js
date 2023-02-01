var name = 'mojito' // Example search term
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/cocktail?name=' + name,
    headers: { 'X-Api-Key': 'qU0ueVR5pJc3xqMqK4X4zw==tYV5AJfCLdKknVeh'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }

});

var giphySearchTerm = "Dog"; // Example Search term
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  giphySearchTerm + "z5qgDu3m2hDyX5jYhDexGw6TZD2YYHUy"; // May need another API key. Mine not working at the moment

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

  console.log(response);

});