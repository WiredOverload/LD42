define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Line = (function () {
        function Line(X, Y, X2, Y2) {
            this.x = X;
            this.y = Y;
            this.x2 = X2;
            this.y2 = Y2;
            this.health = 1;
        }
        Line.prototype.render = function (context) {
            context.beginPath();
            context.moveTo(this.x + 4, this.y + 4);
            if (this.y2 == 0) {
                context.lineTo(this.x2 + 4, this.y2);
            }
            else {
                context.lineTo(this.x2 + 4, this.y2 + 8);
            }
            if (this.x2 == 1020 && this.y2 == 128) {
                context.strokeStyle = "#FFFFFF";
            }
            else {
                context.strokeStyle = "#000000";
            }
            context.stroke();
        };
        return Line;
    }());
    exports.Line = Line;
});
//# sourceMappingURL=Line.js.map