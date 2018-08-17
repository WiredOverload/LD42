export class Point {
    x: number;
    y: number;
    velX: number;
    velY: number;
    health: number;
    stuck: boolean; //whether the point is stuck to a wall
    lines; //array of lines
    alive: boolean;
    explodeTime: number;
    explodeSound: HTMLAudioElement;
    constructor(X: number, Y: number, VelX: number, VelY: number, Lines = []) {
        this.x = X;
        this.y = Y;
        this.velX = VelX;
        this.velY = VelY;
        this.health = 5;
        this.stuck = false; //whether the point is stuck to a wall
        this.lines = Lines; //array of lines
        this.alive = true;
        this.explodeTime = 0;
        this.explodeSound = new Audio("./assets/slink.mp3");
    }

    pop() {
        this.alive = false;
        // tick += 180;
        this.explodeSound.volume = 1;
        this.explodeSound.play();
    }
}