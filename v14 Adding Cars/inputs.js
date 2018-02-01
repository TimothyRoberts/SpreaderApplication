

  // -------------------------
  // CODE FOR USER INPUT
  // -------------------------
  createInputs = function(){
    push();

    translate(10,10);

    populationInputBox = createInput();
    populationInputBox.value(population);
    populationInputBox.position(canvas.width-640, margin.top+18);  

    mortalityRateInputBox = createInput();
    mortalityRateInputBox.value(mortalityRate);
    mortalityRateInputBox.position(canvas.width-640, margin.top+63);

    contagionRateInputBox = createInput();
    contagionRateInputBox.value(contagionRate);
    contagionRateInputBox.position(canvas.width-640, margin.top+108);

    VaccinationRateInputBox = createInput();
    VaccinationRateInputBox.value(vaccinationRate);
    VaccinationRateInputBox.position(canvas.width-640, margin.top+153);

    button = createButton('APPLY CHANGES');
    button.position(canvas.width-640, margin.top+205);
    button.mousePressed(setDudeAttributes);

    pop();
    
  }

  displayStats = function(){

    textSize(12);

    push()
    translate((margin.left+stageWidth),margin.top);
    fill(0);
    stroke(255);
    rect(-25,-60,185,300);
    noStroke();
    fill(255);
    text("Current Population: " + population, 0,-34);
    text("Mortality Rate: " + mortalityRate, 0,13);
    text("Virulence: " + contagionRate,  0,57);
    text("Vaccination Rate: " + vaccinationRate,  0,101);
    
    translate(200,-margin.top);
    fill(0);
    stroke(255);
    rect(-25,-10,185,300);
    noStroke();
    fill(255);
    text("Population: ", 0, 10);
    text("Mortality Rate: ",0,55);
    text("Virulence: ",  0,100);
    text("Vaccination Rate: ",0,145);
    pop();

    
  
  }