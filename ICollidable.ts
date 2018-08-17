export enum CollideGroup {
    Player,
    Bullet,
    Point,
    Shadow,
}

export interface ICollidable {
    collideGroup: CollideGroup;
    collidesWith: CollideGroup;
}