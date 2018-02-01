function dude(x,y,radius,state,mortalityRate,contagionRate,constrainX,constrainY,constrainX2,constrainY2){

    this.x = x;
    this.y = y;
    this.v = 0.5;
    this.r = radius;

    this.state = state;
    this.mortalityRate = mortalityRate;
    this.contagionRate = contagionRate;
    
    this.col = color(255);
    this.age = 0;

    this.constrainX = constrainX; //consider making variable for the width of the constraints
    this.constrainY = constrainY;
    this.constrainX2 = constrainX2;
    this.constrainY2 = constrainY2;


  this.drawDude = function(){


    noStroke();
  	if(this.state  == "sick"){
      this.col = color(141,0,0,200)
      fill(this.col);
      ellipse(this.x,this.y,this.r*2);
    ellipse(this.x,this.y,this.r*2);
    }else if(this.state  == "incubating"){
      this.col = color(0,120,255,200);
      fill(this.col);
      ellipse(this.x,this.y,this.r*2);
    }else if(this.state  == "recovered"){
      this.col = color(30,255,0,200);
      fill(this.col);
      ellipse(this.x,this.y,this.r*2);
    }else if(this.state  == "healthy"){
      this.col = color(255,255,255,200);
      noStroke()
      fill(this.col);
      ellipse(this.x,this.y,this.r*2);
    }else if(this.state  == "vaccinated"){
      this.col = color(255,204,0,200);
      noStroke()
      fill(this.col);
      ellipse(this.x,this.y,this.r*2);
    }
   
   
  }
  this.moveDude = function(){

    var nightMovesArray = [-this.v,0,0,0,0,0,0,0,0,0,0,this.v];
    var dayMovesArray = [-this.v,0,0,0,0,0,this.v];

    if(dayTimeBoolean){
      this.x = this.x+random(dayMovesArray);
      this.y = this.y+random(dayMovesArray);  
    } 

    if(!dayTimeBoolean){
        this.x = this.x+random(nightMovesArray);
        this.y = this.y+random(nightMovesArray);  
    }

    // this.stepX = random(10);
    // this.stepY = random(10);

    this.x = constrain(this.x, this.constrainX, this.constrainX2);
    this.y = constrain(this.y, this.constrainY, this.constrainY2);
    
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
   	
    this.contagionRoll = floor(random(0,100));

    if(this.state == "incubating" && other.state == "healthy" && this.contagionRoll <= other.contagionRate){
      
        other.state = "incubating";
    }

    if(this.state == "sick" && other.state == "healthy" && this.contagionRoll <= other.contagionRate){
      
      other.state = "incubating";
    } 


  }

  this.countDudeAge = function(){

  	if(this.state == "incubating"||this.state == "sick"){
  		 this.age ++;
  	}
	  if (this.age >= 300 && this.state == "incubating"){ 
  		this.state = "sick"
  		this.age = 0;
  	}
    if (this.age >= 500 && this.state == "sick"){ 
    
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
   

}// end of dude class
