function dude(x,y,state,constrainX,constrainY,constrainX2,constrainY2){
    
    this.location = createVector(x,y);
    this.vel = createVector(0.5,0.5);
    this.state = state;
    this.col = color(255);
    this.age = 0;
    this.constrainX = constrainX; //consider making variable for the width of the constraints
    this.constrainY = constrainY;
    this.constrainX2 = constrainX2;
    this.constrainY2 = constrainY2;


  this.drawDude = function(){

    noStroke();

  	if(this.state  == "sick"){
      this.col = color(141,0,0,150)
      fill(this.col);
      ellipse(this.location.x,this.location.y,radius*2);
    }else if(this.state  == "incubating"){
      this.col = color(0,120,255,150);
      fill(this.col);
      ellipse(this.location.x,this.location.y,radius*2);
    }else if(this.state  == "recovered"){
      this.col = color(30,255,0,150);
      fill(this.col);
      ellipse(this.location.x,this.location.y,radius*2);
    }else if(this.state  == "healthy"){
      this.col = color(255,255,255,150);
      fill(this.col);
      ellipse(this.location.x,this.location.y,radius*2);
    }else if(this.state  == "vaccinated"){
      this.col = color(255,204,0,150);
      fill(this.col);
      ellipse(this.location.x,this.location.y,radius*2);
    }
  }

  this.moveDude = function(){

    // var nightMovesArray = [-this.v,0,0,0,0,0,0,0,0,0,0,this.v];
    // var dayMovesArray = [-this.v,0,0,0,0,0,this.v];

    // if(dayTimeBoolean){
    //   this.x = this.x+random(dayMovesArray);
    //   this.y = this.y+random(dayMovesArray);  
    // } 

    // if(!dayTimeBoolean){
    //     this.x = this.x+random(nightMovesArray);
    //     this.y = this.y+random(nightMovesArray);  
    // }

    //movement of dude changed from a moves array based system to a probability generator 
    var choice = random(1);

    if(dayTimeBoolean){
      if(choice < 0.125){
        this.location.x++
      }else if(choice < 0.25){
        this.location.x--
      }else if(choice < 0.375){
        this.location.y++
      }else if(choice < 0.50){
        this.location.y--
      }
    }else if(!dayTimeBoolean){
      if(choice < 0.0625){
        this.location.x++
      }else if(choice < 0.125){
        this.location.x--
      }else if(choice < 0.1875){
        this.location.y++
      }else if(choice < 0.25){
        this.location.y--
      }
    }

    this.location.x = constrain(this.location.x, this.constrainX, this.constrainX2);
    this.location.y = constrain(this.location.y, this.constrainY, this.constrainY2);
  }

  this.intersects = function(other) {
    var d = dist(this.location.x, this.location.y, other.location.x, other.location.y);
    if (d < (radius + radius)) {
      return true;
    } else {
      return false;
    }
  }
   
  this.changeDudeState = function(other){
    
      this.contagionRoll = floor(random(0,100));

      //contagion rate was originally passed into the object but since it is a gloabal var this is not efficient.
    if(this.state == "incubating" && other.state == "healthy" && this.contagionRoll <= contagionRate){
          other.state = "incubating";
      }
    if(this.state == "sick" && other.state == "healthy" && this.contagionRoll <= contagionRate){  
          other.state = "incubating";
      } 
    }

  this.countDudeAge = function(){

      var incubationAge = 400;
      var sickAge = 550;

    	if(this.state == "incubating"||this.state == "sick"){
    		 this.age ++;
    	}
  	  if (this.age >= incubationAge && this.state == "incubating"){ 
    		this.state = "sick"
    		this.age = 0;
    	}
      if (this.age >= sickAge && this.state == "sick"){ 
      
        var mortalityRoll = floor(random(0,100));
        if(mortalityRoll <= mortalityRate){
          this.state = "dead"
          this.age = 0;
        }else{
          this.state = "recovered"
          this.age = 0;
       }
    }
  }    

}// end of dude class
