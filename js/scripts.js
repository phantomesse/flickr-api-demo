var FLICKR_API_KEY = '236f5a995bc730e9cf016755b776702c';

// Handle the submit event for the search form
$('#search').submit(function(e) {
  // Prevent the form from refreshing the page
  e.preventDefault();

  // Check if the user has typed something into the search input
  var query = $('#search input').val();
  if (query.trim().length === 0) {
    // The user has not typed anything in or just queried whitespace (e.g. spaces)
    return;
  }

  // The user has typed in something into the search input, so let's start querying the Flickr API!
  get_images(query);
});

// A function that retrieves images from the Flickr API based on a query
function get_images(query) {
  $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search'
      + '&api_key=' + FLICKR_API_KEY
      + '&tags=' + query
      + '&safe_search=1'
      + '&per_page=100'
      + '&format=json'
      + '&extras=url_q'
      + '&jsoncallback=?',
  function(response) {
    // Move the search form to the top of the page by adding a class called 'sticky'
    if (!$('#search').hasClass('sticky')) {
      $('#search').addClass('sticky');
    }

    // Clear the image container (just in case there were other images in it from previous searches)
    clear_image_container();

    var images = response.photos.photo;
    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      add_image_to_image_container(image);
    }
  });
}

// Parses through an image JSON object returned by the Flickr API and adds it into the image container
function add_image_to_image_container(image) {
  console.log(image);
  $('<img>')
    .attr('src', image.url_q)
    .appendTo('#images-container');
}

// Clears the image container
function clear_image_container() {
  $('#images-container').empty();
}
