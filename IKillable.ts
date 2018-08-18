export interface IKillable {
    alive: boolean;
}

export function isAlive(obj: object) : obj is IKillable {
    var killableObj : IKillable = <IKillable>obj;
    
    return (killableObj.alive !== undefined 
        && killableObj.alive === true);
}