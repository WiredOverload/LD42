define(["require", "exports", "./Bullet", "./ICollidable"], function (require, exports, Bullet_1, ICollidable_1) {
    "use strict";
    exports.__esModule = true;
    var Player = (function () {
        function Player() {
            this.x = 800;
            this.y = 128;
            this.vel = 0;
            this.maxVel = 6;
            this.angle = 0;
            this.accl = .1;
            this.draw = new Image();
            this.draw.src = "assets/ship.png";
            this.collideGroup = ICollidable_1.CollideGroup.Ship;
            this.collidesWith = ICollidable_1.CollideGroup.Point || ICollidable_1.CollideGroup.Shadow;
        }
        Player.prototype.update = function () {
            this.angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
            var v1 = this.x - this.mouseX;
            var v2 = this.y - this.mouseY;
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
        Player.prototype.render = function (context) {
            context.translate(this.x, this.y);
            context.rotate(this.angle + Math.PI / 2);
            context.drawImage(this.draw, -8, -8);
            context.rotate(-(this.angle + Math.PI / 2));
            context.translate(-this.x, -this.y);
        };
        Player.prototype.shoot = function () {
            var shootSound = new Audio("./assets/shoot.wav");
            shootSound.play();
            shootSound.volume = 0.2;
            return new Bullet_1.Bullet(this.x, this.y, this.angle);
        };
        return Player;
    }());
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map