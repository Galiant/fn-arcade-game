// Enemies our player must avoid during game
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here, we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 550) {
        this.x += (150 * dt);
    } else {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;

    this.score = 0;
    this.scoreEl = document.getElementById('score');
    this.scoreEl.innerHTML = this.score;
};

//check the collision
Player.prototype.checkCollisions = function () {

    for (var i = 0; i < allEnemies.length; ++i) {
        if ((allEnemies[i].x < player.x + 40) && (player.x < allEnemies[i].x + 60) && (allEnemies[i].y < player.y + 60) && (player.y < allEnemies[i].y + 40)) {
            this.score = this.score - 1;
            if (this.score < 0) {
                this.score = 0;
            }

            this.scoreEl.innerHTML = this.score;
            player.reset();
        }
    }
};
// This class requires an update(), render() and a handleInput() method.
//update method 
Player.prototype.update = function () {
    //if the player reaches to the water
    //this.checkCollisions();

    if (this.y < 20) {
        this.score++;
        this.scoreEl.innerHTML = this.score;
        this.reset();
    }
};

//render method: to draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput method to handle the direction from the player
Player.prototype.handleInput = function (direction) {
    if ((direction == 'left' || direction == 'a') && this.x > 0) {
        this.x -= 60;
    } else if ((direction == 'right' || direction == 'd') && this.x < 400) {
        this.x += 60;
    } else if ((direction == 'up' || direction == 'w') && this.y > 2) {
        this.y -= 60;
    } else if ((direction == 'down' || direction == 's') && this.y < 400) {
        this.y += 60;
    }
};

//reset method: if the player reached to the water or if the player collision with the enemy, reset the player to the starting point
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
    new Enemy(-90, 60),
    new Enemy(-190, 140),
    new Enemy(-290, 230),
    new Enemy(-390, 40),
    new Enemy(-490, 160),
    new Enemy(-690, 230)
];

// Place the player object in a variable called player
var player = new Player();
// This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        87: 'w',
        68: 'd',
        83: 's'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});