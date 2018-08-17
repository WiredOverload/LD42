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
}