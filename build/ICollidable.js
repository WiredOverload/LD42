define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var CollideGroup;
    (function (CollideGroup) {
        CollideGroup[CollideGroup["Player"] = 0] = "Player";
        CollideGroup[CollideGroup["Bullet"] = 1] = "Bullet";
        CollideGroup[CollideGroup["Point"] = 2] = "Point";
        CollideGroup[CollideGroup["Shadow"] = 3] = "Shadow";
    })(CollideGroup = exports.CollideGroup || (exports.CollideGroup = {}));
    function isCollidable(obj) {
        var collidableObj = obj;
        return (collidableObj.x !== undefined
            && collidableObj.y !== undefined
            && collidableObj.width !== undefined
            && collidableObj.height !== undefined
            && collidableObj.collideGroup !== undefined
            && collidableObj.collidesWith !== undefined
            && collidableObj.destroy !== undefined);
    }
    exports.isCollidable = isCollidable;
    function checkCollision(collider, entities) {
        entities.forEach(function (entity) {
            if (isCollidable(entity)) {
                if (entity.x < collider.x + collider.width &&
                    entity.x + entity.width > collider.x &&
                    entity.y < collider.y + collider.height &&
                    entity.height + entity.y > collider.y) {
                    if ((entity.collidesWith.filter(function (elem) { return elem === collider.collideGroup; }).length > 0)
                        && collider.collidesWith.filter(function (elem) { return elem === entity.collideGroup; }).length > 0) {
                        collider.destroy();
                    }
                }
            }
        });
    }
    exports.checkCollision = checkCollision;
});
//# sourceMappingURL=ICollidable.js.map