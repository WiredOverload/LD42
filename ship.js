define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ship = (function () {
        function ship() {
            this.x = 0;
            this.y = 0;
            this.angle = 0;
            this.prevMouseX = 0;
            this.prevMouseX = 0;
        }
        ship.prototype.update = function (mouseX, mouseY, prevMouseX, prevMouseY) {
            this.x = prevMouseX;
            this.y = prevMouseY;
            this.angle = Math.atan2(prevMouseY - mouseY, prevMouseX - mouseX);
        };
        ship.prototype.render = function (context, mouseX, mouseY) {
            var drawing = new Image();
            drawing.src = "assets/ship.png";
            context.translate(mouseX + 8, mouseY + 8);
            console.log(this.angle);
            context.rotate(this.angle + 3 * Math.PI / 2);
            context.drawImage(drawing, -8, -8);
            context.rotate(-(this.angle + 3 * Math.PI / 2));
            context.translate(-(mouseX + 8), -(mouseY + 8));
        };
        return ship;
    }());
    exports.ship = ship;
});
//# sourceMappingURL=ship.js.map