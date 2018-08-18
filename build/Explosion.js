define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Explosion = (function () {
        function Explosion(X, Y) {
            this.x = X;
            this.y = Y;
            this.width = 8;
            this.height = 8;
            this.alive = true;
            this.explodeTick = 0;
            this.maxExplodeTime = 12;
            this.draw = new Image();
            this.draw.src = "assets/mediumExplosion4.png";
        }
        Explosion.prototype.update = function () {
            if (this.explodeTick < this.maxExplodeTime) {
                this.explodeTick++;
            }
            else {
                this.alive = false;
            }
        };
        Explosion.prototype.render = function (context) {
            context.drawImage(this.draw, this.x - (this.width / 2), this.y - (this.height / 2));
        };
        return Explosion;
    }());
    exports.Explosion = Explosion;
});
//# sourceMappingURL=Explosion.js.map