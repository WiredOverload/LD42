import { IRenderable } from "./IRenderable";
import { ICollidable } from "./ICollidable";
import { CollideGroup } from "./ICollidable";
import { IUpdatable } from "./IUpdatable";

export class Bullet implements IUpdatable, IRenderable, ICollidable {
    x: number;
    y: number;
    width: number;
    height: number;
    vel: number;
    angle: number;
    alive: boolean;
    draw: HTMLImageElement;
    collideGroup: CollideGroup;
    collidesWith: CollideGroup;
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
        this.collidesWith = CollideGroup.Point;
    }

    // update(nodes: any[]) {
    update() {
        this.x += Math.cos(this.angle) * this.vel;
        this.y += Math.sin(this.angle) * this.vel;

        // projectile collision

        // nodes.forEach(node => {
        //     if (node.x < this.x + this.w &&
        //     node.x + 8 > this.x &&
        //     node.y < this.y + this.h &&
        //     8 + node.y > this.y &&
        //     !node.stuck) {
        //         node.pop();
        //     }
        // });

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
}