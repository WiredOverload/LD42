export class Line {
    x: number;
    y: number;
    x2: number;
    y2: number;
    health: number;
    constructor(X: number, Y: number, X2: number, Y2: number) {
        this.x = X;
        this.y = Y;
        this.x2 = X2;
        this.y2 = Y2;
        this.health = 1;
    }

    render(context: CanvasRenderingContext2D) : void {
        context.beginPath();
        context.moveTo(this.x + 4, this.y + 4);
        if(this.y2 == 0) {
            context.lineTo(this.x2 + 4, this.y2);
        }
        else {
            context.lineTo(this.x2 + 4, this.y2 + 8);
        }
        if(this.x2 == 1020 && this.y2 == 128) {
            context.strokeStyle="#FFFFFF";
        }
        else {
            context.strokeStyle="#000000";
        }
        context.stroke();
    }
}