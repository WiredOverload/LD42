import { IRenderable } from "./IRenderable";
import { ICollidable, CollideGroup } from "./ICollidable";
import { IUpdatable } from "./IUpdatable";
import { IKillable } from "./IKillable";

export class Bullet implements IUpdatable, IRenderable, ICollidable, IKillable {
    x: number;
    y: number;
    width: number;
    height: number;
    vel: number;
    angle: number;
    alive: boolean;
    draw: HTMLImageElement;
    collideGroup: CollideGroup;
    collidesWith: CollideGroup[];
    constructor(XPos: number, YPos: number, Angle: number) {
        this.x = XPos;
        this.y = YPos;
        this.angle = Angle;
        this.width = 8;
        this.height = 8;
        this.vel = 8;
        this.alive = true;
        this.draw = new Image();
        this.draw.src = "assets/grayLaser.png";
        this.collideGroup = CollideGroup.Bullet;
        this.collidesWith = [CollideGroup.Point];
    }

    update() {
        this.x += Math.cos(this.angle) * this.vel;
        this.y += Math.sin(this.angle) * this.vel;

        if (this.x > 1024 || this.x < 0) {
            this.alive = false;
        }
        if (this.y > 256 || this.y < 0) {
            this.alive = false;
        }
    }

    render(context : CanvasRenderingContext2D) : void {
        context.translate(this.x, this.y);
        context.rotate(this.angle + 3*Math.PI/2);
        context.drawImage(this.draw, -4, -8);
        context.rotate(-(this.angle + 3*Math.PI/2));
        context.translate(-this.x, -this.y);
    }

    // set this.alive = false if we don't want piercing bullets
    destroy() : void {
        // this.alive = false;
    }
}