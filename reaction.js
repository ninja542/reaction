/* jshint esversion:6 */

// d3 stuff
let margin = { top: 10, right: 10, bottom: 40, left: 40 },
    graphwidth = 600 - margin.left - margin.right,
    graphheight = 650 - margin.top - margin.bottom;
var svg = d3.select('.graph').append('svg')
    .attr('width', graphwidth + margin.left + margin.right)
    .attr('height', graphheight + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// canvas stuff
let canvas = document.getElementById("canvas");
let width = 400;
let height = 600;
canvas.width = width;
canvas.height = height;
let context = canvas.getContext('2d');

// constants for easier change later
const radius = 5;
const mass = 1e-21;
const R = 8.314;
const k = R / 6.02e+23;

let app = new Vue({
	el: "#app",
	data: {
		reactA: 10,
		reactB: 10,
		product: 0,
		particles: [],
		width: 400,
		height: 600,
		fps: 60,
		frame: 0,
		energy: 20,
	},
	computed: {
		measuredTemp: function(){
			let totalKE = this.totalVelList.reduce((total, amount) => total + 0.5 * Math.pow(amount, 2) * mass, 0);
			let averageKE = totalKE / this.particles.length;
			let temperature = averageKE / (1.5 * k);
			return temperature;
		},
		measuredPressure: function(){
			let totalPressure = this.totalVelList.reduce((total, amount) => total + (mass * (Math.pow(amount, 2)))/(this.width * this.height), 0);
			return totalPressure;
		},
		totalVelList: function(){
			let newMap = this.particles.map((item) => totalVelocity(item.x_speed, item.y_speed));
			return newMap;
		},
		calculatedTemp: function(){
			// PV = nRT equation
			// T = PV/nR
			let n = this.reactA / 6.02e+23;
			let temperature = this.measuredPressure * this.width * this.height;
			temperature = temperature / (n * R);
			return temperature;
		}
	},
	methods: {
		canvasRender: function(){
			this.particles.forEach(p => p.draw(context));
		},
		animate: function(thing){
			// animation frame is native and it allows for the animation to stop when focus is on another area
			let animation = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function(callback){
				window.setTimeout(callback, 1000/this.fps);
			};
			return animation(thing);
		},
		update: function(){
			this.frame += 1/60;
			this.particles.forEach(p => context.clearRect(p.x-(radius+1), p.y-(radius+1), 2*radius+2, 2*radius+2));
			this.particles.forEach(p => p.update());
		}
	},
	watch: {
		width: function(){
			canvas.width = this.width;
			canvas.style.width = this.width;
		},
		height: function(){
			canvas.height = this.height;
			canvas.style.height = this.height;
		}
	},
	mounted: function(){
		for(let i = 0; i < this.reactA; i++){ // initial particle initialization. Need a better algorithm so that particles do not spawn within each other
			this.particles.push(new reactantA(20*i, 20*i, radius));
		}
		for(let i = 0; i < this.reactB; i++){
			this.particles.push(new reactantB(200+20*i, 20*i, radius));
		}
		this.canvasRender();
	},
});

// separate step function needed, not sure why, but it doesn't work inside of vue object
let step = function(){
	app.update();
	app.canvasRender();
	app.animate(step);
};

// start animation when page is loaded
window.onload = function(){
	app.animate(step);
};

function totalVelocity(x, y){ // to make code easier to read
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}