// auth key EVENTBRITE
var authEventKey = 'ZTWSATUDOEFRKTLCTYET';

// var queryTerm = "";

// query URL for EVENTBRITE
var $resultsContainer;
var $eventsTab;
var $weatherTab;
var $wallTab;

var $eventsPage;
var $weatherPage;
var $wallPage;

var pages;

$(document).ready(function(){
  $resultsContainer = $("#results");
   
   $eventsTab = $("#events-tab");
   $weatherTab = $("#weather-tab");
   $wallTab = $("#wall-tab");
   
   $eventsPage = $("#events-page");
   $weatherPage = $("#weather-page");
   $wallPage = $("#wall-page");

   pages = [$eventsPage, $weatherPage, $wallPage];

    //set up listeners for tabs
    $eventsTab.click(() => selectPage($eventsPage));
    $weatherTab.click(() => selectPage($weatherPage));
    $wallTab.click(() => selectPage($wallPage));

    //Always start on event page
    selectPage($eventsPage);

});

function selectPage($selectedPage){
    //hide everything
    pages.forEach( ($page) => {
        $page.hide();
    });
    $selectedPage.show();
}

// functions
function runEventQuery(queryTerm) {
    var queryURL = 'https://www.eventbriteapi.com/v3/events/search/?q=' + queryTerm + '&sort_by=date&location.address=phoenix&location.within=25mi&token=' + authEventKey;

    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        $resultsContainer.empty();
            response.events.forEach((eventBriteEvent) => {
                var logoURL= eventBriteEvent.logo.original.url;
                var image = $("<img>").attr("src", logoURL);
                var eventName = eventBriteEvent.name.text;

                var eventDesc = eventBriteEvent.description.text;
                var eventStart = eventBriteEvent.start.local;
                var eventEnd = eventBriteEvent.end.local;
                
                var $col = $("<div/>", { class: "col s12 m7" }),
                    $card = $("<div/>", { class: "card" }),
                    $cardImg = $("<div/>", { class: "card-image"}),
                    $cardContent = $("<div/>", { class: "card-content"});


                $col.append($card);
                
                $cardImg.append(image); 
                $cardImg.append("<span class='card-title'>" + eventName + "</span>");
                $cardContent.append("<p><b>Description : </b>" + eventDesc + "</p>");
                $cardContent.append("<p><b>Start : </b>" + new Date(eventStart) + "</p>");
                $cardContent.append("<p><b>End : </b>" + new Date(eventEnd) + "</p>");

                $card.append($cardImg);
                $card.append($cardContent);

                $resultsContainer.append($col);
            });       

        });

};



// onclick function for searching the EVENTBRITE query
$('#searchForm').submit(function(event) {
    event.preventDefault();
    var newQuery = $('#search').val().trim();
    console.log(newQuery);

    // var newURL = queryURL;
    // console.log(newUrl);

    runEventQuery(newQuery);

    // return false;
});


// query URL for WEATHER
var queryWeatherURL = 'http://api.openweathermap.org/data/2.5/forecast?id=5308655&APPID=3e6d467ec628733e79187ab3ed77a3d8&units=imperial';

