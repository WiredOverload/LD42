export interface IRenderable {
    render(context: CanvasRenderingContext2D) : void;
}

export function isRenderable(obj: object) : obj is IRenderable {
    var renderableObj : IRenderable = <IRenderable>obj;
    
    return (renderableObj.render !== undefined);
}