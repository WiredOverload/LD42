export class Bullet {
    x: number;
    y: number;
    w: number;
    h: number;
    vel: number;
    angle: number;
    alive: boolean;
    draw: HTMLImageElement;
    constructor(XPos: number, YPos: number, Angle: number) {
        this.x = XPos;
        this.y = YPos;
        this.angle = Angle;
        this.w = 8;
        this.h = 8;
        this.vel = 8;
        this.alive = true;
        this.draw = new Image();
        this.draw.src = "assets/grayLaser.png";
    }

    update(nodes: any[]) {
        this.x += Math.cos(this.angle) * this.vel;
        this.y += Math.sin(this.angle) * this.vel;

        // projectile collision
        nodes.forEach(node => {
            if (node.x < this.x + this.w &&
            node.x + 8 > this.x &&
            node.y < this.y + this.h &&
            8 + node.y > this.y &&
            !node.stuck) {
                node.pop();
            }
        });

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