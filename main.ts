/*TODO:
 * Clean up Point update function
 * ^ Line updates and Point updates should be completely separate even though they are related
 * Finish cleaning up magic numbers
 * Add AABB heights and widths to ICollidable -> entities like bullet don't have the same visual and hitbox heights and widths
*/
import { Player } from "./Player";
import { Point } from "./Point";
import { Line } from "./Line";
import { Shadow } from "./Shadow";
import { isRenderable } from "./IRenderable";
import { isUpdatable } from "./IUpdatable";
import { isCollidable, checkCollision } from "./ICollidable";
import { isAlive } from "./IKillable";

// scene set up
var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("imgCanvas");
var context:CanvasRenderingContext2D = canvas.getContext("2d");
var mouseX:number = -10;
var mouseY:number = -10;
var rect = <ClientRect | DOMRect> null;

var player = new Player();
var shadow = new Shadow();
var entities:object[] = [];
entities.push(player);

var tick:number = 0; // acts as score for now as well as time
var gameSpeed:number = 144; //how many times mainloop is called per second
var music:HTMLAudioElement = new Audio("assets/RayTracer2.mp3");
var isGameStarted:boolean = false;
var highScore:number = 0;

var spawnVel:number = 1; //spawned point speed
var spawnRate:number = 60; //how quickly points spawn, larger = longer

var tracker:Point = new Point(1020, 128, 0, 0); //single point to help find other point positions

function render() : void {
    // clear most recent frame's render
    context.strokeStyle="#000000";
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // render shadow first as it's in the background
    shadow.render(context);

    entities.forEach(entity => {
        if (isRenderable(entity)) {
            entity.render(context);
        }
    });
    
    window.requestAnimationFrame(render);
}

render();

function update() : void {
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

        if (isCollidable(entity)) {
            checkCollision(entity, entities);
        };

        if (entity instanceof Point) {
        // this should be handled in a private Point method
            if (entity.stuck) {
                tempLines.push(new Line(0, 128, entity.x, entity.y));
            }
            if (!entity.alive) {
                // add to score for killing a Point
                tick += 180;
                // add explosion entity to entity list
                entities.push(entity.explode());
            }
        }
    });

    // filter out any entities that are no longer "alive"
    entities = entities.filter(entity => isAlive(entity));

    // check special shadow collision with player
    shadow.consumePlayer(player);

    if (!player.alive) {
        death();
    }
}


function death() : void {
    if(tick > highScore) {
        highScore = tick;
    }

    document.getElementById("TICKS").innerHTML = "GAME OVER, Your score was: " + tick + ", Highscore is: " + highScore + " (Click to retry)";
    isGameStarted = false;
    render();
    canvas.onmousedown = null;
    setTimeout(function() {
        setCanvasClickEvent();
    }, 2500);
}

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) : void {
    rect = canvas.getBoundingClientRect();
    mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    player.mouseX = mouseX;
    player.mouseY = mouseY;
}

canvas.addEventListener('mousemove', function(evt: MouseEvent) {
    getMousePos(canvas, evt);
}, false);

function setCanvasClickEvent() {
    canvas.onmousedown = function() {
        if(!isGameStarted) {
            isGameStarted = true;
            reset();
            music.play();
            music.volume = 0.7;
            music.loop = true;
            window.setInterval(mainLoop, 1000 / gameSpeed);
        }
        else {
            entities.push(player.shoot());
        }
        return false;
    }
}

setCanvasClickEvent();

function reset() : void {
    tick = 0;
    spawnRate = 60;
    player = new Player();
    tracker = new Point(1020, 128, 0, 0);
    shadow = new Shadow();
    entities = [];
    entities.push(player);
}

function mainLoop() : void {
    if (player.alive) {
        document.getElementById("TICKS").innerHTML = "Score: " + tick;
        tick++;
        update();
    }
}