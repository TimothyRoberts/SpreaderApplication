function Car(x,y) {

	this.x = x;
	this.y = y;
	var drivingLeft;
	// this.pos = createVector(x, y);
	// ellipse(x,y,10,10);

	this.show = function() {
		translate(margin.left - 800, margin.top - 50);
		fill(255);
		ellipse(x,y,15,15);
		// stroke(200);
		// strokeWeight(8);
		// point(this.pos.x, this.pos.y);

	}

	this.drive = function() {
		// x += 1.5;
		// y += 1.5;

		// if(x > 275) {
		// 	console.log("destination 2");
		// 	x -= 1.5;
		// 	y -= 1.5;
		// }

		if(x < 275) {
			drivingLeft = true;
		}
		if (x > 275) {
			drivingLeft = false;
		}

		if(drivingLeft) {
			x += 1.5;
			y += 1.5;
		}
		else {
				x -= 1.5;
				y -= 1.5;
		}

		console.log(drivingLeft);

	}
}