function Car(x,y,state){

	this.location = createVector(x,y);
	this.vel = p5.Vector.random2D();
	this.acc = createVector();
	this.velMax = random(1,5);
	this.col = color(255);
	this.age = 0;
	this.state = state;

	this.des = random(attractors);

	this.moveCar = function(){

		this.location.add(this.vel);
		this.vel.add(this.acc);

		this.acc = p5.Vector.sub(this.des,this.location);
		this.acc.normalize();
		this.vel.limit(this.velMax);

		this.desDis = p5.Vector.sub(this.des,this.location);
		if((this.desDis.x <= 0)&&(this.desDis.y <= 0)) {
			
			var roll = random(1);

			if(roll < 0.60){
				this.des = attractors[0];
			}else if(roll < 0.90){
				this.des = attractors[1];
			}else{
				this.des = attractors[2];
			}
		}

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

	}

	this.drawCar = function(){

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

}