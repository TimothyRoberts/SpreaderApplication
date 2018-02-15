

  // -------------------------
  // CODE FOR USER INPUT
  // -------------------------

  var inputXPos = 1300;
  var inputYPos = 60;

  createInputs = function(){

    push();
    
    //translate(150,100);

    //GENERATED DOM OBJECTS DO NOT ADHERE TO TRANSLATE FUNCTION
    //INPUT BOX HEIGHT = 20PX

    populationInputBox = createInput();
    populationInputBox.value(population);
    populationInputBox.position(inputXPos, inputYPos); 

    mortalityRateInputBox = createInput();
    mortalityRateInputBox.value(mortalityRate);
    mortalityRateInputBox.position(inputXPos,inputYPos+20);

    contagionRateInputBox = createInput();
    contagionRateInputBox.value(contagionRate);
    contagionRateInputBox.position(inputXPos,inputYPos+40);

    VaccinationRateInputBox = createInput();
    VaccinationRateInputBox.value(vaccinationRate);
    VaccinationRateInputBox.position(inputXPos,inputYPos+60);

    startbutton = createButton('START SIMULATION');
    startbutton.position(inputXPos,inputYPos+100);
    startbutton.mousePressed(startProgram);

    //creating the lables for the parameter inputs
    noStroke();
    fill(255);
    translate(inputXPos+135,inputYPos);
    text("Population (Max 900)", 0, 5);
    text("Mortality Rate (1-100%)",0,25);
    text("Virulence (1-5)",  0,45);
    text("Vaccination Rate (0-100%) ",0,65);

    pop();
  
  }

  displayStats = function(){ // has to be called iteritively to update stats

    dataSet[0] = population - incAmm - sickAmm;
    dataSet[1] = incAmm;
    dataSet[2] = sickAmm;

    // push();

    // textSize(12);
    // noStroke();
    // fill(255);
    // translate(inputXPos+135,inputYPos);
    // text("Population (Max 900)", 0, 5);
    // text("Mortality Rate (1-100%)",0,25);
    // text("Virulence (1-5)",  0,45);
    // text("Vaccination Rate (0-100%)",0,65);

    // pop();

    // push();

    // noStroke();
    // fill(255);
    // translate(inputXPos,inputYPos);
    // text("Current Population: " + population, 0,155);
    // text("Mortality Rate: " + mortalityRate, 0,175);
    // text("Virulence: " + contagionRate,  0,195);
    // text("Vaccination Rate: " + vaccinationRate,  0,105);

    // pop();
    

    push();

    translate(1270, 0);
    fill(0);
    stroke(255);
    rect(0,0,650,1200);


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


    
    // fill(0,120,255,200);
    // noStroke();
    // rect(0, 340, dataSet[1], 20);
    

    
    // fill(141,0,0,200);
    // noStroke();
    // rect(0, 360, dataSet[2], 20);
   

   

    textSize(12);

    pop();


    if(programState == 0){
        startbutton.position(inputXPos,inputYPos+2000);
    }
    
  
  }