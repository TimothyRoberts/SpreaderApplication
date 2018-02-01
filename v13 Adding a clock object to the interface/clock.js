clockIncrement = function(){

    mins++;

    //INCREMENTS HOUR AFTER 60 MINS
    //INCREMENTS DAY AFTER 24 HOURS
    if(mins > 60){
        mins = 0;
        hours ++
    }
    if(hours >= 24){
        hours = 0;
        days ++;
    }

    //DETERMINES IF AM/PM AND DAY/NIGHT
    if(hours >= 12){timeStamp="PM";
    }else{timeStamp = "AM"}

    if(hours > 5 && hours < 20){
        dayTimeBoolean = true;
    }else{ dayTimeBoolean = false;}

    textSize(12);
    noStroke();
    fill(255);
    text(hours+" : "+ mins +" "+ timeStamp, 200,10);
    text("Day: "+ days, 200, 30);

    if(dayTimeBoolean){
        text("DAY",200,50);
    }else{
        text("NIGHT",200,50)
    }
}

resetClock = function(){
    var mins = 0;
    var hours = 3;
    var timeStamp = "AM"; 
    var dayTimeBoolean = true;
    var days = 1;
}
