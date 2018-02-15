# Version 15: Adding Statistics to the Simulation

In this iteration, a dataset is added to store information regarding the status of the population. 

```js
//DATA VARIABLES
var dataSet = [0,0,0];
var incAmm;
var sickAmm;
```

The ammount of healthy, infected and incubated cells are stored in this dataset by checking the status of the cells and adding the total status count to the dataset. For example, if there is 25 infected cells currently being displayed, then the infected count in the dataset will be 25.

```js
    if (dudes[i].state == "dead"){
      dudes.splice(i,1);
      population--;
    }
    if (dudes[i].state == "incubating"){
      incAmm++;
    }
    if (dudes[i].state == "sick"){
      sickAmm++;
    }
```

In the displayStats function, which is looping, this is where the count in the dataset (where each variable in the array is still equal to zero) is set to our sum of the cells status. 

```js
displayStats = function(){ // has to be called iteritively to update stats

    dataSet[0] = population - incAmm - sickAmm;
    dataSet[1] = incAmm;
    dataSet[2] = sickAmm;
```

The final step is to draw and scale rectangles based on these values. The x axis represents the value of the status - there is a rectangle drawn for healthy, incubated and infected cells.

```js
//HEALTHY RECT
    push();
    translate(0, 300);
    this.xMap = map(dataSet[0], 0, 100, 0, 560);
    fill(255);
    noStroke();
    text("Healthy Population:", 10, 0);
    stroke(255);
    noFill();
    rect(10,10, 625,10);
    fill(255);
    rect(10, 10, xMap, 10);
    pop();

    //INCUBATED RECT
    push();
    translate(0, 350);
    this.xMap2 = map(dataSet[1], 0, 100, 0, 560);
    fill(255);
    noStroke();
    text("Incubated Population:", 10, 0);
    stroke(0,120,255,200);
    noFill();
    rect(10,10, 625,10);
    fill(0,120,255,200);
    rect(10, 10, xMap2, 10);
    pop();

    //SICK RECT
    push();
    translate(0, 400);
    this.xMap3 = map(dataSet[2], 0, 100, 0, 560);
    fill(255);
    noStroke();
    text("Infected Population:", 10, 0);
    stroke(141,0,0,200);
    noFill();
    rect(10,10, 625,10);
    fill(141,0,0,200);
    rect(10, 10, xMap3, 10);
    pop();
```


