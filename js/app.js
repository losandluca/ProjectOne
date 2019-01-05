// auth key EVENTBRITE
var authEventKey = 'ZTWSATUDOEFRKTLCTYET';

// var queryTerm = "";

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

// functions
function selectPage($selectedPage){
    //hide everything
    pages.forEach( ($page) => {
        $page.hide();
    });
    $selectedPage.show();
}

// query URL for EVENTBRITE
function runEventQuery(queryTerm) {
    var queryURL = 'https://www.eventbriteapi.com/v3/events/search/?q=' + queryTerm + '&sort_by=best&location.address=phoenix&location.within=25mi&token=' + authEventKey;
    
    //date&location.address=phoenix

    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $resultsContainer.empty();
        response.events.forEach((eventBriteEvent) => {
                var logoURL= eventBriteEvent.logo.original.url;
                var image = $("<img>").attr("src", logoURL);
                var eventName = eventBriteEvent.name.text;

                var eventDesc = eventBriteEvent.description.text;
                //start
                var eventStart = eventBriteEvent.start.local;
                var eventStartIn = moment(eventStart).fromNow();
                var eventStartShort = moment(eventStart).format('dddd [,] MMM Do');
                var eventStartTime = moment(eventStart).format('h:mm:ss a');

                //end
                var eventEnd = eventBriteEvent.end.local;
                var eventEndShort = moment(eventEnd).format('dddd, MMM Do');
                var eventEndTime = moment(eventEnd).format('h:mm:ss a');

                //url
                var ebClick = eventBriteEvent.url;




                var $col = $("<div/>", { class: "col s12 m7" }),
                    $card = $("<div/>", { class: "card" }),
                    $cardImg = $("<div/>", { class: "card-image"}),
                    $cardContent = $("<div/>", { class: "card-content"});


                $col.append($card);
                
                $cardImg.append(image); 
                $cardImg.append("<span class='card-title'>" + eventName + "</span>");
                $cardContent.append("<p><b>Start : </b>" + eventStartIn + "<br>" + eventStartShort + "<b> at </b>" + eventStartTime + "</p>");
                $cardContent.append("<p><b>End : </b><br>" + eventEndShort + "<b> at </b>" + eventEndTime + "</p>");
                $cardContent.append("<p><b>Link : </b><span><a href='" + ebClick + "'>Go to Eventbrite</a></span>");
                $cardContent.append("<p class='comment'><b>Description : </b>" + eventDesc + "</p>");
                $(".comment").shorten();
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
