// auth key EVENTBRITE
var authEventKey = 'ZTWSATUDOEFRKTLCTYET';

// query URL for EVENTBRITE
var queryURLBase = 'https://www.eventbriteapi.com/v3/events/search/?token=' + authEventKey + '&location.address=phoenix';

// variable to track number of events
var eventCounter = 0;

// functions
function runEventQuery(numEvents, queryURL) {
    // ajax call
    $.ajax({ url: queryURL, method: 'GET' })
        .done(function (eventData) {
            console.log(queryURL)
            console.log(eventData);
            console.log(eventData.events[1].name);
            // $("#results").text(eventData.events[1].name.text);
            $("#results").text(eventData.events[1].description.text);
        })
};

// onclick function for searching the EVENTBRITE query
$('#search').on('click', function () {

    var queryTerm = $('#search').val().trim();
    console.log(queryTerm);

    var newUrl = queryURLBase + "&q=" + queryTerm;
    console.log(newUrl);

    runEventQuery(10, newUrl);

    return false;
});


// query URL for WEATHER
var queryWeatherURL = 'http://api.openweathermap.org/data/2.5/forecast?id=5308655&APPID=3e6d467ec628733e79187ab3ed77a3d8&units=imperial';
