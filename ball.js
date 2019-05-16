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
}

class reactantA extends Ball{
	constructor(x, y, radius){
		super(x, y, radius);
		this.color = "#FF0000";
	}
}

class reactantB extends Ball{
	constructor(x, y, radius){
		super(x, y, radius);
		this.color = "#00FFFF";
	}
}

class product extends Ball{
	constructor(x, y, radius){
		super(x, y, radius);
		this.color = "#0000FF";
	}
}