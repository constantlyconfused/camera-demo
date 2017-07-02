var width;
var height;
var player;
var bg;

var SCENE_W = 3000;
var SCENE_H = 3000;

function setup() {
	//Setting up the canvas as the whole width/height of the user's screen
	width = window.innerWidth;
	height = window.innerHeight;
	createCanvas(width, height);
	backgroundColor = color(51);
	
	//Create player sprite, x,y positions, and initial position
	var middle = createVector(width/2, height/2);
	player = new Player(30, middle);
	
	//Creating the background which the canvas/camera explores
	food = new Group();
	
	//Some background for reference
	for (var i=0; i<100; i++){
		boxfood = createSprite(random(SCENE_W),random(SCENE_H),10,10);
		boxfood.shapeColor = color(0,182,255);
		food.add(boxfood);
	}
	
}

function draw() {
	background(51);
	
	player.vel.x = (camera.mouseX-player.pos.x)/50;
	player.vel.y = (camera.mouseY-player.pos.y)/50;

	camera.position.x = player.pos.x;
	camera.position.y = player.pos.y;

	if(player.pos.x < 0)
		player.pos.x = 0;
	if(player.pos.y < 0)
		player.pos.y = 0;
	if(player.pos.x > SCENE_W)
		player.pos.x = SCENE_W;
	if(player.pos.y > SCENE_H)
		player.pos.y = SCENE_H;
	
	//Draw the background sprites first
	drawSprites(food);
	
	player.render();
	player.update();
	
	print(player.pos);
	
}

function Player(rad, pos){
	this.rad = rad;
	
	//this.acc = createVector(0,0);
	this.vel = createVector(0,0);
	this.pos = pos;
	
	this.update = function(){
		/* this.mouse = createVector(mouseX, mouseY);
		this.mouse.sub(this.pos);
		this.acc = createVector(this.mouse.x*.1, this.mouse.y*.1);
		
		this.vel.add(this.acc);
		this.vel.limit(10); */
		this.pos.add(this.vel);
	}
	
	this.render = function(){
		fill(255,118,0);
		ellipse(this.pos.x, this.pos.y, this.rad);
	}
	
	this.eat = function(){
		this.rad+=2;
	}
	
}
