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
            context.fillStyle = "grey";
            context.fillRect(mouseX, mouseY, 10, 10);
        };
        return ship;
    }());
    exports.ship = ship;
});
//# sourceMappingURL=ship.js.map