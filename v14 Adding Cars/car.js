function car(x,y,radius,state, smoothness){

  this.x = x;
  this.y = y;
  this.v = 3;
  this.r = radius;
  this.state = state;
  this.smoothness = smoothness;

  this.mortalityRate = 90;
  this.col = color(255);
  this.age = 0;

  this.position = createVector(x, y);
  this.noff = createVector(random(1000), random(1000));

  this.drawCar = function(){
    

    noStroke();
    if(this.state  == "sick"){
      this.col = color(255,0,0,100)
      fill(this.col);
      ellipse(this.position.x,this.position.y,this.r*2);
    }else if(this.state  == "incubating"){
      this.col = color(0,150,255,100);
      fill(this.col);
      ellipse(this.position.x,this.position.y,this.r*2);
    }else if(this.state  == "recovered"){
      this.col = color(100,255,100,100);
      fill(this.col);
      ellipse(this.position.x,this.position.y,this.r*2);
    }else if(this.state  == "healthy"){
      this.col = color(255,255,255,200);
      noStroke();
      fill(this.col);
      ellipse(this.position.x,this.position.y,this.r*2);
    }


    // this.x = constrain(this.x, 200, width-220);
    // this.y = constrain(this.y, 200, height-210);
   
   
  }
  this.moveCar = function(){

    //x and y position now set to smoothly move randomly from 
    //0 - 500 (across stage)
    this.position.x = map(noise(this.noff.x), 0, 1, 0, 500);
    this.position.y = map(noise(this.noff.y), 0, 1, 0, 500);
    //this controls how smooth the random movement will be
    this.noff.add(this.smoothness, this.smoothness);

    
    
  }

  this.intersects = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }
   
  this.changeDudeState = function(other){
    
    // RULES OF INFECTION SPREAD

    if(this.state == "sick" && other.state == "healthy"){
      other.state = "incubating";

    }if(this.state == "incubating" && other.state == "healthy"){
      other.state = "incubating";
    }  


  }

  this.countCarAge = function(){

    // console.log(this.state);

    if(this.state == "incubating"||this.state == "sick"){
         this.age ++;
    }
     if (this.age >= 50 && this.state == "incubating"){ // 600 is from framerate * by the number of seconds incubation lasts
        this.state = "sick"
        this.age = 0;
    }
    if (this.age >= 100 && this.state == "sick"){ 
      
      //DEATH/RECOVERY PROBABILITY
      var mortalityRoll = floor(random(0,100));
      if(mortalityRoll <= this.mortalityRate){
        this.state = "dead"
        this.age = 0;
      }else{
        this.state = "recovered"
        this.age = 0;
      }
    }
    

  }  
   
}// end of car class