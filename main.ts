/*TODO:
 * 
 * 
*/
import { ship } from "./ship";
import { bullet } from "./ship";

var player = new ship();
var bullets:bullet[] = [];

//canvas creation
var canvas = <HTMLCanvasElement> document.getElementById("imgCanvas");
var context = canvas.getContext("2d");
var mouseX = -10;
var mouseY = -10;
var rect;

//game tick increases constantly
var tick = 0;

var music = new Audio("assets/RayTracer.mp3");

var isGameStarted:boolean = false;

var spawnVel = 1;

function Point(x, y, velX, velY, lines = [], health = 5, stuck = false) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.health = health;
    this.stuck = stuck;//whether the point is stuck to a wall
    this.lines = lines;//array of lines
    this.alive = true;
    this.pop = function() {
        this.alive = false;
        tick += 180;
        var explodeSound = new Audio("./assets/explode.wav");
        explodeSound.play();
    }
}

function Line(x, y, x2, y2, health = 1) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.health = health;
}

//list of all points
var pointList = [];

//single point to help find other point positions
var tracker = new Point(1020, 128, 0, 0)

var borderLine1 = new Line(-8, -8, -8, -8);//top to bottom
var borderLine2 = new Line(-8, -8, -8, -8);//bottom to top
var borderLine3 = new Line(-8, -8, -8, -8);//right to top
var borderLine4 = new Line(-8, -8, -8, -8);//right to bottom

function pointUpdate() {
    pointList.forEach(element => {
        if(!element.stuck) {
            element.x += element.velX;
            element.y += element.velY;

            if(element.y <= 0) {
                element.y = 0;
                element.stuck = true;
                var isFarthest:boolean = true;
                pointList.forEach(element2 => {
                    if(element2.stuck == true && element2.y == 0 && element2.x > element.x) {
                        isFarthest = false;
                    }
                });
                if(isFarthest) {
                    var tempLine = new Line(element.x, element.y, 0, 248);
                    element.lines.forEach(element2 => {
                        if(element2.y2 == 248 && element2.x2 > tempLine.x2) {
                            tempLine.x2 = element2.x2;
                        }
                    });
                    borderLine1 = tempLine;
                }
            }
            else if(element.y >= 248) {
                element.y = 248;
                element.stuck = true;
                var isFarthest:boolean = true;
                pointList.forEach(element2 => {
                    if(element2.stuck == true && element2.y == 248 && element2.x > element.x) {
                        isFarthest = false;
                    }
                });
                if(isFarthest) {
                    var tempLine = new Line(element.x, element.y, 0, 0);
                    element.lines.forEach(element2 => {
                        if(element2.y2 == 0 && element2.x2 > tempLine.x2) {
                            tempLine.x2 = element2.x2;
                        }
                    });
                    borderLine2 = tempLine;
                }
            }
            else if(element.x >= 1016) {//change to losing game
                element.x = 1016;
                element.stuck = true;
                var isFarthestUp:boolean = true;
                var isFarthestDown:boolean = true;
                pointList.forEach(element2 => {
                    if(element2.stuck == true && element2.x == 1016 && element2.y < element.y) {
                        isFarthestUp = false;
                    }
                    else if(element2.stuck == true && element2.x == 1016 && element2.y > element.y) {
                        isFarthestDown = false;
                    }
                });
                if(isFarthestUp) {
                    var tempLine = new Line(element.x, element.y, 0, 0);
                    element.lines.forEach(element2 => {
                        if(element2.y2 == 0 && element2.x2 > tempLine.x2) {
                            tempLine.x2 = element2.x2;
                        }
                    });
                    borderLine3 = tempLine;
                }
                if(isFarthestDown) {
                    var tempLine = new Line(element.x, element.y, 0, 256);
                    element.lines.forEach(element2 => {
                        if(element2.y2 == 248 && element2.x2 > tempLine.x2) {
                            tempLine.x2 = element2.x2;
                        }
                    });
                    borderLine4 = tempLine;
                }
            }
            //place projectile collision here
        }
        else {
            //point deletion
            if(element.y == 0) {
                if(element.x < borderLine1.x - 64) {
                    pointList.splice(pointList.indexOf(element), 1);
                }
            }
            else {
                if(element.x < borderLine2.x - 64) {
                    pointList.splice(pointList.indexOf(element), 1);
                }
            }
        }
        element.lines.forEach(element2 => {
            element2.x = element.x;
            element2.y = element.y;

        });
    });
}

function render() {
    context.strokeStyle="#000000";
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, canvas.height);
    //context.clearRect(0, 0, canvas.width, canvas.height);

    //context.strokeStyle="#FF0000";
    context.fillStyle="#000000";//#800000
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(borderLine1.x + 4, borderLine1.y);
    context.lineTo(borderLine1.x2 + 4, borderLine1.y2 + 8);
    context.lineTo(0, 256);
    context.fill();

    context.beginPath();
    context.moveTo(0, 256);
    context.lineTo(borderLine2.x + 4, borderLine2.y + 8);
    context.lineTo(borderLine2.x2 + 4, borderLine2.y2);
    context.lineTo(0, 0);
    context.fill();

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(borderLine3.x2 + 4, borderLine3.y2);
    context.lineTo(borderLine3.x + 8, borderLine3.y + 4);
    context.lineTo(borderLine4.x + 8, borderLine4.y + 4);
    context.lineTo(borderLine4.x2 + 4, borderLine4.y2);
    context.lineTo(0, 256);
    context.fill();

    pointList.forEach(element => {
        if(element.lines) {
            element.lines.forEach(element2 => {
                context.beginPath();
                context.moveTo(element2.x + 4, element2.y + 4);
                if(element2.y2 == 0) {
                    context.lineTo(element2.x2 + 4, element2.y2);
                }
                else {
                    context.lineTo(element2.x2 + 4, element2.y2 + 8);
                }
                if(element2.x2 == 1020 && element2.y2 == 128) {
                    context.strokeStyle="#FFFFFF";
                }
                else {
                    context.strokeStyle="#000000";
                }
                context.stroke();
            });
        }
        context.fillStyle = "#000000";//4800FF
        context.fillRect(element.x, element.y, 8, 8);
    });

    player.render(context);

    bullets.forEach(bullet => {
        bullet.render(context);
    });
}

function update() {
    if(tick % 60 == 0) {
        var tempLines = [];
        pointList.forEach(element => {
            if (element.stuck) {
                tempLines.push(new Line(0, 128, element.x, element.y));
            }
        });
        tempLines.push(new Line(0, 128, tracker.x, tracker.y));
        spawnVel = borderLine1.x2 < borderLine2.x2 ? (borderLine1.x / 512) + 1 : (borderLine2.x / 512) + 1;
        pointList.push(new Point(-4, 128, Math.random() * spawnVel, (Math.random() * 2) - 1, tempLines));//temp testing values
    }

    pointUpdate();

    player.update(mouseX, mouseY);

    bullets.forEach(bullet => {
        bullet.update(pointList);
    });

    bullets = bullets.filter(bullet => bullet.alive);
    pointList = pointList.filter(point => point.alive);
}

function mainLoop() {

    document.getElementById("TICKS").innerHTML = "Score: " + tick;
    tick++;

    update();
    render();
    window.requestAnimationFrame(mainLoop);
}

function getMousePos(canvas, evt) {
    rect = canvas.getBoundingClientRect();
    mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
}

canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
}, false);

canvas.onmousedown = function() {
    bullets.push(player.shoot());
    if(!isGameStarted) {
        isGameStarted = true;
        music.play();
        music.loop = true;
        window.requestAnimationFrame(mainLoop);
    }
    return false;
}