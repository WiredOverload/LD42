export enum CollideGroup {
    Ship,
    Bullet,
    Point,
    Shadow,
}

// export class AABB {
//     x: number;
//     y: number;
//     height: number;
//     width: number;
// }

export interface ICollidable {
    x: number;
    y: number;
    width: number;
    height: number;
    alive: boolean;
    collideGroup: CollideGroup;
    collidesWith: CollideGroup;
    // getAABB() : AABB;
    // destroy() : void;
}

export function isCollidable(obj: object) : obj is ICollidable {
    var collidableObj : ICollidable = <ICollidable>obj;
    
    return (collidableObj.x !== undefined
            && collidableObj.y !== undefined
            && collidableObj.width !== undefined
            && collidableObj.height !== undefined
            && collidableObj.alive !== undefined
            &&collidableObj.collideGroup !== undefined
            && collidableObj.collidesWith !== undefined);
            // etc.
}