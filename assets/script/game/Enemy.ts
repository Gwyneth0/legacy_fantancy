import { _decorator, Component, Vec3, Animation, Collider2D, IPhysics2DContact, Contact2DType, Prefab,Node, instantiate, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    private moveDistance: number = 50;
    private moveSpeed: number = 20; 
    private initialPosition: Vec3 = new Vec3(); 

    protected start(): void {
        this.initialPosition = this.node.position;
        this.enemyMove();
    }

    protected enemyMove(): void {
        tween(this.node)
        .to(this.moveDistance / this.moveSpeed, { position: new Vec3(this.initialPosition.x + this.moveDistance, this.initialPosition.y, 0) })
        .call(() => {
            this.node.scale = new Vec3(-this.node.scale.x, 1, 1);
            tween(this.node)
                .to(this.moveDistance / this.moveSpeed, { position: new Vec3(this.initialPosition.x, this.initialPosition.y, 0) })
                .call(() => {
                    this.node.scale = new Vec3(-this.node.scale.x, 1, 1); 
                    this.enemyMove();
                })
                .start();
        })
        .start();
}
}
