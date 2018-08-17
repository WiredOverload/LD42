import { Line } from "./Line";
import { ICollidable } from "./ICollidable";
import { CollideGroup } from "./ICollidable";

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
        this.collidesWith = CollideGroup.Bullet || CollideGroup.Player;
    }

    // TODO: rename "pop"
    pop() {
        this.alive = false;
        // tick += 180; // TODO: Pull in reference to score / tick counter so "popping" will add to score
        this.explodeSound.volume = 1;
        this.explodeSound.play();
    }
}