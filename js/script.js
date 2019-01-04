//setup varibales
//=========================================

var authKey = "ZTWSATUDOEFRKTLCTYET";

//search parameters
var queryTerm = "";
var numResults = 0;

//url base
var queryURLBase = "https://www.eventbriteapi.com/v3/events/search/?token=" + authKey + "&location.address=phoenix";

//variable to track number of articles
var articleCounter = 0;


//functions
//=========================================
function runQuery(numArticles, queryURL) {
    //ajax function
    $.ajax({url: queryURL, method: "GET"})
    .done(function(eventData) {
        console.log(queryURL)
        console.log(eventData);
    })


}


//main process
//=========================================
$('#search').on('click', function() {

    var queryTerm = $('#search').val().trim();
    console.log(queryTerm);
    
    var newUrl = queryURLBase + "&q=" + queryTerm;
    console.log(newUrl);

    runQuery(10, newUrl);

    return false;
})

//for (var i = 0; i < numArticles; i++) {
    // Get specific article info for current index
    //var article = NYTData.response.docs[i];

    // Increase the articleCount (track article # - starting at 1)
    //var articleCount = i + 1;

    // Create the  list group to contain the articles and add the article content for each
   // var $articleList = $("<ul>");
    //$articleList.addClass("list-group");

    // Add the newly created element to the DOM
    //$("#article-section").append($articleList);

//1. retrieve user inputs and convert to variables
//2. use those variables to run an ajax call to eventbrite
//3. break down eventbrite object into useable fields
//4. dynamically generate html content

//5. dealing with bugs

