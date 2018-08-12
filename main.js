/*TODO:
 * 
 * 
*/

//canvas creation
var canvas = document.getElementById("imgCanvas");
var context = canvas.getContext("2d");

//game tick increases constantly
var tick = 0;

function Point(x, y, velX, velY, lines = [], health = 5, stuck = false) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.health = health;
    this.stuck = stuck;//whether the point is stuck to a wall
    this.lines = lines;//array of lines
}

function Line(x, y, x2, y2, health = 1, stuck = false) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.health = health;
    this.stuck = stuck;//whether the point is stuck to a wall
}

//list of all points
var pointList = [];

function pointUpdate() {
    pointList.forEach(element => {
        if(!element.stuck) {
            element.x += element.velX;
            element.y += element.velY;

            if(element.y <= 0) {
                element.y = 0;
                element.stuck = true;
            }
            else if(element.y >= 248) {
                element.y = 248;
                element.stuck = true;
            }
            else if(element.x >= 1016) {
                element.x = 1016;
                element.stuck = true;
            }
            //place projectile collision here
        }
        
    });
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#4800FF";
    

    pointList.forEach(element => {
        if(element.lines) {
            element.lines.forEach(element2 => {
                context.strokeStyle="#FF0000";
                context.beginPath();
                context.moveTo(element2.x, element2.y);
                context.lineTo(element2.x2, element2.y2);
                context.stroke();
            });
        }
        context.fillRect(element.x, element.y, 8, 8);
    });
}

function update() {
    if(tick % 60 == 0) {
        var tempLines = [];
        pointList.forEach(element => {
            if (element) {
                tempLines.push(new Line(0, 128, element.x, element.y));
            }
        });
        pointList.push(new Point(0, 128, Math.random(), (Math.random() * 2) - 1, tempLines));//temp testing values
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

//not actually used yet
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}