// use moment.js to get todays date
var today = moment();
//references to html elements on the page
var allTimes = $(".container");
var dateEl = $("#currentDay");

//used to color code the hours depending on past, present, or if they are in the future.
var currHour = today.hour();
var currWorkDay;
var isAm;

//create a basic schedule for the day to use for first time loading the page, no messages in each hour
var daySchedule = [
    {
        time: 9,
        message: ""
    },
    {
        time: 10,
        message: ""
    },
    {
        time: 11,
        message: ""
    },
    {
        time: 12,
        message: ""
    },
    {
        time: 1,
        message: ""
    },
    {
        time: 2,
        message: ""
    },
    {
        time: 3,
        message: ""
    },
    {
        time: 4,
        message: ""
    },
    {
        time: 5,
        message: ""
    }
];

/*
 * The function that runs on a page load, builds calendar part and populates the text areas
 */
function buildDay() {   
    //checks for the current hour of the day, makes it so the hour will be between 1-12 and saves wether it is in the pm or am
    if(currHour >= 12) {
        isAm = false;
        if (currHour > 12) {
            currHour = currHour - 12;
        }
    }
    else {
        isAm = true;
    }
    allTimes.addClass('mb-3');
    //runs through all the hours needed to build in the day
    for(var i = 9; i < 12; i++) {
        buildHour(i, true);
    }
    buildHour(12, false);
    for(i = 1; i < 6; i++) {
        buildHour(i, false);
    }

    //sets the text in the title with today's date
    dateEl.text(today.format("MMM Do, YYYY"));

    //loads schedule from local storage
    currWorkDay = JSON.parse(localStorage.getItem('schedule'));
    //initializes the local storage element if this is the first time the user has opened the page
    if(currWorkDay == null) {
        currWorkDay = daySchedule;
    }
    //sets messages in text areas to what they were in local storage
    for(i = 0; i < allTimes.children().length; i++) {
        allTimes.children().eq(i).children().eq(1).children().first().val(currWorkDay[i].message);
    }
};

/*
 * This function will build a 1 hour block and append that block onto the schedule
 */
function buildHour(hour, am) {
    //create a div and give it classes for styling
    var div = $('<div>');
    div.addClass('time-block');
    div.addClass('row');
    div.addClass('col-sm-12');

    //create a p that will show which hour block it is
    var p = $('<p>');
    p.addClass('hour');
    //if it is in the am put am if it is in the pm put pm
    if(am) {
        p.text(hour + " a.m.");
    } 
    else {
        p.text(hour + " p.m.");
    }
    p.addClass('col-sm-1');

    //create a form to hold the text box, create text box
    var form = $('<form>');
    var input = $('<textarea>');
    input.addClass('w-100 h-100');
    //logic that will color the hours based on if they are past, present, or future
    //these statements are when the hour being created is the morning and it is the morning
    if(am && isAm) {
        if(currHour > hour) {
            input.addClass('past');
        }
        else if(currHour == hour) {
            input.addClass('present');
        }
        else {
            input.addClass('future');
        }
    }
    //this logic is for when the hour being created is in the afternoon and it is the afternoon
    else if (!am && !isAm) {
        //special checks for 12 since 12 is harder to compare with our logic
        if(currHour == 12 || hour == 12) {
            if(currHour == 12 && hour != 12) {
                input.addClass('future');
            }
            else if (currHour == 12 && hour == 12) {
                input.addClass('present');
            }
            else {
                input.addClass('past');
            }
        }
        else if(currHour > hour) {
            input.addClass('past');
        }
        else if(currHour == hour) {
            input.addClass('present');
        }
        else {
            input.addClass('future');
        }
    }
    //sets to future if it is the morning but we are creating hours in the afternoon
    else if (!am && isAm) {
        input.addClass('future');
    }
    //sets to past if it is the afternoon and we are creating hours in the morning
    else {
        input.addClass('past');
    }
    input.attr("id", "for-btn-" + hour);
    form.append(input);
    form.addClass('col-sm-10 p-0');

    //create a button and give it classes for styling, give a data-number so we know which button is clicked
    var btn = $('<button>');
    btn.text('🔒');
    btn.addClass('saveBtn');
    btn.addClass('col-sm-1');
    btn.attr("data-number", hour);

    //append all created elements onto the webpage
    div.append(p);
    div.append(form);
    div.append(btn);
    allTimes.append(div);
};

/*
 * This function will store the text of the hour that the button that was clicked on
 */
function saveText(event) {
    //get button number so we know which hour was clicked
    var btnClicked = event.currentTarget.getAttribute("data-number");
    //get inputted text
    var input = $(event.currentTarget).siblings().eq(1).children().first().val();
    //loop through the array of objects to get to the correct hour, save the message in that hour
    for(var i = 0; i < currWorkDay.length; i++) {
        if(currWorkDay[i].time == btnClicked) {
            currWorkDay[i].message = input;
        }
    }
    //save the new message into local storage
    localStorage.setItem("schedule", JSON.stringify(currWorkDay));
}

//listener for any button that is clicked
allTimes.on("click", ".saveBtn", saveText);

//calls the function that sets up the day
buildDay();