import { IRenderable } from "./IRenderable";
import { IUpdatable } from "./IUpdatable";

export class Explosion implements IUpdatable, IRenderable {
    x: number;
    y: number;
    width: number;
    height: number;
    alive: boolean;
    explodeTick: number;
    maxExplodeTime: number;
    draw: HTMLImageElement;
    constructor(X: number, Y: number) {
        this.x = X;
        this.y = Y;
        this.width = 8;
        this.height = 8;
        this.alive = true;
        this.explodeTick = 0;
        this.maxExplodeTime = 12;
        this.draw = new Image();
        this.draw.src = "assets/mediumExplosion4.png";
    }

    update() : void {
        if (this.explodeTick < this.maxExplodeTime) {
            this.explodeTick++;
        }
        else {
            this.alive = false;
        }

    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(this.draw, this.x - (this.width/2), this.y - (this.height/2));
    }
}