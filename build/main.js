define(["require", "exports", "./ship", "./Point", "./Line", "./Shadow"], function (require, exports, ship_1, Point_1, Line_1, Shadow_1) {
    "use strict";
    exports.__esModule = true;
    var player = new ship_1.Ship();
    var shadow = new Shadow_1.Shadow();
    var bullets = [];
    var canvas = document.getElementById("imgCanvas");
    var context = canvas.getContext("2d");
    var mouseX = -10;
    var mouseY = -10;
    var rect;
    var tick = 0;
    var music = new Audio("assets/RayTracer2.mp3");
    var isGameStarted = false;
    var isPlayerAlive = true;
    var highScore = 0;
    var spawnVel = 1;
    var spawnRate = 60;
    var explosion = new Image();
    explosion.src = "assets/mediumExplosion4.png";
    var pointList = [];
    var deadPoints = [];
    var tracker = new Point_1.Point(1020, 128, 0, 0);
    function render() {
        context.strokeStyle = "#000000";
        context.fillStyle = "lightgrey";
        context.fillRect(0, 0, canvas.width, canvas.height);
        shadow.render(context);
        pointList.forEach(function (point) {
            if (point.lines) {
                point.lines.forEach(function (line) {
                    line.render(context);
                });
            }
            point.render(context);
        });
        player.render(context);
        deadPoints.forEach(function (point) {
            context.drawImage(explosion, point.x - 4, point.y - 4);
        });
        bullets.forEach(function (bullet) {
            bullet.render(context);
        });
    }
    render();
    function update() {
        if (tick % spawnRate == 0) {
            var tempLines = [];
            pointList.forEach(function (element) {
                if (element.stuck) {
                    tempLines.push(new Line_1.Line(0, 128, element.x, element.y));
                }
            });
            tempLines.push(new Line_1.Line(0, 128, tracker.x, tracker.y));
            spawnVel = shadow.topToBottomLine.x2 < shadow.bottomToTopLine.x2 ? (shadow.topToBottomLine.x / 512) + 1 : (shadow.bottomToTopLine.x / 512) + 1;
            pointList.push(new Point_1.Point(-4, 128, Math.random() * spawnVel, (Math.random() * 2) - 1, tempLines));
            if (tick % (spawnRate * 5) == 0 && spawnRate != 5) {
                spawnRate--;
            }
        }
        pointList.forEach(function (point) {
            point.update(pointList, shadow);
        });
        player.update(mouseX, mouseY);
        bullets.forEach(function (bullet) {
            bullet.update(pointList);
        });
        pointList.forEach(function (element) {
            if (!element.alive) {
                element.explodeTime = tick;
                deadPoints.push(element);
            }
        });
        bullets = bullets.filter(function (bullet) { return bullet.alive; });
        deadPoints = deadPoints.filter(function (point) { return point.explodeTime - tick > -12; });
        pointList = pointList.filter(function (point) { return point.alive; });
        if (is_in_triangle(player.x + 8, player.y + 8, shadow.topToBottomLine.x, shadow.topToBottomLine.y, shadow.topToBottomLine.x2, shadow.topToBottomLine.y2, 0, 256) ||
            is_in_triangle(player.x + 8, player.y + 8, shadow.bottomToTopLine.x, shadow.bottomToTopLine.y, shadow.bottomToTopLine.x2, shadow.bottomToTopLine.y2, 0, 0) ||
            is_in_triangle(player.x + 8, player.y + 8, shadow.rightToTopLine.x, shadow.rightToTopLine.y, shadow.rightToTopLine.x2, shadow.rightToTopLine.y2, 0, 256) ||
            is_in_triangle(player.x + 8, player.y + 8, shadow.rightToBottomLine.x, shadow.rightToBottomLine.y, shadow.rightToBottomLine.x2, shadow.rightToBottomLine.y2, 0, 0)) {
            death();
        }
        pointList.forEach(function (point) {
            if (player.x < point.x + 8 &&
                player.x > point.x &&
                player.y < point.y + 8 &&
                player.y > point.y) {
                death();
            }
        });
    }
    function mainLoop() {
        if (isPlayerAlive) {
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
        isPlayerAlive = false;
        isGameStarted = false;
        render();
        context.drawImage(explosion, player.x + 8, player.y + 8);
        canvas.onmousedown = null;
        setTimeout(function () {
            setCanvasClickEvent();
        }, 2500);
    }
    function getMousePos(canvas, evt) {
        rect = canvas.getBoundingClientRect();
        mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    }
    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(canvas, evt);
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
                bullets.push(player.shoot());
            }
            return false;
        };
    }
    function is_in_triangle(px, py, ax, ay, bx, by, cx, cy) {
        var v0 = [cx - ax, cy - ay];
        var v1 = [bx - ax, by - ay];
        var v2 = [px - ax, py - ay];
        var dot00 = (v0[0] * v0[0]) + (v0[1] * v0[1]);
        var dot01 = (v0[0] * v1[0]) + (v0[1] * v1[1]);
        var dot02 = (v0[0] * v2[0]) + (v0[1] * v2[1]);
        var dot11 = (v1[0] * v1[0]) + (v1[1] * v1[1]);
        var dot12 = (v1[0] * v2[0]) + (v1[1] * v2[1]);
        var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
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
        player = new ship_1.Ship();
        isPlayerAlive = true;
        tracker = new Point_1.Point(1020, 128, 0, 0);
        shadow = new Shadow_1.Shadow();
    }
    setCanvasClickEvent();
});
//# sourceMappingURL=main.js.map