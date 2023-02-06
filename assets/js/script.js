// Global variable to store user's search input
// Make a function that will call the cocktail API using the user's input
// Event listener on the search button

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

      // Load the cocktail page view
      window.location = './cocktail.html';
      return;
    },
    error: function ajaxError(errorData) {
      // If the call errors the following will be executed
      console.error('Error: ', errorData.responseText);
      
      $("#errorModal").modal('show');
    }
  });
};

// Event listener for when the user clicks on the search button
$("#search-btn").on('click',function(event){
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
