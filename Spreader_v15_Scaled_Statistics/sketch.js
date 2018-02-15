  var cnv;
  var dudes = [];
  var programState = 0;

  //GLOBAL VARS FOR PASSING TO DUDE OBJECT
  var population = 100;
  var radius = 1.5;
  var vaccinationRate = 0;
  var mortalityRate = 85;
  var contagionRate = 5;
  var populationInputBox,mortalityRateInputBox,VaccinationRateInputBox,contagionRateInputBox;

  // CANVAS AND STAGE DIMENSIONS
  var canvasWidth;
  var canvasHeight;
  var stageWidth = 1200;
  var stageHeight = 800;
  var margin = {top:25, left:25, right:700, bottom:50};

  //VARS FOR DAY&NIGHT CYCLE
  var clockCallBoolean = false;
  var mins = 0;
  var hours = 3;
  var timeStamp = "AM"; 
  var dayTimeBoolean = true;
  var days = 1;
  var week = 0;

  //VARS FOR CAR AND ATTRACTORS
  var attractors =[];
  var cars =[];
  var destination;

  //DATA VARIABLES
  var dataSet = [0,0,0];
  var incAmm;
  var sickAmm;
  var w = 600;
  var h = 100;


function setup() {
  
  cnv = createCanvas(1920,1200);
  frameRate(30);
  background(25);
  imageMode(CENTER);
  displayMenu();
  createInputs();  

}// END OF SET UP

function draw(){

  if(programState == 0){
    
  }

  if(programState == 1){
    runProgram();
  }  

}// END OF DRAW

// -------------------------
// FUNCTIONS
// -------------------------

function displayMenu(){
  noStroke();
  fill(255);
  push();
  translate(250,150);
  textSize(164);
  text("SPREADER", 0, 0);
  textSize(12);
  pop();
}

function runProgram(){

  clear();
  background(24);
  displayStats();
  //everything rendered sfter this point will be affecting by margin top and left
  translate(margin.left,margin.top);
  fill(15,15,15);
  noStroke();
  rect(0,0,stageWidth,stageHeight);
  if(clockCallBoolean){
    clockIncrement();
  }
  updateDudes();
  cnv.mousePressed(addSickDude);
}

//UPDATES THE DUDES BY CALLING THEIR FUNCTIONS
function updateDudes(){
  incAmm = 0;
  sickAmm = 0;

  for(var i=0; i<dudes.length; i++){
    dudes[i].drawDude();
    dudes[i].moveDude();
    dudes[i].countDudeAge();
    
    //for loop for checking if DUDE i intersects dude j    
    for(var j=0; j<dudes.length; j++){
      if (i != j && dudes[i].intersects(dudes[j])){    
        dudes[i].changeDudeState(dudes[j]);
      }
    }
    //for loop for checking if CAR i intersects dude j    
    for(var j=0; j<cars.length; j++){
      if (dudes[i].intersects(cars[j])){    
        dudes[i].changeDudeState(cars[j]);
      }
    }

    //removes dead cells from the array
    
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
   }

  // //updating the attractors
  // for(var i=0; i<attractors.length; i++){
  //   fill(255);
  //   noStroke();
  //   ellipse(attractors[i].x,attractors[i].y,10,10);
  // }
  //updating the cars
  for(var i=0; i<cars.length; i++){
    cars[i].moveCar();
    cars[i].drawCar();
    cars[i].countDudeAge();

    for(var j=0; j<cars.length; j++){
      if (cars[i].intersects(dudes[j])){    
        cars[i].changeDudeState(dudes[j]);
      }
    }
    if (cars[i].state == "dead"){
            cars.splice(i,1);
            population--;
      }  
  }


}// end of update dudes

//POPULATES THE DUDES AND CARS ARRAY WITH DUDE OBJECTS

function dudesGenesis(){
  
  var population1=population*0.10;
  var population2=population*0.30;
  var population3=population*0.50;
  var carPopulation=population*0.10;

  var popCounter;

  // POPLATION LOOP 1
  for(var i=0; i<population1; i++){ //FIND A MORE EFFICIENT WAY TO DO THIS
      var stateGen = floor(random(0,100));
      var state;
      //controls chance of dude being generated vaccinated
      if(stateGen >= vaccinationRate){state = "healthy"} // healthy
      else if(stateGen < vaccinationRate && vaccinationRate != 0){ state = "vaccinated"}

      var cityLocX = 250;
      var cityLocY = 250;
      var cityRad = 25;

      var xloc = randomGaussian(cityLocX,10); //(mean,standard deviation)
      var yloc = randomGaussian(cityLocY,10);
      var cityOneX = cityLocX-cityRad;
      var cityOneX2 = cityLocX+cityRad;
      var cityOneY = cityLocY-cityRad; 
      var cityOneY2 = cityLocY+cityRad;
         
      dudes[i] = new dude(xloc,
                          yloc,
                          state,              
                          cityOneX,
                          cityOneY,
                          cityOneX2,
                          cityOneY2);
  }
  //creates the attractor for the city
  attractors.push(createVector(cityLocX,cityLocY));

  

  // POPLATION LOOP 2
  for(var i=population1; i<(population2+population1); i++){
    var stateGen = floor(random(0,100));
    var state;
    //controls chance of dude being generated vaccinated
    if(stateGen >= vaccinationRate){state = "healthy"} // healthy
    else if(stateGen < vaccinationRate && vaccinationRate != 0){ state = "vaccinated"}
    
      var cityLocX = 650;
      var cityLocY = 500;
      var cityRad = 50;

      var xloc = randomGaussian(cityLocX,10); //(mean,standard deviation)
      var yloc = randomGaussian(cityLocY,10);
      var cityOneX = cityLocX-cityRad;
      var cityOneX2 = cityLocX+cityRad;
      var cityOneY = cityLocY-cityRad; 
      var cityOneY2 = cityLocY+cityRad;
    
    dudes[i] = new dude(xloc,
                        yloc,
                        state,
                        cityOneX,
                        cityOneY,
                        cityOneX2,
                        cityOneY2);
  }
  //creates the attractor for the city
  attractors.push(createVector(650,500));

  // POPLATION LOOP 3
  for(var i=(population1+population2); i<(population2+population1+population3); i++){

    var stateGen = floor(random(0,100));
    var state;
    //controls chance of dude being generated vaccinated
    if(stateGen >= vaccinationRate){state = "healthy"} // healthy
    else if(stateGen < vaccinationRate && vaccinationRate != 0){ state = "vaccinated"}

      var cityLocX = 700;
      var cityLocY = 150;
      var cityRad = 50;

      var xloc = randomGaussian(cityLocX,10); //(mean,standard deviation)
      var yloc = randomGaussian(cityLocY,10);
      var cityOneX = cityLocX-cityRad;
      var cityOneX2 = cityLocX+cityRad;
      var cityOneY = cityLocY-cityRad; 
      var cityOneY2 = cityLocY+cityRad;
       
    dudes[i] = new dude(xloc,
                        yloc,
                        state,
                        cityOneX,
                        cityOneY,
                        cityOneX2,
                        cityOneY2);
  }
  //creates the attractor for the city
  attractors.push(createVector(700,150));
  //creates the car objects for city one
  for(var j=0; j<(carPopulation*0.33); j++){
      cars.push(new Car(250,250,"healthy"));
      population++;
  }
  //creates the car objects for city two
  for(var j=0; j<(carPopulation*0.33); j++){
      cars.push(new Car(650,500,"healthy"));
      population++;
  }
  //creates the car objects for city three
  for(var j=0; j<(carPopulation*0.33); j++){
      cars.push(new Car(700,150,"healthy"));
      population++;
  }
}

//ADDS A SICK DUDE WHEN YOU CLICK
function addSickDude(){
  var d = new dude((mouseX-margin.left),
                   (mouseY-margin.top),                   
                   "incubating",
                   0,
                   0,
                   stageWidth,
                   stageHeight);

  dudes.push(d);
  population++;
  clockCallBoolean = true;
     
}

//CALLED AFTER USER HAS INPUT VALUES AND ASSIGNS THEM 
function startProgram(){

  programState = 1; // changes game state so the appropriate code is run in Draw method
  
  //passing input values into the program
  population = populationInputBox.value()
  population = parseInt(population);
  if(population > 900){
    population = 900;
    populationInputBox.value(population);
  }

  mortalityRate = mortalityRateInputBox.value()
  mortalityRate = parseInt(mortalityRate);
  if(mortalityRate > 100){
    mortalityRate = 100;
    mortalityRateInputBox.value(mortalityRate);
  }
  
  contagionRate = contagionRateInputBox.value()
  contagionRate = parseInt(contagionRate);
  if(contagionRate > 10){
    contagionRate = 10;
    contagionRateInputBox.value(contagionRate);
  }

  vaccinationRate = VaccinationRateInputBox.value()
  vaccinationRate = parseInt(vaccinationRate);
  if(vaccinationRate > 100){
    vaccinationRate = 100;
    VaccinationRateInputBox.value(vaccinationRate);
  }

  // ADD CODE TO RESET CLOCK

  dudes.splice(0,dudes.length);
  cars.splice(0,cars.length);
  dudesGenesis();
}




