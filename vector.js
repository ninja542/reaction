/* jshint esversion:6 */

class Vector2D{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	dotProduct(vector2){
		return this.x * vector2.x + this.y * vector2.y;
	}
	// the square of the magnitude, not the true magnitude
	magnitude(){
		return Math.pow(this.x, 2) + Math.pow(this.y, 2);
	}
	scale(scaleFactor){
		this.x *= scaleFactor;
		this.y *= scaleFactor;
	}
	add(vector2){
		this.x += vector2.x;
		this.y += vector2.y;
	}
	subtract(vector2){
		this.x -= vector2.x;
		this.y -= vector2.y;
	}
}

class Vector3D{
	constructor(x, y, z){
		this.x = x;
		this.y = y;
		this.x = z;
	}
	dotProduct(vector2){
		return this.x * vector2.x + this.y * vector2.y + this.x * vector2.z;
	}
	magnitude(){
		return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
	}
	scale(scaleFactor){
		this.x *= scaleFactor;
		this.y *= scaleFactor;
		this.z *= scaleFactor;
	}
	add(vector2){
		this.x += vector2.x;
		this.y += vector2.y;
		this.z += vector2.z;
	}
	subtract(vector2){
		this.x -= vector2.x;
		this.y -= vector2.y;
		this.z -= vector2.z;
	}
	crossProduct(vector2){
		return Vector3D(this.y * vector2.z - this.z * vector2.y, this.z * vector2.x - this.x * vector2.z, this.x * vector2.y - this.y * vector2.z);
	}
}