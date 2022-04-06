var allTImes = $(".container");

function buildDay() {
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
    input.addClass('present w-100 h-100');
    form.append(input);
    form.addClass('col-sm-10 p-0');

    var btn = $('<button>');
    btn.text('🔒');
    btn.addClass('saveBtn');
    btn.addClass('col-sm-1');

    div.append(p);
    div.append(form);
    div.append(btn);
    allTImes.append(div);
};

buildDay();