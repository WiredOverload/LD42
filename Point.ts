import { Line } from "./Line";
import { ICollidable } from "./ICollidable";
import { CollideGroup } from "./ICollidable";
import { Shadow } from "./Shadow";

export class Point implements ICollidable {
    x: number;
    y: number;
    velX: number;
    velY: number;
    health: number;
    stuck: boolean; // whether the point is stuck to a wall
    lines: Line[]; // array of lines
    alive: boolean;
    explodeTime: number;
    explodeSound: HTMLAudioElement;
    collideGroup: CollideGroup;
    collidesWith: CollideGroup;
    constructor(X: number, Y: number, VelX: number, VelY: number, Lines = []) {
        this.x = X;
        this.y = Y;
        this.velX = VelX;
        this.velY = VelY;
        this.health = 5;
        this.stuck = false; // whether the point is stuck to a wall
        this.lines = Lines; // array of lines
        this.alive = true;
        this.explodeTime = 0;
        this.explodeSound = new Audio("./assets/slink.mp3");
        this.collideGroup = CollideGroup.Point;
        this.collidesWith = CollideGroup.Bullet || CollideGroup.Ship;
    }

    update(pointList: Point[], shadow: Shadow) : void {
        if(!this.stuck) {
            this.x += this.velX;
            this.y += this.velY;

            if(this.y <= 0) {
                this.y = 0;
                this.stuck = true;
                var isFarthest:boolean = true;
                pointList.forEach(point => {
                    if(point.stuck == true && point.y == 0 && point.x > this.x) {
                        isFarthest = false;
                    }
                });
                if(isFarthest) {
                    var tempLine = new Line(this.x, this.y, 0, 248);
                    this.lines.forEach(point => {
                        if(point.y2 == 248 && point.x2 > tempLine.x2) {
                            tempLine.x2 = point.x2;
                        }
                    });
                    shadow.topToBottomLine = tempLine;
                }
            }
            else if(this.y >= 248) {
                this.y = 248;
                this.stuck = true;
                var isFarthest:boolean = true;
                pointList.forEach(point => {
                    if(point.stuck == true && point.y == 248 && point.x > this.x) {
                        isFarthest = false;
                    }
                });
                if(isFarthest) {
                    var tempLine = new Line(this.x, this.y, 0, 0);
                    this.lines.forEach(point => {
                        if(point.y2 == 0 && point.x2 > tempLine.x2) {
                            tempLine.x2 = point.x2;
                        }
                    });
                    shadow.bottomToTopLine = tempLine;
                }
            }
            else if(this.x >= 1016) {//change to losing game
                this.x = 1016;
                this.stuck = true;
                var isFarthestUp:boolean = true;
                var isFarthestDown:boolean = true;
                pointList.forEach(point => {
                    if(point.stuck == true && point.x == 1016 && point.y < this.y) {
                        isFarthestUp = false;
                    }
                    else if(point.stuck == true && point.x == 1016 && point.y > this.y) {
                        isFarthestDown = false;
                    }
                });
                if(isFarthestUp) {
                    var tempLine = new Line(this.x, this.y, 0, 0);
                    this.lines.forEach(point => {
                        if(point.y2 == 0 && point.x2 > tempLine.x2) {
                            tempLine.x2 = point.x2;
                        }
                    });
                    shadow.rightToTopLine = tempLine;
                }
                if(isFarthestDown) {
                    var tempLine = new Line(this.x, this.y, 0, 256);
                    this.lines.forEach(point => {
                        if(point.y2 == 248 && point.x2 > tempLine.x2) {
                            tempLine.x2 = point.x2;
                        }
                    });
                    shadow.rightToBottomLine = tempLine;
                }
            }
        }
        else {
            //point deletion
            if(this.y == 0) {
                if(this.x < shadow.topToBottomLine.x - 64) {
                    pointList.splice(pointList.indexOf(this), 1);
                }
            }
            else {
                if(this.x < shadow.bottomToTopLine.x - 64) {
                    pointList.splice(pointList.indexOf(this), 1);
                }
            }
        }
        this.lines.forEach(point => {
            point.x = this.x;
            point.y = this.y;
        });
    }

    render(context: CanvasRenderingContext2D) : void {
        context.fillStyle = "#000000";//4800FF
        context.fillRect(this.x, this.y, 8, 8);
    }

    // TODO: rename "pop"
    pop() : void {
        this.alive = false;
        // tick += 180; // TODO: Pull in reference to score / tick counter so "popping" will add to score
        this.explodeSound.volume = 1;
        this.explodeSound.play();
    }
}