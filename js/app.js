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
    
    // slider pictures
    $('.slider').slider({ full_width: true });

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
    var queryURL = 'https://www.eventbriteapi.com/v3/events/search/?q=' + queryTerm + '&sort_by=best&location.address=phoenix&location.within=25mi&token=' + authEventKey;
    // ajax call for EventBRITE
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log in order to examine JSON object response
        console.log(response);
        // emptying previous results if there are any
        $resultsContainer.empty();
        // loop for each event:
        response.events.forEach((eventBriteEvent) => {
            // capturing PICTURE
            var logoURL= eventBriteEvent.logo.original.url;
            var image = $("<img>").attr("src", logoURL);
            // capturing NAME
            var eventName = eventBriteEvent.name.text;
            // capturing DESCRIPTION
            var eventDesc = eventBriteEvent.description.text;
            
            // capturing START TIME 
            var eventStart = eventBriteEvent.start.local;
                // using MOMENT.JS to capture time till event starts, simple date, and time
                var eventStartIn = moment(eventStart).fromNow();
                var eventStartShort = moment(eventStart).format('dddd, MMM Do');
                var eventStartTime = moment(eventStart).format('h:mm:ss a');

            // capturing END TIME
            var eventEnd = eventBriteEvent.end.local;
                // using MOMENT.JS to capture simple date and time
                var eventEndShort = moment(eventEnd).format('dddd, MMM Do');
                var eventEndTime = moment(eventEnd).format('h:mm:ss a');

            // capturing the official URL for that event on EVENTBRITE's website
            // in case user wants to buy a ticket or have other functionality
            var ebClick = eventBriteEvent.url;

            // creating CARDS with MATERIALIZE class names
            // note the DIVS for column, card, image, and content
            // these will be nested in the next block of code - the indentation is only to show how they will be nested
            var $col = $("<div/>", { class: "col s12 m7" }),
                    $card = $("<div/>", { class: "card" }),
                        $cardImg = $("<div/>", { class: "card-image"}),
                        $cardContent = $("<div/>", { class: "card-content"});

            // nesting card div in column div
            $col.append($card);
           
            // placing the image in the card image div
            $cardImg.append(image); 
           
            // placing the event name in the card image div, which will place it on top of the picture
            $cardImg.append("<span class='card-title'>" + eventName + "</span>");
           
            // nesting the image div in the card div
            $card.append($cardImg);
           
            // placing start info into content section of card
            $cardContent.append("<p><b>Start : </b>" + eventStartIn + "<br>" + eventStartShort + "<b> at </b>" + eventStartTime + "</p>");
            
            // placing end info into content section of card
            $cardContent.append("<p><b>End : </b><br>" + eventEndShort + "<b> at </b>" + eventEndTime + "</p>");
            
            // placing link into content section of card
            $cardContent.append("<p><b>Link : </b><span><a href='" + ebClick + "'>Go to Eventbrite</a></span>");

            // placing description into content section of card
            $cardContent.append("<p class='comment'><b>Description : </b>" + eventDesc + "</p>");
                // shortening long descriptions using JQuery plugin found using Google Fu!  HaYAA!
                $(".comment").shorten();
            
            // nesting the content div into the card div (after the image div)
            $card.append($cardContent);

            // placing the whole card into the DOM, 
            $resultsContainer.append($col);
            
            // end of loop 
        });       
    });
}

// onclick function for searching the EVENTBRITE query
$('#searchForm').submit(function (event) {
    event.preventDefault();
    var newQuery = $('#search').val().trim();
    runEventQuery(newQuery);
});

// ======================================================================================================================================================
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
            
            var dateTimeString = moment.unix(date).format("dddd, MMMM Do YYYY")
            console.log(dateTimeString);

            // append results to table!
            $(".tableArea").append("<tr>" +
                "<td> " + dateTimeString +
                "<td>" + minTemp + '°F' +
                "<td>" + maxTemp + '°F' +
                "<td>" + windSpeed + ' m/h' +
                "<td>" + humidity + '%' +
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

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBbBXnNFqDNP2pG-BVTvpmUqgh6UdCr3wo",
    authDomain: "groupprojectone-12d0c.firebaseapp.com",
    databaseURL: "https://groupprojectone-12d0c.firebaseio.com",
    projectId: "groupprojectone-12d0c",
    storageBucket: "groupprojectone-12d0c.appspot.com",
    messagingSenderId: "866266191637"
};
firebase.initializeApp(config);

var wallPageDatabase = firebase.database();

// onclick function for user attending event!
$("#add-info-button").on("click", function () {
    event.preventDefault();

    var homeTown = $("#home-town").val().trim();
    var plannedEvent = $("#planned-event").val().trim();
    var partySize = $("#party-size").val().trim();

    var informationAdded = {
        home: homeTown,
        event: plannedEvent,
        size: partySize
    };
    // push info to firebase
    wallPageDatabase.ref().push(informationAdded);

    console.log(homeTown);
    console.log(plannedEvent);
    console.log(partySize);

    // alert("Your information has been added"); **no alerts per requirements.**

    $("#home-town").val("");
    $("#planned-event").val("");
    $("#party-size").val("");

    return false;
});

wallPageDatabase.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    var sv = snapshot.val();

    var tableHomeTown = sv.home
    var tableEvent = sv.event
    var tableSize = sv.size

    console.log("home", tableHomeTown);
    console.log("event", tableEvent);
    console.log("size", tableSize);

    // append firebase data to table
    $("#wall-table").append(
        "<tr><td>" + tableHomeTown +
        "</td><td>" + tableEvent +
        "</td><td>" + tableSize +
        "</td><tr>");
});
