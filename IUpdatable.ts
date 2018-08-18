export interface IUpdatable {
    // temp param here till we resolve Point update method
    update(params: any) : void;
}

export function isUpdatable(obj: object):obj is IUpdatable {
    var updatableObj : IUpdatable = <IUpdatable>obj;
    
    return (updatableObj.update !== undefined);
}
