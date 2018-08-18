define(["require", "exports", "./Player", "./Point", "./Line", "./Shadow", "./IRenderable", "./IUpdatable", "./ICollidable", "./Explosion"], function (require, exports, Player_1, Point_1, Line_1, Shadow_1, IRenderable_1, IUpdatable_1, ICollidable_1, Explosion_1) {
    "use strict";
    exports.__esModule = true;
    var canvas = document.getElementById("imgCanvas");
    var context = canvas.getContext("2d");
    var mouseX = -10;
    var mouseY = -10;
    var rect = null;
    var player = new Player_1.Player();
    var shadow = new Shadow_1.Shadow();
    var entities = [];
    entities.push(player);
    var tick = 0;
    var music = new Audio("assets/RayTracer2.mp3");
    var isGameStarted = false;
    var highScore = 0;
    var spawnVel = 1;
    var spawnRate = 60;
    var tracker = new Point_1.Point(1020, 128, 0, 0);
    function render() {
        context.strokeStyle = "#000000";
        context.fillStyle = "lightgrey";
        context.fillRect(0, 0, canvas.width, canvas.height);
        shadow.render(context);
        entities.forEach(function (entity) {
            if (IRenderable_1.isRenderable(entity)) {
                entity.render(context);
            }
        });
    }
    render();
    function update() {
        var tempLines = [];
        if (tick % spawnRate == 0) {
            tempLines.push(new Line_1.Line(0, 128, tracker.x, tracker.y));
            spawnVel = shadow.topToBottomLine.x2 < shadow.bottomToTopLine.x2 ? (shadow.topToBottomLine.x / 512) + 1 : (shadow.bottomToTopLine.x / 512) + 1;
            entities.push(new Point_1.Point(-4, 128, Math.random() * spawnVel, (Math.random() * 2) - 1, tempLines));
            if (tick % (spawnRate * 5) == 0 && spawnRate != 5) {
                spawnRate--;
            }
        }
        var tempParams = {
            entities: entities,
            shadow: shadow
        };
        entities.forEach(function (entity) {
            if (IUpdatable_1.isUpdatable(entity)) {
                entity.update(tempParams);
            }
            if (ICollidable_1.isCollidable(entity)) {
                ICollidable_1.checkCollision(entity, entities);
            }
            ;
            if (entity instanceof Point_1.Point) {
                if (entity.stuck) {
                    tempLines.push(new Line_1.Line(0, 128, entity.x, entity.y));
                }
                if (!entity.alive) {
                    entities.push(entity.explode());
                    console.log("sup dude");
                }
            }
            if (entity instanceof Explosion_1.Explosion) {
                console.log("sup dude");
            }
        });
        entities = entities.filter(function (entity) { return ICollidable_1.isAlive(entity); });
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
        if (tick > highScore) {
            highScore = tick;
        }
        document.getElementById("TICKS").innerHTML = "GAME OVER, Your score was: " + tick + ", Highscore is: " + highScore + " (Click to retry)";
        isGameStarted = false;
        render();
        canvas.onmousedown = null;
        setTimeout(function () {
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
    canvas.addEventListener('mousemove', function (evt) {
        getMousePos(canvas, evt);
    }, false);
    function setCanvasClickEvent() {
        canvas.onmousedown = function () {
            if (!isGameStarted) {
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
        };
    }
    function reset() {
        tick = 0;
        spawnRate = 60;
        player = new Player_1.Player();
        tracker = new Point_1.Point(1020, 128, 0, 0);
        shadow = new Shadow_1.Shadow();
        entities = [];
        entities.push(player);
    }
    setCanvasClickEvent();
});
//# sourceMappingURL=main.js.map