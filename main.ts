/*TODO:
 * 
 * 
*/
import { Ship } from "./ship";
import { Bullet } from "./Bullet";
import { Point } from "./Point";
import { Line } from "./Line";

var player = new Ship();
var bullets:Bullet[] = [];

//canvas creation
var canvas = <HTMLCanvasElement> document.getElementById("imgCanvas");
var context = canvas.getContext("2d");
var mouseX = -10;
var mouseY = -10;
var rect;

//game tick increases constantly
var tick = 0;

var music = new Audio("assets/RayTracer2.mp3");

var isGameStarted:boolean = false;

var isPlayerAlive:boolean = true;

var highScore = 0;

//spawned point speed
var spawnVel = 1;
//how quickly points spawn, larger = longer
var spawnRate = 60;

var explosion = new Image();
explosion.src = "assets/mediumExplosion4.png";

//list of all points
var pointList:Point[] = [];
var deadPoints:Point[] = [];

//single point to help find other point positions
var tracker = new Point(1020, 128, 0, 0)

var borderLines:Line[] = [
    new Line(-8, -8, -8, -8),//top to bottom
    new Line(-8, -8, -8, -8),//bottom to top
    new Line(-8, -8, -8, -8),//right to top
    new Line(-8, -8, -8, -8),//right to bottom
]

function render() {
    context.strokeStyle="#000000";
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, canvas.height);
    //context.clearRect(0, 0, canvas.width, canvas.height);

    //context.strokeStyle="#FF0000";
    context.fillStyle="#000000";//#800000
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(borderLines[0].x + 4, borderLines[0].y);
    context.lineTo(borderLines[0].x2 + 4, borderLines[0].y2 + 8);
    context.lineTo(0, 256);
    context.fill();

    context.beginPath();
    context.moveTo(0, 256);
    context.lineTo(borderLines[1].x + 4, borderLines[1].y + 8);
    context.lineTo(borderLines[1].x2 + 4, borderLines[1].y2);
    context.lineTo(0, 0);
    context.fill();

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(borderLines[2].x2 + 4, borderLines[2].y2);
    context.lineTo(borderLines[2].x + 8, borderLines[2].y + 4);
    context.lineTo(borderLines[3].x + 8, borderLines[3].y + 4);
    context.lineTo(borderLines[3].x2 + 4, borderLines[3].y2);
    context.lineTo(0, 256);
    context.fill();

    pointList.forEach(point => {
        if(point.lines) {
            point.lines.forEach(line => {
                line.render(context);
            });
        }
        point.render(context);
    });

    player.render(context);

    deadPoints.forEach(point => {
        context.drawImage(explosion, point.x - 4, point.y - 4);
    });

    bullets.forEach(bullet => {
        bullet.render(context);
    });
}
render();

function update() {
    if(tick % spawnRate == 0) {
        var tempLines = [];
        pointList.forEach(element => {
            if (element.stuck) {
                tempLines.push(new Line(0, 128, element.x, element.y));
            }
        });
        tempLines.push(new Line(0, 128, tracker.x, tracker.y));
        spawnVel = borderLines[0].x2 < borderLines[1].x2 ? (borderLines[0].x / 512) + 1 : (borderLines[1].x / 512) + 1;
        pointList.push(new Point(-4, 128, Math.random() * spawnVel, (Math.random() * 2) - 1, tempLines));//temp testing values
        if(tick % (spawnRate * 5) == 0 && spawnRate != 5) {
            spawnRate--;
        }
    }

    pointList.forEach(point => {
        point.update(pointList, borderLines);
    });

    player.update(mouseX, mouseY);

    bullets.forEach(bullet => {
        bullet.update(pointList);
    });

    pointList.forEach(element =>{
        if (!element.alive) {
            element.explodeTime = tick;
            deadPoints.push(element);
        }
    });

    bullets = bullets.filter(bullet => bullet.alive);

    deadPoints = deadPoints.filter(point => point.explodeTime - tick > -12);

    pointList = pointList.filter(point => point.alive);

    //player death
    if(is_in_triangle(player.x + 8, player.y + 8, borderLines[0].x, borderLines[0].y, borderLines[0].x2, borderLines[0].y2, 0, 256) ||
        is_in_triangle(player.x + 8, player.y + 8, borderLines[1].x, borderLines[1].y, borderLines[1].x2, borderLines[1].y2, 0, 0) ||
        is_in_triangle(player.x + 8, player.y + 8, borderLines[2].x, borderLines[2].y, borderLines[2].x2, borderLines[2].y2, 0, 256) ||
        is_in_triangle(player.x + 8, player.y + 8, borderLines[3].x, borderLines[3].y, borderLines[3].x2, borderLines[3].y2, 0, 0)) {
        death();
    }
    pointList.forEach(point => {
        if(player.x < point.x + 8 && 
            player.x > point.x &&
            player.y < point.y + 8 && 
            player.y > point.y){
            death();
        }
    });
}

function mainLoop() {
    if(isPlayerAlive) {
        document.getElementById("TICKS").innerHTML = "Score: " + tick;
        tick++;

        update();
        render();
        window.requestAnimationFrame(mainLoop);
    }
}

function death() {
    if(tick > highScore) {
        highScore = tick;
    }
    document.getElementById("TICKS").innerHTML = "GAME OVER, Your score was: " + tick + ", Highscore is: " + highScore + " (Click to retry)";
    isPlayerAlive = false;
    isGameStarted = false;
    render();
    context.drawImage(explosion, player.x + 8, player.y + 8);
    canvas.onmousedown = null;
    setTimeout(function() {
        setCanvasClickEvent();
    }, 2500);
}

function getMousePos(canvas, evt) {
    rect = canvas.getBoundingClientRect();
    mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
}

canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
}, false);

function setCanvasClickEvent() {
    canvas.onmousedown = function() {
        if(!isGameStarted) {
            isGameStarted = true;
            reset();
            music.play();
            music.volume = 0.7;
            music.loop = true;
            window.requestAnimationFrame(mainLoop);
        }
        else {
            bullets.push(player.shoot());
        }
        return false;
    }
}

function is_in_triangle (px,py,ax,ay,bx,by,cx,cy){
    //credit: http://www.blackpawn.com/texts/pointinpoly/default.html
    
    var v0 = [cx-ax,cy-ay];
    var v1 = [bx-ax,by-ay];
    var v2 = [px-ax,py-ay];
    
    var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
    var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
    var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);
    var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
    var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);
    
    var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);
    
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    
    return ((u >= 0) && (v >= 0) && (u + v < 1));
}

function reset() {
    tick = 0;
    spawnRate = 60;
    pointList = [];
    deadPoints = [];
    bullets = [];
    player = new Ship();
    isPlayerAlive = true;
    tracker = new Point(1020, 128, 0, 0)
    borderLines[0] = new Line(-8, -8, -8, -8);//top to bottom
    borderLines[1] = new Line(-8, -8, -8, -8);//bottom to top
    borderLines[2] = new Line(-8, -8, -8, -8);//right to top
    borderLines[3] = new Line(-8, -8, -8, -8);//right to bottom
}

setCanvasClickEvent();