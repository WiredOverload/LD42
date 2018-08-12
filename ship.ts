export class ship {
    x: number;
    y: number;
    vel: number;
    maxVel: number;
    angle: number;
    constructor() {
        this.x = 0;
        this.y = 0
        this.vel = 6;
        this.maxVel = 6;
        this.angle = 0;
    }

    update(mouseX: number, mouseY: number) : void {
        // if (twoPrevMouseX > mouseX) {
        //     this.x = prevMouseX + 10;
        // }
        // else {
        //     this.x = prevMouseX - 10;
        // }
        // if (twoPrevMouseY > mouseY) {
        //     this.y = prevMouseY + 10;
        // }
        // else {
        //     this.y = prevMouseY - 10;
        // }
        // this.x = (prevMouseX + twoPrevMouseX) / 2;
        // this.y = (prevMouseY + twoPrevMouseY) / 2;
        // if (Math.abs(mouseX - prevMouseX) > 0.1) {
        //     this.x = twoPrevMouseX;
        // }
        // if (Math.abs(mouseY - prevMouseY) > 0.1) {
        //     this.y = twoPrevMouseY;
        // }
        // this.angle = Math.atan2(mouseY - twoPrevMouseY, mouseX - twoPrevMouseX);
        this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);
        this.x += Math.cos(this.angle) * this.vel;
        this.y += Math.sin(this.angle) * this.vel;
    }

    render(context : CanvasRenderingContext2D, mouseX: number, mouseY: number) : void {
        var drawing = new Image();
        drawing.src = "assets/ship.png"; 
        // context.translate(mouseX + 8, mouseY + 8);
        context.translate(this.x, this.y);
        context.rotate(this.angle + Math.PI/2);
        context.drawImage(drawing, -8, -8);
        context.rotate(-(this.angle + Math.PI/2));
        // context.translate(-(mouseX + 8), -(mouseY + 8));
        context.translate(-this.x, -this.y);
    }
}