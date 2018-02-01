  
  //GLOBAL VARS FOR PASSING TO DUDE OBJECT
  var cnv;
  var dudes = [];
  var population = 100;
  var radius = 1;
  var vaccinationRate = 50;
  var mortalityRate = 85;
  var contagionRate = 1;
  var populationInputBox,mortalityRateInputBox,VaccinationRateInputBox,contagionRateInputBox;

  // CANVAS AND STAGE DIMENSIONS
  var canvasWidth = 1440;
  var canvasHeight = 1000;
  var stageWidth = 500;
  var stageHeight = 500;
  var margin = {top:50, left:50, right:700, bottom:50};

  //VARS FOR DAY&NIGHT CYCLE
  var mins = 0;
  var hours = 3;
  var timeStamp = "AM"; 
  var dayTimeBoolean = true;
  var days = 1;
  var week = 0;

function setup() {
  
  cnv = createCanvas(canvasWidth,canvasHeight);
  frameRate(30);
  createInputs();
  dudesGenesis();

}// END OF SET UP

function draw(){

  clear();
  background(24);
  noFill();
  stroke(255);
  translate(margin.left,margin.top);
  rect(0,0,stageWidth,stageHeight);
  updateDudes();
  displayStats();
  clockIncrement();
  cnv.mousePressed(addSickDude);

}// END OF DRAW





// -------------------------
// FUNCTIONS
// -------------------------



//UPDATES THE DUDES BY CALLING THEIR FUNCTIONS
function updateDudes(){
  for(var i=0; i<dudes.length; i++){
        dudes[i].drawDude();
        dudes[i].moveDude();
        dudes[i].countDudeAge();
        
        for(var j=0; j<dudes.length; j++){
        if (i != j && dudes[i].intersects(dudes[j])){    
            dudes[i].changeDudeState(dudes[j]);
          }
        }
  if (dudes[i].state == "dead"){
            dudes.splice(i,1);
            population--;
        }
  }
}

//POPULATES THE DUDES ARRAY WITH DUDE OBJECTS
function dudesGenesis(){
  
  var population1=population*0.65;
  var population2=population*0.30;
  var population3=population*0.05;

  var popCounter;

  // POPLATION LOOP 1
  for(var i=0; i<population1; i++){

    var stateGen = floor(random(0,100));
    var state;

    //controls chance of dude being generated vaccinated
    if(stateGen >= vaccinationRate){state = "healthy"} // healthy
    else if(stateGen < vaccinationRate && vaccinationRate != 0){ state = "vaccinated"}

    var xloc = randomGaussian(150,10); //(mean,standard deviation)
    var yloc = randomGaussian(150,10);

    var cityOneX = 50;
    var cityOneX2 = 200;

    var cityOneY = 50; 
    var cityOneY2 = 200;
       
    dudes[i] = new dude(xloc,
                        yloc,
                        radius,
                        state,
                        mortalityRate,
                        contagionRate,
                        cityOneX,
                        cityOneY,
                        cityOneX2,
                        cityOneY2);

  }

  // POPLATION LOOP 2
  for(var i=population1; i<(population2+population1); i++){

    var stateGen = floor(random(0,100));
    var state;
    
    //controls chance of dude being generated vaccinated
    if(stateGen >= vaccinationRate){state = "healthy"} // healthy
    else if(stateGen < vaccinationRate && vaccinationRate != 0){ state = "vaccinated"}

    var xloc = randomGaussian(275,6); //(mean,standard deviation)
    var yloc = randomGaussian(275,6);

    var cityOneX = 250;
    var cityOneX2 = 350;

    var cityOneY = 250; 
    var cityOneY2 = 350;
       
    dudes[i] = new dude(xloc,
                        yloc,
                        radius,
                        state,
                        mortalityRate,
                        contagionRate,
                        cityOneX,
                        cityOneY,
                        cityOneX2,
                        cityOneY2);
  }

  // POPLATION LOOP 3
  for(var i=(population1+population2); i<(population2+population1+population3); i++){

    var stateGen = floor(random(0,100));
    var state;

    //controls chance of dude being generated vaccinated
    if(stateGen >= vaccinationRate){state = "healthy"} // healthy
    else if(stateGen < vaccinationRate && vaccinationRate != 0){ state = "vaccinated"}

    var xloc = randomGaussian(375,3); //(mean,standard deviation)
    var yloc = randomGaussian(375,3);

    var cityOneX = 350;
    var cityOneX2 = 400;

    var cityOneY = 350; 
    var cityOneY2 = 400;
       
    dudes[i] = new dude(xloc,
                        yloc,
                        radius,
                        state,
                        mortalityRate,
                        contagionRate,
                        cityOneX,
                        cityOneY,
                        cityOneX2,
                        cityOneY2);
  }
}

//ADDS A SICK DUDE WHEN YOU CLICK
function addSickDude(){
  var d = new dude((mouseX-margin.left),
                   (mouseY-margin.top),
                   radius,
                   "incubating",
                   mortalityRate,
                   contagionRate,
                   0,
                   0,
                   stageWidth,
                   stageHeight);//ADD IN CONSTRAINTS TO THE CONSTRUCTER

  dudes.push(d);
  population++;
     
}

//CALLED AFTER USER HAS INPUT VALUES AND ASSIGNS THEM 
function setDudeAttributes(){
  
  population = populationInputBox.value()
  population = parseInt(population);

  mortalityRate = mortalityRateInputBox.value()
  mortalityRate = parseInt(mortalityRate);
  
  contagionRate = contagionRateInputBox.value()
  contagionRate = parseInt(contagionRate);

  vaccinationRate = VaccinationRateInputBox.value()
  vaccinationRate = parseInt(vaccinationRate);

  dudes.splice(0,dudes.length);
   var mins = 0;
    var hours = 3;
    var timeStamp = "AM"; 
    var dayTimeBoolean = true;
    var days = 1;
  dudesGenesis();
}




