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
        context.fillStyle = "grey";
        context.fillRect(mouseX, mouseY, 10, 10);
    }
}