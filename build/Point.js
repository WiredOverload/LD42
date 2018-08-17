define(["require", "exports", "./ICollidable"], function (require, exports, ICollidable_1) {
    "use strict";
    exports.__esModule = true;
    var Point = (function () {
        function Point(X, Y, VelX, VelY, Lines) {
            if (Lines === void 0) { Lines = []; }
            this.x = X;
            this.y = Y;
            this.velX = VelX;
            this.velY = VelY;
            this.health = 5;
            this.stuck = false;
            this.lines = Lines;
            this.alive = true;
            this.explodeTime = 0;
            this.explodeSound = new Audio("./assets/slink.mp3");
            this.collideGroup = ICollidable_1.CollideGroup.Point;
            this.collidesWith = ICollidable_1.CollideGroup.Bullet || ICollidable_1.CollideGroup.Player;
        }
        Point.prototype.pop = function () {
            this.alive = false;
            this.explodeSound.volume = 1;
            this.explodeSound.play();
        };
        return Point;
    }());
    exports.Point = Point;
});
//# sourceMappingURL=Point.js.map