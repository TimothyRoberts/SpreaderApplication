#Version 14: Creating an Array of Car Objects to Move Around the Canvas

These are the global variables associated with this function:

```js
//VARS FOR DAY&NIGHT CYCLE
  var mins = 0;
  var hours = 3;
  var timeStamp = "AM"; 
  var dayTimeBoolean = true;
  var days = 1;
  var week = 0;
  ```

The function clockIncrement is called within the draw loop - it is constantly updating. Every frame the mins variable increments and if this variable reaches 60 it resets to zero and increments the hour variable.

Then if the hours variable hits 24 then the hours reset and the day is incremented.

```js
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
```

We used if statements to check the hours variable to determine if it is AM or PM and if it is day or night

```js
    //DETERMINES IF AM/PM AND DAY/NIGHT
    if(hours >= 12){timeStamp="PM";
    }else{timeStamp = "AM"}

    if(hours > 5 && hours < 20){
        dayTimeBoolean = true;
    }else{ dayTimeBoolean = false;}
```

Finally the Hours, Minutes and Day is displayed using p5's text function. Whether it is day or night is also displayed.

```js
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
```

A resetClock function resets all of these clock values if the application is restarted.

```js
resetClock = function(){
    var mins = 0;
    var hours = 3;
    var timeStamp = "AM"; 
    var dayTimeBoolean = true;
    var days = 1;
}
```
