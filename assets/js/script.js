// use moment.js to get todays date
var today = moment();
//references to html elements on the page
var allTimes = $(".container");
var dateEl = $("#currentDay");

//used to color code the hours depending on past, present, or if they are in the future.
var currHour = today.hour();
var currWorkDay;
var isAm;
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

    dateEl.text(today.format("MMM Do, YYYY"));

    currWorkDay = JSON.parse(localStorage.getItem('schedule'));
    if(currWorkDay == null) {
        currWorkDay = daySchedule;
    }
    for(i = 0; i < allTimes.children().length; i++) {
        allTimes.children().eq(i).children().eq(1).children().first().val(currWorkDay[i].message);
    }
};

function buildHour(hour, am) {
    var div = $('<div>');
    div.addClass('time-block');
    div.addClass('row');
    div.addClass('col-sm-12');

    var p = $('<p>');
    p.addClass('hour');
    if(am) {
        p.text(hour + " a.m.");
    } 
    else {
        p.text(hour + " p.m.");
    }
    p.addClass('col-sm-1');

    var form = $('<form>');
    var input = $('<textarea>');
    input.addClass('w-100 h-100');
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
    else if (!am && !isAm) {
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
    else if (!am && isAm) {
        input.addClass('future');
    }
    else {
        input.addClass('past');
    }
    input.attr("id", "for-btn-" + hour);
    form.append(input);
    form.addClass('col-sm-10 p-0');

    var btn = $('<button>');
    btn.text('🔒');
    btn.addClass('saveBtn');
    btn.addClass('col-sm-1');
    btn.attr("data-number", hour);

    div.append(p);
    div.append(form);
    div.append(btn);
    allTimes.append(div);
};

function saveText(event) {
    var btnClicked = event.currentTarget.getAttribute("data-number");
    var input = $(event.currentTarget).siblings().eq(1).children().first().val();
    for(var i = 0; i < currWorkDay.length; i++) {
        if(currWorkDay[i].time == btnClicked) {
            currWorkDay[i].message = input;
        }
    }
    localStorage.setItem("schedule", JSON.stringify(currWorkDay));
}

allTimes.on("click", ".saveBtn", saveText);

buildDay();