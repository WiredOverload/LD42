define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ship = (function () {
        function ship() {
            this.x = 0;
            this.y = 0;
        }
        ship.prototype.update = function (mouseX, mouseY) {
            console.log(mouseX);
            console.log(mouseY);
        };
        ship.prototype.render = function (context, mouseX, mouseY) {
            var drawing = new Image();
            drawing.src = "assets/ship.png";
            context.save();
            context.translate(mouseX + 8, mouseY + 8);
            context.rotate(1);
            context.drawImage(drawing, -8, -8);
            context.restore();
        };
        return ship;
    }());
    exports.ship = ship;
});
//# sourceMappingURL=ship.js.map