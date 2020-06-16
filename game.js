// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 627
canvas.height = 627;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/maze2.gif";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Mage image
var mageReady = false;
var mageImage = new Image();
mageImage.onload = function () {
	mageReady = true;
};
mageImage.src = "images/Mage.png";

// Thug image
var thugReady = false;
var thugImage = new Image();
thugImage.onload = function () {
	thugReady = true;
};
thugImage.src = "images/Thug.png";

// Spearman image
var spearmanReady = false;
var spearmanImage = new Image();
spearmanImage.onload = function () {
	spearmanReady = true;
};
spearmanImage.src = "images/Spearman.png";

// Game objects
var hero = {
	speed: 5 // movement in pixels per second
};
var monster = {};
var mage = {};
var thug = {};
var spearman = {};
var monstersCaught = 0;
var totalCaught = 0;
var magesCaught = 0;
var spearmenCaught = 0;
var thugsCaught = 0;
var monstersLeft = 10;
var currentScore = 0;
var highScore = 0;
var collision = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	resetMonster();
};


//change this to 'clearMonster' after adding more monster sprites for gameplay
var resetMonster = function() {
	// Throw the monster somewhere on the screen randomly
	monster.x = (Math.random() * (canvas.width - 64));
	monster.y = (Math.random() * (canvas.height - 64));	
	if (monster.x < 45 || monster.x > 559 || monster.y < 38 || monster.y > 559) resetMonster();
	
	mage.x = (Math.random() * (canvas.width - 64));
	mage.y = (Math.random() * (canvas.height - 64));	
	if (mage.x < 45 || mage.x > 559 || mage.y < 38 || mage.y > 559) resetMonster();
	
	thug.x = (Math.random() * (canvas.width - 64));
	thug.y = (Math.random() * (canvas.height - 64));	
	if (thug.x < 45 || thug.x > 559 || thug.y < 38 || thug.y > 559) resetMonster();
	
	spearman.x = (Math.random() * (canvas.width - 64));
	spearman.y = (Math.random() * (canvas.height - 64));	
	if (spearman.x < 45 || spearman.x > 559 || spearman.y < 38 || spearman.y > 559) resetMonster();
}

// Update game objects
var update = function (modifier) {

	//basic movement
	
	if (38 in keysDown) { // Player holding down
		if (hero.y - (hero.speed) > 38) {
			hero.y -= hero.speed;
		} 
	}	
	if (40 in keysDown) { // Player holding down
		if(hero.y + (hero.speed) < 559){
			hero.y += hero.speed;
		}
	}
	if (37 in keysDown) { // Player holding left
		if(hero.x + (hero.speed) > 45)
		hero.x -= hero.speed;
	}
	if (39 in keysDown) { // Player holding right
		if(hero.x + (hero.speed) < 559)
		hero.x += hero.speed;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		monstersLeft--;
		currentScore = currentScore +10;
		if (currentScore > highScore) {
			highScore = currentScore;
		}
		//change to a 'clearMonster' function after adding more monsters
		resetMonster();
	}
	if (
		hero.x <= (mage.x + 32)
		&& mage.x <= (hero.x + 32)
		&& hero.y <= (mage.y + 32)
		&& mage.y <= (hero.y + 32)
	) {
		monstersLeft--;
		currentScore = currentScore +20;
		if (currentScore > highScore) {
			highScore = currentScore;
		}
		//change to a 'clearMonster' function after adding more monsters
		resetMonster();
	}
	if (
		hero.x <= (thug.x + 32)
		&& thug.x <= (hero.x + 32)
		&& hero.y <= (thug.y + 32)
		&& thug.y <= (hero.y + 32)
	) {
		monstersLeft--;
		currentScore = currentScore +30;
		if (currentScore > highScore) {
			highScore = currentScore;
		}
		//change to a 'clearMonster' function after adding more monsters
		resetMonster();
	}
	if (
		hero.x <= (spearman.x + 32)
		&& spearman.x <= (hero.x + 32)
		&& hero.y <= (spearman.y + 32)
		&& spearman.y <= (hero.y + 32)
	) {
		monstersLeft--;
		currentScore = currentScore +40;
		if (currentScore > highScore) {
			highScore = currentScore;
		}
		//change to a 'clearMonster' function after adding more monsters
		resetMonster();
	}
};


// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	if (mageReady) {
		ctx.drawImage(mageImage, mage.x, mage.y);
	}
	if (thugReady) {
		ctx.drawImage(thugImage, thug.x, thug.y);
	}
	if (spearmanReady) {
		ctx.drawImage(spearmanImage, spearman.x, spearman.y);
	}
	
	// Current Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Current score: " + currentScore, 16, 600);
	
	// Monsters left
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsters left: " + monstersLeft, 230, 600);
	
	// High Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("High score: " + highScore, 435, 600);

	if (monstersLeft <= 0) {
		if (currentScore < highScore) {
			if(confirm("You have caught ten monsters and your score is " + currentScore + ". The high score is " +highScore +". Press \"ok\" to play again.")){
				monstersLeft = 10;
				currentScore = 0;
				monstersCaught = 0;
				reset();
				main();
			}
			else txt = "Goodbye."
		} 
		else {
			if(confirm("Congratulations! You broke or tied the high score with " +currentScore + " points! Press \"ok\" to play again.")){
				monstersLeft = 10;
				currentScore = 0;
				monstersCaught = 0;
				reset();
				main();
			}
			else txt = "Goodbye."
		}
	}
};



// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
