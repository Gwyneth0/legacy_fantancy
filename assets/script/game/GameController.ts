import { _decorator, Collider2D, Component, Animation, Contact2DType, IPhysics2DContact, Node, Prefab } from 'cc';
import { Player } from './Player';
import { EnemyController } from './EnemyController';
import { Enemy } from './Enemy';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property(Player)
    private player: Player;

    @property(EnemyController)
    private enemyCtrl: EnemyController;

    private isOnGround: boolean = false;
    private hitCount: number = 0;
    private hitPlayer: number = 0;

    protected onLoad(): void {
        this.contactEnemy();
    }

    protected update(dt: number): void {
    }

    protected contactEnemy(): void {
        const playerCollider = this.player.getComponent(Collider2D);
        if (playerCollider) {
            playerCollider.on(Contact2DType.BEGIN_CONTACT, this.onPlayerContact, this);
        }
        if (this.player.Fire) {
            const fireCollider = this.player.Fire.getComponent(Collider2D);
            if (fireCollider) {
                fireCollider.on(Contact2DType.BEGIN_CONTACT, this.onFireContact, this);
            }
        }
    }

    protected onPlayerContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        if (otherCollider.tag ===2) {
            this.hitPlayer++;
            this.player.playerLight();
            if (this.hitPlayer === 3) {
                this.hitPlayer = 0;
                console.log("Player Die");
            }
            this.scheduleOnce(()=>{
                this.player.getComponent(Animation).play("idle");
            },0.5)
        }
            if(this.player.isMoving){
                this.player.getComponent(Animation).play("run");
            }
    }


    protected onFireContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        if (otherCollider.tag === 1) {
            this.hitCount++;
            console.log("Fire damage");
            if (this.hitCount === 3) {
                this.hitCount = 0;
                console.log("Enemy Die");
                otherCollider.node.active = false;
            }
        }
    }
}
