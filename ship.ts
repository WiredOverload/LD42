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
        drawing.src = "assets/ship.png"; // can also be a remote URL e.g. http://
        // drawing.onload = function() {
            context.drawImage(drawing,mouseX, mouseY, 16, 16);
        // }
        // context.fillStyle = "grey";
        // context.fillRect(mouseX, mouseY, 10, 10);
    }
}