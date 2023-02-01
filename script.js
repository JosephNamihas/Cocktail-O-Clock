var name = 'mojito'
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