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
    // x: number;
    // y: number;
    // width: number;
    // height: number;
    // isAlive: boolean;
    collideGroup: CollideGroup;
    collidesWith: CollideGroup;
    // getAABB() : AABB;
    // destroy() : void;
}

export function isCollidable(obj: object) : obj is ICollidable {
    var collidableObj : ICollidable = <ICollidable>obj;
    
    return (collidableObj.collideGroup !== undefined
            && collidableObj.collidesWith !== undefined);
            // etc.
}