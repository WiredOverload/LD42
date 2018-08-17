define(["require", "exports", "./Line", "./ICollidable"], function (require, exports, Line_1, ICollidable_1) {
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
        Point.prototype.update = function (pointList, borderLines) {
            var _this = this;
            if (!this.stuck) {
                this.x += this.velX;
                this.y += this.velY;
                if (this.y <= 0) {
                    this.y = 0;
                    this.stuck = true;
                    var isFarthest = true;
                    pointList.forEach(function (point) {
                        if (point.stuck == true && point.y == 0 && point.x > _this.x) {
                            isFarthest = false;
                        }
                    });
                    if (isFarthest) {
                        var tempLine = new Line_1.Line(this.x, this.y, 0, 248);
                        this.lines.forEach(function (point) {
                            if (point.y2 == 248 && point.x2 > tempLine.x2) {
                                tempLine.x2 = point.x2;
                            }
                        });
                        borderLines[0] = tempLine;
                    }
                }
                else if (this.y >= 248) {
                    this.y = 248;
                    this.stuck = true;
                    var isFarthest = true;
                    pointList.forEach(function (point) {
                        if (point.stuck == true && point.y == 248 && point.x > _this.x) {
                            isFarthest = false;
                        }
                    });
                    if (isFarthest) {
                        var tempLine = new Line_1.Line(this.x, this.y, 0, 0);
                        this.lines.forEach(function (point) {
                            if (point.y2 == 0 && point.x2 > tempLine.x2) {
                                tempLine.x2 = point.x2;
                            }
                        });
                        borderLines[1] = tempLine;
                    }
                }
                else if (this.x >= 1016) {
                    this.x = 1016;
                    this.stuck = true;
                    var isFarthestUp = true;
                    var isFarthestDown = true;
                    pointList.forEach(function (point) {
                        if (point.stuck == true && point.x == 1016 && point.y < _this.y) {
                            isFarthestUp = false;
                        }
                        else if (point.stuck == true && point.x == 1016 && point.y > _this.y) {
                            isFarthestDown = false;
                        }
                    });
                    if (isFarthestUp) {
                        var tempLine = new Line_1.Line(this.x, this.y, 0, 0);
                        this.lines.forEach(function (point) {
                            if (point.y2 == 0 && point.x2 > tempLine.x2) {
                                tempLine.x2 = point.x2;
                            }
                        });
                        borderLines[2] = tempLine;
                    }
                    if (isFarthestDown) {
                        var tempLine = new Line_1.Line(this.x, this.y, 0, 256);
                        this.lines.forEach(function (point) {
                            if (point.y2 == 248 && point.x2 > tempLine.x2) {
                                tempLine.x2 = point.x2;
                            }
                        });
                        borderLines[3] = tempLine;
                    }
                }
            }
            else {
                if (this.y == 0) {
                    if (this.x < borderLines[0].x - 64) {
                        pointList.splice(pointList.indexOf(this), 1);
                    }
                }
                else {
                    if (this.x < borderLines[1].x - 64) {
                        pointList.splice(pointList.indexOf(this), 1);
                    }
                }
            }
            this.lines.forEach(function (point) {
                point.x = _this.x;
                point.y = _this.y;
            });
        };
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