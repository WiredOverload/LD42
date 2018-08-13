export class ship {
    x: number;
    y: number;
    vel: number;
    maxVel: number;
    angle: number;
    accl: number;
    constructor() {
        this.x = 0;
        this.y = 0
        this.vel = 0;
        this.maxVel = 6;
        this.angle = 0;
        this.accl = .1;
    }

    update(mouseX: number, mouseY: number) : void {
        this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);
        var v1 = this.x - mouseX;
        var v2 = this.y - mouseY;
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

    render(context : CanvasRenderingContext2D) : void {
        var drawing = new Image();
        drawing.src = "assets/ship.png";
        context.translate(this.x, this.y);
        context.rotate(this.angle + Math.PI/2);
        context.drawImage(drawing, -8, -8);
        context.rotate(-(this.angle + Math.PI/2));
        context.translate(-this.x, -this.y);
    }

    shoot() : bullet {
        return new bullet(this.x, this.y, this.angle);
    }
}

export class bullet {
    x: number;
    y: number;
    w: number;
    h: number;
    vel: number;
    angle: number;
    alive: boolean;
    constructor(XPos: number, YPos: number, Angle: number) {
        this.x = XPos;
        this.y = YPos;
        this.angle = Angle;
        this.w = 8;
        this.h = 8;
        this.vel = 8;
        this.alive = true;
    }

    update(nodes: any[]) {
        this.x += Math.cos(this.angle) * this.vel;
        this.y += Math.sin(this.angle) * this.vel;

        // projectile collision
        nodes.forEach(node => {
            if (node.x < this.x + this.w &&
            node.x + 8 > this.x &&
            node.y < this.y + this.h &&
            8 + node.y > this.y) {
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
        var drawing = new Image();
        drawing.src = "assets/grayLaser.png";
        context.translate(this.x, this.y);
        context.rotate(this.angle + 3*Math.PI/2);
        context.drawImage(drawing, -4, -8);
        context.rotate(-(this.angle + 3*Math.PI/2));
        context.translate(-this.x, -this.y);
    }
}