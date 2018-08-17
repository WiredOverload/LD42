define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var CollideGroup;
    (function (CollideGroup) {
        CollideGroup[CollideGroup["Ship"] = 0] = "Ship";
        CollideGroup[CollideGroup["Bullet"] = 1] = "Bullet";
        CollideGroup[CollideGroup["Point"] = 2] = "Point";
        CollideGroup[CollideGroup["Shadow"] = 3] = "Shadow";
    })(CollideGroup = exports.CollideGroup || (exports.CollideGroup = {}));
    function isCollidable(obj) {
        var collidableObj = obj;
        return (collidableObj.collideGroup !== undefined
            && collidableObj.collidesWith !== undefined);
    }
    exports.isCollidable = isCollidable;
});
//# sourceMappingURL=ICollidable.js.map