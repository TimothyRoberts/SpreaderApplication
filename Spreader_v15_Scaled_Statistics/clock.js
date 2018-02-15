clockIncrement = function(){

    push();

    mins=mins+2;

    if(mins > 60){
        mins = 0;
        hours ++
    }
    if(hours >= 24){
        hours = 0;
        days ++;
    }

    if(hours >= 12){timeStamp="PM";
    }else{timeStamp = "AM"}

    if(hours > 5 && hours < 20){
        dayTimeBoolean = true;
    }else{ dayTimeBoolean = false;}

    textSize(12);
    noStroke();
    fill(255);
    text(hours+" : "+ mins +" "+ timeStamp, 10,20);
    text("Day "+ days +" of out break", 10, 35);

    if(dayTimeBoolean){
        text("DAY",10,50);
    }else{
        text("NIGHT",10,50)
    }

    pop();
}

resetClock = function(){

    var mins = 0;
    var hours = 3;
    var timeStamp = "AM"; 
    var dayTimeBoolean = true;
    var days = 1;
}
