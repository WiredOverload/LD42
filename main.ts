/*TODO:
 * Clean up stuff that will remain in main
 * Clean up Point update function
 * ^ Line updates and Point updates should be completely separate even though they are related
 * NO MAGIC NUMBERS -> every entity should have width and height, so all the + 8 crap has to go
 * give all local vars types
 * fix scoring point system
 * add "explosion" class
*/
import { Player } from "./Player";
import { Bullet } from "./Bullet";
import { Point } from "./Point";
import { Line } from "./Line";
import { Shadow } from "./Shadow";
import { isRenderable } from "./IRenderable";
import { isUpdatable } from "./IUpdatable";
import { isCollidable, checkCollision, isAlive } from "./ICollidable";

// scene set up

var canvas = <HTMLCanvasElement> document.getElementById("imgCanvas");
var context = canvas.getContext("2d");
var mouseX = -10;
var mouseY = -10;
var rect;

var player = new Player();
var shadow = new Shadow();
var entities:object[] = [];
entities.push(player);

var tick = 0;
var music = new Audio("assets/RayTracer2.mp3");
var isGameStarted:boolean = false;
var highScore = 0;

//spawned point speed
var spawnVel = 1;
//how quickly points spawn, larger = longer
var spawnRate = 60;

var explosion = new Image();
explosion.src = "assets/mediumExplosion4.png";

//list of all dead points
var deadPoints:Point[] = [];

//single point to help find other point positions
var tracker = new Point(1020, 128, 0, 0);

function render() {
    context.strokeStyle="#000000";
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, canvas.height);

    shadow.render(context);

    deadPoints.forEach(point => {
        context.drawImage(explosion, point.x - 4, point.y - 4);
    });

    entities.forEach(entity => {
        if (isRenderable(entity)) {
            entity.render(context);
        }
    });
}
render();

function update() {
    var tempLines:Line[] = [];

    // TODO (WiredOverload): clean this up
    if(tick % spawnRate == 0) {
        tempLines.push(new Line(0, 128, tracker.x, tracker.y));
        spawnVel = shadow.topToBottomLine.x2 < shadow.bottomToTopLine.x2 ? (shadow.topToBottomLine.x / 512) + 1 : (shadow.bottomToTopLine.x / 512) + 1;// the hell is this
        entities.push(new Point(-4, 128, Math.random() * spawnVel, (Math.random() * 2) - 1, tempLines));//temp testing values

        if(tick % (spawnRate * 5) == 0 && spawnRate != 5) {
            spawnRate--;
        }
    }

    // TODO (WiredOverload): Make sure we don't have to pass in these tempParams anymore
    // temporary till we solve Point Update method
    var tempParams = {
        entities: entities,
        shadow: shadow,
    }

    entities.forEach(entity => {
        if (isUpdatable(entity)) {
            entity.update(tempParams);
        }

        if (entity instanceof Point) {
            if (entity.stuck) {
                tempLines.push(new Line(0, 128, entity.x, entity.y));
            }
        }

        if (isCollidable(entity)) {
            checkCollision(entity, entities);
        };
    });

    // deadPoints = deadPoints.filter(point => point.explodeTime - tick > -12);

    entities = entities.filter(entity => isAlive(entity));

    //player death
    shadow.consumePlayer(player);

    if (!player.alive) {
        death();
    }
}

function mainLoop() {
    if (player.alive) {
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
    player.mouseX = mouseX;
    player.mouseY = mouseY;
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
            entities.push(player.shoot());
        }
        return false;
    }
}

function reset() {
    tick = 0;
    spawnRate = 60;
    deadPoints = [];
    player = new Player();
    tracker = new Point(1020, 128, 0, 0);
    shadow = new Shadow();
    entities = [];
    entities.push(player);
}

setCanvasClickEvent();