/* jshint esversion:6 */

function randNeg(){ // needed to generate negative sign randomly for more interesting things.
	return Math.floor(Math.random()*2) == 1 ? 1 : -1;
}

class Ball{
	constructor(x, y, radius){
		this.x = x;
		this.y = y;
		this.x_speed = Math.random() * 3 * randNeg();
		this.y_speed = Math.random() * 3 * randNeg();
		this.radius = radius;
		this.color = "#000000";
		this.type = "ball";
	}
	draw(context){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.fillStyle = this.color;
		context.fill();
	}
	// update position of ball along with bouncing off walls
	update(){
		this.x += this.x_speed;
		this.y += this.y_speed;
		let left_x = this.x - this.radius;
		let top_y = this.y - this.radius;
		let right_x = this.x + this.radius;
		let bottom_y = this.y + this.radius;
		if (left_x < 0){ // hitting left wall
			this.x = this.radius;
			this.x_speed = -this.x_speed;
		}
		else if (right_x > app.width){ // hitting right wall
			this.x = app.width - this.radius;
			this.x_speed = -this.x_speed;
		}
		else if (top_y < 0){ // hitting top wall
			this.y = this.radius;
			this.y_speed = -this.y_speed;
		}
		else if (bottom_y > app.height){ // hitting bottom wall
			this.y = app.height - this.radius;
			this.y_speed = -this.y_speed;
		}
	}
	// checks if two particles are touching and changes the velocity of both particles
	bounce(other){
		// still has weird bumping behavior when particles are cooled a lot

		let a_i_speed = new Vector2D(this.x_speed, this.y_speed); // first particle
		let b_i_speed = new Vector2D(other.x_speed, other.y_speed); // second particle
		let collision = new Vector2D(this.x-other.x, this.y-other.y);
		// temporary vector so that the initial vector is untouched
		let tempvector = new Vector2D(other.x_speed, other.y_speed);
		tempvector.subtract(a_i_speed); // to put it in the a_i_speed particle frame of reference
		let projvector = tempvector.dotProduct(collision);
		projvector = projvector / collision.magnitude();
		collision.scale(projvector);
		a_i_speed.add(collision);
		b_i_speed.subtract(collision);
		// setting the speeds of the particles after doing too much math
		this.x_speed = a_i_speed.x;
		this.y_speed = a_i_speed.y;
		other.x_speed = b_i_speed.x;
		other.y_speed = b_i_speed.y;
	}
	enough_energy(other, activation_energy){
		return (0.5 * (Math.pow(this.x_speed, 2) + Math.pow(this.y_speed, 2)) + 0.5 * (Math.pow(other.x_speed, 2) + Math.pow(other.y_speed, 2))) > activation_energy;
	}
	touching(other){
		return Math.pow(this.x-other.x, 2)+Math.pow(this.y-other.y, 2) < (Math.pow(2*this.radius, 2)+0.05);
	}
}

class reactantA extends Ball{
	constructor(x, y, radius){
		super(x, y, radius);
		this.color = "#FF0000";
		this.type = "reactantA";
	}
}

class reactantB extends Ball{
	constructor(x, y, radius){
		super(x, y, radius);
		this.color = "#00FFFF";
		this.type = "reactantB";
	}
}

class product extends Ball{
	constructor(x, y, radius){
		super(x, y, radius);
		this.color = "#0000FF";
		this.type = "product";
	}
}