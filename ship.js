define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ship = (function () {
        function ship() {
            this.x = 0;
            this.y = 0;
            this.vel = 6;
            this.maxVel = 6;
            this.angle = 0;
        }
        ship.prototype.update = function (mouseX, mouseY) {
            this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);
            var v1 = this.x - mouseX;
            var v2 = this.y - mouseY;
            if (Math.sqrt(v1 * v1 + v2 * v2) > 20) {
                this.x += Math.cos(this.angle) * this.vel;
                this.y += Math.sin(this.angle) * this.vel;
            }
        };
        ship.prototype.render = function (context) {
            var drawing = new Image();
            drawing.src = "assets/ship.png";
            context.translate(this.x, this.y);
            context.rotate(this.angle + Math.PI / 2);
            context.drawImage(drawing, -8, -8);
            context.rotate(-(this.angle + Math.PI / 2));
            context.translate(-this.x, -this.y);
        };
        return ship;
    }());
    exports.ship = ship;
});
//# sourceMappingURL=ship.js.map