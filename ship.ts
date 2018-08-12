export class ship {
    x: number;
    y: number;
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    update(mouseX: number, mouseY: number) : void {
        console.log(mouseX);
        console.log(mouseY);
    }

    render(context : CanvasRenderingContext2D, mouseX: number, mouseY: number) : void {
        var drawing = new Image();
        drawing.src = "assets/ship.png"; 
        context.translate(mouseX + 8, mouseY + 8);
        context.rotate(1);
        context.drawImage(drawing, -8, -8);
        context.rotate(-1);
        context.translate(-(mouseX + 8), -(mouseY + 8));
    }
}