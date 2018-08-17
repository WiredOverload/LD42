export interface IRenderable {
    render() : void;
}

export function isRenderable(obj: object) : obj is IRenderable {
    var renderableObj : IRenderable = <IRenderable>obj;
    
    return (renderableObj.render !== undefined);
}