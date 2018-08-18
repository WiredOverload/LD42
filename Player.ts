import { Bullet } from "./Bullet";
import { ICollidable } from "./ICollidable";
import { CollideGroup } from "./ICollidable";
import { IRenderable } from "./IRenderable";
import { IUpdatable } from "./IUpdatable";

export class Player implements IUpdatable, IRenderable, ICollidable {
    x: number;
    y: number;
    height: number;
    width: number;
    mouseX: number;
    mouseY: number;
    vel: number;
    maxVel: number;
    angle: number;
    accl: number;
    draw: HTMLImageElement;
    alive: boolean;
    collideGroup: CollideGroup;
    collidesWith: CollideGroup[];
    constructor() {
        this.x = 800;
        this.y = 128;
        this.height = 16;
        this.width = 16;
        this.alive = true;
        this.vel = 0;
        this.maxVel = 6;
        this.angle = 0;
        this.accl = .1;
        this.draw = new Image();
        this.draw.src = "assets/ship.png";
        this.collideGroup = CollideGroup.Player;
        this.collidesWith = [CollideGroup.Point, CollideGroup.Shadow];
    }

    update() : void {
        this.angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
        var v1 = this.x - this.mouseX;
        var v2 = this.y - this.mouseY;
        var distance = Math.sqrt(v1*v1 + v2*v2);
        if (distance > 75) {
            if (this.vel < this.maxVel) {
                this.vel += this.accl;
            }
        }
        else if (distance <= 75) {
            if (this.vel < 1.5) {
                this.vel += this.accl;
            }
            else {
                this.vel -= this.accl;
            }
        }
        if (distance > 10) {
            this.x += Math.cos(this.angle) * this.vel;
            this.y += Math.sin(this.angle) * this.vel;
        }
    }

    render(context: CanvasRenderingContext2D) : void {
        context.translate(this.x, this.y);
        context.rotate(this.angle + Math.PI/2);
        context.drawImage(this.draw, -8, -8);
        context.rotate(-(this.angle + Math.PI/2));
        context.translate(-this.x, -this.y);
    }

    shoot() : Bullet {
        var shootSound = new Audio("./assets/shoot.wav");
        shootSound.play();
        shootSound.volume = 0.2;
        return new Bullet(this.x, this.y, this.angle);
    }

    destroy() : void {
        this.alive = false;
    }
}