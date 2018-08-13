define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ship = (function () {
        function ship() {
            this.x = 0;
            this.y = 0;
            this.vel = 0;
            this.maxVel = 6;
            this.angle = 0;
            this.accl = .1;
        }
        ship.prototype.update = function (mouseX, mouseY) {
            this.angle = Math.atan2(mouseY - this.y, mouseX - this.x);
            var v1 = this.x - mouseX;
            var v2 = this.y - mouseY;
            var distance = Math.sqrt(v1 * v1 + v2 * v2);
            if (distance > 75) {
                if (this.vel < this.maxVel) {
                    this.vel += this.accl;
                }
            }
            else if (distance <= 75) {
                if (this.vel < 1.5) {
                    this.vel += this.accl;
                }
                else {
                    this.vel -= this.accl;
                }
            }
            if (distance > 10) {
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