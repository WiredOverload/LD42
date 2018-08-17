define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Bullet = (function () {
        function Bullet(XPos, YPos, Angle) {
            this.x = XPos;
            this.y = YPos;
            this.angle = Angle;
            this.w = 8;
            this.h = 8;
            this.vel = 8;
            this.alive = true;
            this.draw = new Image();
            this.draw.src = "assets/grayLaser.png";
        }
        Bullet.prototype.update = function (nodes) {
            var _this = this;
            this.x += Math.cos(this.angle) * this.vel;
            this.y += Math.sin(this.angle) * this.vel;
            nodes.forEach(function (node) {
                if (node.x < _this.x + _this.w &&
                    node.x + 8 > _this.x &&
                    node.y < _this.y + _this.h &&
                    8 + node.y > _this.y &&
                    !node.stuck) {
                    node.pop();
                }
            });
            if (this.x > 1024 || this.x < 0) {
                this.alive = false;
            }
            if (this.y > 256 || this.y < 0) {
                this.alive = false;
            }
        };
        Bullet.prototype.render = function (context) {
            context.translate(this.x, this.y);
            context.rotate(this.angle + 3 * Math.PI / 2);
            context.drawImage(this.draw, -4, -8);
            context.rotate(-(this.angle + 3 * Math.PI / 2));
            context.translate(-this.x, -this.y);
        };
        return Bullet;
    }());
    exports.Bullet = Bullet;
});
//# sourceMappingURL=Bullet.js.map