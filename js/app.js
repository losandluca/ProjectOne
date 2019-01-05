// auth key EVENTBRITE
var authEventKey = 'ZTWSATUDOEFRKTLCTYET';

// holds results
var $resultsContainer;
// 3 tabs
var $eventsTab;
var $weatherTab;
var $wallTab;
// pages
var $eventsPage;
var $weatherPage;
var $wallPage;

var pages;

$(document).ready(function () {
    $resultsContainer = $("#results");
    // save buttons as variables
    $eventsTab = $("#events-tab");
    $weatherTab = $("#weather-tab");
    $wallTab = $("#wall-tab");
    // saving page divs as variables
    $eventsPage = $("#events-page");
    $weatherPage = $("#weather-page");
    $wallPage = $("#wall-page");
    // pages array
    pages = [$eventsPage, $weatherPage, $wallPage];

    //set up listeners for tabs
    $eventsTab.click(() => selectPage($eventsPage));
    $weatherTab.click(() => selectPage($weatherPage));
    $wallTab.click(() => selectPage($wallPage));

    //Always start on event page
    selectPage($eventsPage);

});


// functions

// Page selector function
function selectPage($selectedPage) {
    //hide everything
    pages.forEach(($page) => {
        $page.hide();
    });
    $selectedPage.show();
}

// EventBRITE function
function runEventQuery(queryTerm) {
    var queryURL = 'https://www.eventbriteapi.com/v3/events/search/?q=' + queryTerm + '&sort_by=date&location.address=phoenix&location.within=25mi&token=' + authEventKey;

    // ajax call for EventBRITE
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // empty results container!
        $resultsContainer.empty();
        // loop through response data
        response.events.forEach((eventBriteEvent) => {
            var logoURL = eventBriteEvent.logo.original.url;
            var image = $("<img>").attr("src", logoURL);
            var eventName = eventBriteEvent.name.text;

            var eventDesc = eventBriteEvent.description.text;
            var eventStart = eventBriteEvent.start.local;
            var eventEnd = eventBriteEvent.end.local;

            var $col = $("<div/>", { class: "col s12 m7" }),
                $card = $("<div/>", { class: "card" }),
                $cardImg = $("<div/>", { class: "card-image" }),
                $cardContent = $("<div/>", { class: "card-content" });


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
$('#searchForm').submit(function (event) {
    event.preventDefault();
    var newQuery = $('#search').val().trim();
    console.log(newQuery);

    // var newURL = queryURL;
    // console.log(newUrl);

    runEventQuery(newQuery);

    // return false;
});


// query URL for WEATHER
var queryWeatherURL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=phoenix&APPID=001b0f58045147663b1ea518d34d88b4&units=imperial&cnt=5';


// weather function
function runWeatherQuery() {


    // ajax call
    $.ajax({
        url: queryWeatherURL,
        method: "GET"
    }).then(function (responseWeather) {
        // loop for weather response list
        responseWeather.list.forEach((weatherEvent) => {
            var date = weatherEvent.dt
            var minTemp = weatherEvent.temp.min
            var maxTemp = weatherEvent.temp.max;
            var windSpeed = weatherEvent.speed;
            var humidity = weatherEvent.humidity;

        var dateTimeString = moment.unix(date).format("MM-DD-YYYY")
        console.log(dateTimeString);

        // append results to table!
        $(".tableArea").append("<tr>" +
            "<td> " + dateTimeString +
            "<td>" + minTemp + '°F' +
            "<td>" + maxTemp + '°F' +
            "<td>" + windSpeed + ' m/h'+
            "<td>" + humidity +'%'+
            "</td>");    


            // weather img icon
            var iconcode = weatherEvent.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    console.log(iconurl);


        });
    });


};
// run weather function
runWeatherQuery();
