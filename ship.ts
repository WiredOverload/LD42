export class ship {
    x: number;
    y: number;
    angle: number;
    prevMouseX: number;
    prevMouseY: number;
    constructor() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.prevMouseX = 0;
        this.prevMouseX = 0;
    }

    update(mouseX: number, mouseY: number, prevMouseX: number, prevMouseY: number) : void {
        this.x = prevMouseX;
        this.y = prevMouseY;
        this.angle = Math.atan2(prevMouseY - mouseY, prevMouseX - mouseX);
    }

    render(context : CanvasRenderingContext2D, mouseX: number, mouseY: number) : void {
        var drawing = new Image();
        drawing.src = "assets/ship.png"; 
        context.translate(mouseX + 8, mouseY + 8);
        console.log(this.angle);
        context.rotate(this.angle + 3*Math.PI/2);
        context.drawImage(drawing, -8, -8);
        context.rotate(-(this.angle + 3*Math.PI/2));
        context.translate(-(mouseX + 8), -(mouseY + 8));
    }
}