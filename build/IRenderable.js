define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function isRenderable(obj) {
        var renderableObj = obj;
        return (renderableObj.render !== undefined);
    }
    exports.isRenderable = isRenderable;
});
//# sourceMappingURL=IRenderable.js.map