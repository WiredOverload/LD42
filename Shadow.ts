import { Line } from "./Line";
import { IRenderable } from "./IRenderable";
import { Player } from "./Player";

export class Shadow implements IRenderable {
    topToBottomLine: Line;
    bottomToTopLine: Line;
    rightToTopLine: Line;
    rightToBottomLine: Line;
    constructor() {
        this.topToBottomLine = new Line(-8, -8, -8, -8);
        this.bottomToTopLine = new Line(-8, -8, -8, -8);
        this.rightToTopLine = new Line(-8, -8, -8, -8);
        this.rightToBottomLine = new Line(-8, -8, -8, -8);
    }

    render(context: CanvasRenderingContext2D) : void {
        //context.strokeStyle="#FF0000";
        context.fillStyle="#000000";//#800000
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(this.topToBottomLine.x + 4, this.topToBottomLine.y);
        context.lineTo(this.topToBottomLine.x2 + 4, this.topToBottomLine.y2 + 8);
        context.lineTo(0, 256);
        context.fill();

        context.beginPath();
        context.moveTo(0, 256);
        context.lineTo(this.bottomToTopLine.x + 4, this.bottomToTopLine.y + 8);
        context.lineTo(this.bottomToTopLine.x2 + 4, this.bottomToTopLine.y2);
        context.lineTo(0, 0);
        context.fill();

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(this.rightToTopLine.x2 + 4, this.rightToTopLine.y2);
        context.lineTo(this.rightToTopLine.x + 8, this.rightToTopLine.y + 4);
        context.lineTo(this.rightToBottomLine.x + 8, this.rightToBottomLine.y + 4);
        context.lineTo(this.rightToBottomLine.x2 + 4, this.rightToBottomLine.y2);
        context.lineTo(0, 256);
        context.fill();
    }

    // special collision detection between shadow & player
    consumePlayer(player: Player) : void {
        if(this.is_in_triangle(player.x + 8, player.y + 8, this.topToBottomLine.x, this.topToBottomLine.y, this.topToBottomLine.x2, this.topToBottomLine.y2, 0, 256) ||
            this.is_in_triangle(player.x + 8, player.y + 8, this.bottomToTopLine.x, this.bottomToTopLine.y, this.bottomToTopLine.x2, this.bottomToTopLine.y2, 0, 0) ||
            this.is_in_triangle(player.x + 8, player.y + 8, this.rightToTopLine.x, this.rightToTopLine.y, this.rightToTopLine.x2, this.rightToTopLine.y2, 0, 256) ||
            this.is_in_triangle(player.x + 8, player.y + 8, this.rightToBottomLine.x, this.rightToBottomLine.y, this.rightToBottomLine.x2, this.rightToBottomLine.y2, 0, 0))
        {
            player.destroy();
        }
    }

    private is_in_triangle (px,py,ax,ay,bx,by,cx,cy){
        //credit: http://www.blackpawn.com/texts/pointinpoly/default.html
        
        var v0 = [cx-ax,cy-ay];
        var v1 = [bx-ax,by-ay];
        var v2 = [px-ax,py-ay];
        
        var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
        var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
        var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);
        var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
        var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);
        
        var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);
        
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
        
        return ((u >= 0) && (v >= 0) && (u + v < 1));
    }
}