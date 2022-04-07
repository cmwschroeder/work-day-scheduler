var today = moment();
var allTimes = $(".container");
var dateEl = $("#currentDay");

var currHour = today.hour();
var isAm;

function buildDay() {   
    if(currHour >= 12) {
        am = false;
        if (currHour > 12) {
            currHour = currHour - 12;
        }
    }
    else {
        am = true;
    }
    allTimes.addClass('mb-3');
    console.log(today.hour());
    for(var i = 9; i < 13; i++) {
        buildHour(i, true);
    }
    for(i = 1; i < 6; i++) {
        buildHour(i, false);
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
    form.append(input);
    form.addClass('col-sm-10 p-0');

    var btn = $('<button>');
    btn.text('🔒');
    btn.addClass('saveBtn');
    btn.addClass('col-sm-1');

    div.append(p);
    div.append(form);
    div.append(btn);
    allTimes.append(div);
};

buildDay();