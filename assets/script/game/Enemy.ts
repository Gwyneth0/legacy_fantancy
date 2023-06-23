import { _decorator, Component, Vec3, Animation, v2, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    private moveSpeed: number = 0.8;
    private boundsSize: number = 100;
    private transition: number = 0;
    private direction: number = 1;
    private animation: Animation | null = null;

    protected start(): void {
        this.animation = this.getComponent(Animation);
    }

    protected update(deltaTime: number): void {
        this.transition += deltaTime * this.moveSpeed * this.direction;

        const tilePosition = new Vec3(
            Math.sin(this.transition) * this.boundsSize,
            this.node.position.y,
            this.node.position.z
        );
        this.node.setPosition(tilePosition);

        console.log(this.node.position.x);

        if (this.node.position.x >= 93) {
            this.node.setScale(1,1,0);
        }
        if (this.node.position.x <= -97){
            this.node.setScale(-1,1,0);
        }
    }
}
