var topics = ["warhammer", "tf2", "potoo", "gundam", "wargame"]

// creates new buttons for each topic in the array in the specified section ID
for (i=0; i<topics.length; i++) {
    var newButton = $('<button>'+topics[i]+'</button>');
    newButton.appendTo('#button-display')
}
// set on click events for newly-created buttons
$('<button>').click(function() {
// sets term as the text found on the button [THIS STEP STILL NOT WORKING]
    var term = this.html;
    console.log(term)
// ajax query the giphy api to search for terms using term as the search keywords and get first 10 responses
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+term+"&api_key=kt5FkrPm69qYkg9pUiPaZlo10UTQ8JTq&limit=10";

    $.ajax({
        url: queryurl,
        method: "GET"
        }).then(function(response){
        console.log(response);
        for (i=0; i<response.length; i++) {
            var div = $('<div>');
            // append still image url to div tag as well as rating under two different paragraph tags
            // create two attributes: data-still and data-animate, each with appropriate urls for still and animated gif urls
            var p1 = $("<p>");
            var img = $("<img>");
            img.attr("src", response.images.fixed_height_still.url);
            // the next three lines sets up the attributes necessary to cycle between still and animated gifs
            img.attr("data-state", "still");
            img.attr("data-still", response.images.fixed_height_still.url);
            img.attr("data-animate", response.images.fixed_height.url);
            p1.append(img);
            var p2 = $("<p>");
            p2.text(response.rating);
            div.append(p1, p2);
       
            $('#gifs').append(div);
        }
        })
// set on click event on images to cycle betwen stills and gif urls
$('<img>').click(function () {
    // declare variable state
    var state = $(this).attr("data-state");
    // sets code necessary to toggle between animated and still gifs
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("src", $(this).attr("data-state", "still"));
    }
})
});