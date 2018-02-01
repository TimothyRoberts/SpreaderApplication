  
  //GLOBAL VARS FOR PASSING TO DUDE OBJECT
  var cnv;
  var dudes = [];
  var population = 100;
  var radius = 2;
  var vaccinationRate = 50;
  var mortalityRate = 85;
  var contagionRate = 1;
  var populationInputBox,mortalityRateInputBox,VaccinationRateInputBox,contagionRateInputBox;

  //GLOBAL VARIABLES FOR PASSING TO CAR OBJECT
  var cars = [];
  var carCount = 75;
  var carRadius = 2;

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
  carGenesis();

}// END OF SET UP

function draw(){

  clear();
  background(24);
  noFill();
  stroke(255);
  translate(margin.left,margin.top);
  rect(0,0,stageWidth,stageHeight);
  updateDudes();
  updateCars();
  displayStats();
  clockIncrement();
  cnv.mousePressed(addSickDude);

  for(var i=0; i<cars.length; i++){
    
    cars[i].moveCar();
    cars[i].drawCar();
    cars[i].countCarAge()

    for(var j=0; j<dudes.length; j++){
    if (cars[i].intersects(dudes[j])){

        console.log("BOM");    
        cars[i].changeDudeState(dudes[j]);
      }
    }
  }

}// END OF DRAW





// -------------------------
// FUNCTIONS
// -------------------------

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

    var xloc = randomGaussian(150,20); //(mean,standard deviation)
    var yloc = randomGaussian(150,20);

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

    var xloc = randomGaussian(325,20); //(mean,standard deviation)
    var yloc = randomGaussian(375,20);

    var cityTwoX = 300;
    var cityTwoX2 = 400;

    var cityTwoY = 350; 
    var cityTwoY2 = 400;

    dudes[i] = new dude(xloc,
                        yloc,
                        radius,
                        state,
                        mortalityRate,
                        contagionRate,
                        cityTwoX,
                        cityTwoY,
                        cityTwoX2,
                        cityTwoY2);
  }

}

function carGenesis() {

  for(var i=0; i<carCount; i++){ 

    var stateGen = floor(random(0,100));
    var state;
    var xloc = randomGaussian(150,50); //(mean,standard deviation)
    var yloc = randomGaussian(350,50);
    var smoothness = 0.006;

    cars[i] = new car(xloc,yloc,carRadius,"healthy", smoothness); //dude(x,y,radius,state)
  }
}


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

//UPDATES THE CARS BY CALLING THEIR FUNCTIONS
function updateCars(){
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




