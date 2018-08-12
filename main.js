define(["require", "exports", "./ship"], function (require, exports, ship_1) {
    "use strict";
    exports.__esModule = true;
    var player = new ship_1.ship();
    var canvas = document.getElementById("imgCanvas");
    var context = canvas.getContext("2d");
    var mouseX = -10;
    var mouseY = -10;
    var tick = 0;
    function Point(x, y, velX, velY, lines, health, stuck) {
        if (lines === void 0) { lines = []; }
        if (health === void 0) { health = 5; }
        if (stuck === void 0) { stuck = false; }
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.health = health;
        this.stuck = stuck;
        this.lines = lines;
    }
    function Line(x, y, x2, y2, health) {
        if (health === void 0) { health = 1; }
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;
        this.health = health;
    }
    var pointList = [];
    var borderLine1 = new Line(0, 0, 0, 0);
    var borderLine2 = new Line(0, 0, 0, 0);
    function pointUpdate() {
        pointList.forEach(function (element) {
            if (!element.stuck) {
                element.x += element.velX;
                element.y += element.velY;
                if (element.y <= 0) {
                    element.y = 0;
                    element.stuck = true;
                    var isFarthest = true;
                    pointList.forEach(function (element2) {
                        if (element2.stuck == true && element2.y == 0 && element2.x > element.x) {
                            isFarthest = false;
                        }
                    });
                    if (isFarthest) {
                        var tempLine = new Line(element.x, element.y, 0, 248);
                        element.lines.forEach(function (element2) {
                            if (element2.y2 == 248 && element2.x2 > tempLine.x2) {
                                tempLine.x2 = element2.x2;
                            }
                        });
                        borderLine1 = tempLine;
                    }
                }
                else if (element.y >= 248) {
                    element.y = 248;
                    element.stuck = true;
                    var isFarthest = true;
                    pointList.forEach(function (element2) {
                        if (element2.stuck == true && element2.y == 248 && element2.x > element.x) {
                            isFarthest = false;
                        }
                    });
                    if (isFarthest) {
                        var tempLine = new Line(element.x, element.y, 0, 0);
                        element.lines.forEach(function (element2) {
                            if (element2.y2 == 0 && element2.x2 > tempLine.x2) {
                                tempLine.x2 = element2.x2;
                            }
                        });
                        borderLine2 = tempLine;
                    }
                }
                else if (element.x >= 1016) {
                    element.x = 1016;
                    element.stuck = true;
                }
            }
            element.lines.forEach(function (element2) {
                element2.x = element.x;
                element2.y = element.y;
            });
        });
    }
    function render() {
        context.strokeStyle = "#000000";
        context.fillStyle = "lightgrey";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#FF0000";
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
        pointList.forEach(function (element) {
            if (element.lines) {
                element.lines.forEach(function (element2) {
                    context.beginPath();
                    context.moveTo(element2.x + 4, element2.y + 4);
                    if (element2.y2 == 0) {
                        context.lineTo(element2.x2 + 4, element2.y2);
                    }
                    else {
                        context.lineTo(element2.x2 + 4, element2.y2 + 8);
                    }
                    context.stroke();
                });
            }
            context.fillStyle = "#4800FF";
            context.fillRect(element.x, element.y, 8, 8);
        });
        player.render(context, mouseX, mouseY);
    }
    function update() {
        if (tick % 60 == 0) {
            var tempLines = [];
            pointList.forEach(function (element) {
                if (element.stuck) {
                    tempLines.push(new Line(0, 128, element.x, element.y));
                }
            });
            pointList.push(new Point(0, 128, Math.random(), (Math.random() * 2) - 1, tempLines));
        }
        pointUpdate();
    }
    function mainLoop() {
        document.getElementById("TICKS").innerHTML = "Ticks: " + tick;
        tick++;
        update();
        render();
        window.requestAnimationFrame(mainLoop);
    }
    window.requestAnimationFrame(mainLoop);
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        player.update(mouseX, mouseY);
    }
    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(canvas, evt);
    }, false);
});
//# sourceMappingURL=main.js.map