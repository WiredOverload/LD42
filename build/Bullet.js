define(["require", "exports", "./ICollidable"], function (require, exports, ICollidable_1) {
    "use strict";
    exports.__esModule = true;
    var Bullet = (function () {
        function Bullet(XPos, YPos, Angle) {
            this.x = XPos;
            this.y = YPos;
            this.angle = Angle;
            this.width = 8;
            this.height = 8;
            this.vel = 8;
            this.alive = true;
            this.draw = new Image();
            this.draw.src = "assets/grayLaser.png";
            this.collideGroup = ICollidable_1.CollideGroup.Bullet;
            this.collidesWith = [ICollidable_1.CollideGroup.Point];
        }
        Bullet.prototype.update = function () {
            this.x += Math.cos(this.angle) * this.vel;
            this.y += Math.sin(this.angle) * this.vel;
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
        Bullet.prototype.destroy = function () {
        };
        return Bullet;
    }());
    exports.Bullet = Bullet;
});
//# sourceMappingURL=Bullet.js.map