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

  $("#add-info-button").on("click", function(){

    var homeTown = $("#home-town").val().trim();
    var plannedEvent = $("#planned-event").val().trim();
    var partySize = $("#party-size").val().trim();

    var informationAdded = {
        home : homeTown,
        event : plannedEvent,
        size : partySize
  };

wallPageDatabase.ref().push(informationAdded);

console.log(homeTown);
console.log(plannedEvent);
console.log(partySize);

alert("Your information has been added");

$("#home-town").val("");
$("#planned-event").val("");
$("#party-size").val("");

return false;
});

wallPageDatabase.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

    var tableHomeTown = childSnapshot.val().home
    var tableEvent = childSnapshot.val().event
    var tableSize = childSnapshot.val().size

console.log("home", tableHomeTown);
console.log("event",tableEvent);
console.log("size",tableSize);

$("#wall-table > tbody").append("<tr><td>" + tableHomeTown + 
"</td><td>" + tableEvent + "</td><td>" + tableSize + "</td><tr>");
});

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
    
    //date&location.address=phoenix

    // ajax call for EventBRITE
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

            $card.append($cardImg);
            $card.append($cardContent);

            $resultsContainer.append($col);
        });

    }

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
