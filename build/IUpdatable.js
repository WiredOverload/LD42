define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function isUpdatable(obj) {
        var updatableObj = obj;
        return (updatableObj.update !== undefined);
    }
    exports.isUpdatable = isUpdatable;
});
//# sourceMappingURL=IUpdatable.js.map