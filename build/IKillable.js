define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function isAlive(obj) {
        var killableObj = obj;
        return (killableObj.alive !== undefined
            && killableObj.alive === true);
    }
    exports.isAlive = isAlive;
});
//# sourceMappingURL=IKillable.js.map