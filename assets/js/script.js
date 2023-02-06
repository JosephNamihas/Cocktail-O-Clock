function getCocktail(cocktailName) {
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

      // Validation for non-existant cocktail 
      if (cocktailData.length === 0) {
        $("#errorModal").modal('show');
        getRandom();
      } else {
        window.location = './cocktail.html';
      }
    },
    error: function ajaxError(errorData) {
      // If the call errors the following will be executed
      console.error('Error: ', errorData.responseText);

      $("#errorModal").modal('show');
      getRandom();

    }
  });
};

//Function to select a random cocktail from a popular list of cocktails
function getRandom() {
  var randomCocktail = popularCocktails[Math.floor(Math.random() * popularCocktails.length)];

  $("#randomCocktail").append(`<a href="#" id="randomCocktailLink">${randomCocktail}</a>`);

  $("#randomCocktailLink").on('click', function (event) {
    event.preventDefault();
    var cocktailName = randomCocktail;

    localStorage.setItem("nameOfCocktail", cocktailName);

    // Calls the above function using the users input
    getCocktail(cocktailName);
  });
};


// Event listener for when the user clicks on the search button
$("#search-btn").on('click', function (event) {
  event.preventDefault();
  // Gets the users input
  var cocktailName = $("#search-input").val().trim();
  //clear input box after search
  $("#search-input").val("");

  localStorage.setItem("nameOfCocktail", cocktailName);

  // Calls the above function using the users input
  getCocktail(cocktailName);
});

// Added a keyup event listener so the user can enter a cocktail and press enter on the keyboard instead of clicking the button
$("#search-input").on("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#search-btn").click();
  };
});

// Clears the html and local storage when the user clicks try again as it appended multiple suggestions
$("#tryAgain").on('click', function () {
  $("#randomCocktail").html("");
});
