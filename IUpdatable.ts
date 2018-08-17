export interface IUpdatable {
    update() : void;
}

export function isUpdatable(obj: object):obj is IUpdatable {
    var updatableObj : IUpdatable = <IUpdatable>obj;
    
    return (updatableObj.update !== undefined);
}
