define(["require", "exports", "./Line"], function (require, exports, Line_1) {
    "use strict";
    exports.__esModule = true;
    var Shadow = (function () {
        function Shadow() {
            this.topToBottomLine = new Line_1.Line(-8, -8, -8, -8);
            this.bottomToTopLine = new Line_1.Line(-8, -8, -8, -8);
            this.rightToTopLine = new Line_1.Line(-8, -8, -8, -8);
            this.rightToBottomLine = new Line_1.Line(-8, -8, -8, -8);
        }
        Shadow.prototype.render = function (context) {
            context.fillStyle = "#000000";
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
        };
        return Shadow;
    }());
    exports.Shadow = Shadow;
});
//# sourceMappingURL=Shadow.js.map