define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ship = (function () {
        function ship() {
            this.x = 800;
            this.y = 128;
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
        ship.prototype.shoot = function () {
            var shootSound = new Audio("./assets/shoot.wav");
            shootSound.play();
            shootSound.volume = 0.3;
            return new bullet(this.x, this.y, this.angle);
        };
        return ship;
    }());
    exports.ship = ship;
    var bullet = (function () {
        function bullet(XPos, YPos, Angle) {
            this.x = XPos;
            this.y = YPos;
            this.angle = Angle;
            this.w = 8;
            this.h = 8;
            this.vel = 8;
            this.alive = true;
        }
        bullet.prototype.update = function (nodes) {
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
        bullet.prototype.render = function (context) {
            var drawing = new Image();
            drawing.src = "assets/grayLaser.png";
            context.translate(this.x, this.y);
            context.rotate(this.angle + 3 * Math.PI / 2);
            context.drawImage(drawing, -4, -8);
            context.rotate(-(this.angle + 3 * Math.PI / 2));
            context.translate(-this.x, -this.y);
        };
        return bullet;
    }());
    exports.bullet = bullet;
});
//# sourceMappingURL=ship.js.map