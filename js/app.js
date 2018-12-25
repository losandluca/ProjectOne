// auth key EVENTBRITE
var authEventKey = 'ZTWSATUDOEFRKTLCTYET';

// var queryTerm = "";

// query URL for EVENTBRITE

// variable to track number of events
var eventCounter = 0;

// functions
function runEventQuery(queryTerm) {
    var queryURL = 'https://www.eventbriteapi.com/v3/events/search/?q=' + queryTerm + '&sort_by=date&location.address=phoenix&location.within=25mi&token=' + authEventKey;

    // ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            console.log(queryURL);
            console.log(response);
            console.log(response.events[0].name);
            // $("#results").text(eventData.events[1].name.text);
            for (i=0; i<10; i++) {
                // $("#results").append(response.events[i].name.text);
                // $("#results").append(response.events[i].description.text);
                // $("#results").text(JSON.stringify(response));
                var imgURL = response.events[i].logo.original.url;
                var image = $("<img>").attr("src", imgURL);
                var eventName = response.events[i].name.text;

                var eventDesc = response.events[i].description.text;
                var eventStart = response.events[i].start.local;
                var eventEnd = response.events[i].end.local;
                
                var $div1 = $("<div/>", { class: "col s12 m7" }),
                    $div2 = $("<div/>", { class: "card" }),
                    $div3 = $("<div/>", { class: "card-image", id: "card-title" });
                $div1.append($div2.append($div3.append(image))).appendTo("#results");
                
                $("#card-title").append("<span class='card-title'>" + eventName + "</span>");

            //     <div class="col s12 m7">
            //       <div class="card">
            //         <div class="card-image">
            //           <img src="images/sample-1.jpg">
            //           <span class="card-title">Card Title</span>
            //         </div>
            //         <div class="card-content">
            //           <p>I am a very simple card. I am good at containing small bits of information.
            //           I am convenient because I require little markup to use effectively.</p>
            //         </div>
            //         <div class="card-action">
            //           <a href="#">This is a link</a>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            }
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
