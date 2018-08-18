export enum CollideGroup {
    Player,
    Bullet,
    Point,
    Shadow,
}

export interface ICollidable {
    x: number;
    y: number;
    width: number;
    height: number;
    collideGroup: CollideGroup;
    collidesWith: CollideGroup[];
    destroy() : void;
}

export function isCollidable(obj: object) : obj is ICollidable {
    var collidableObj : ICollidable = <ICollidable>obj;
    
    return (collidableObj.x !== undefined
            && collidableObj.y !== undefined
            && collidableObj.width !== undefined
            && collidableObj.height !== undefined
            &&collidableObj.collideGroup !== undefined
            && collidableObj.collidesWith !== undefined
            && collidableObj.destroy !== undefined);
            // etc.
}

export function checkCollision(collider: ICollidable, entities: object[]) : void {
    entities.forEach(entity => {
        if (isCollidable(entity)) {
            if (entity.x < collider.x + collider.width &&
                entity.x + entity.width > collider.x &&
                entity.y < collider.y + collider.height &&
                entity.height + entity.y > collider.y)
            {
                if ((entity.collidesWith.filter(elem => elem === collider.collideGroup).length > 0) 
                    && collider.collidesWith.filter(elem => elem === entity.collideGroup).length > 0)
                {
                    collider.destroy();
                }
            }
        }
    });
}