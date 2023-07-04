import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Prefab } from 'cc';
import { Player } from './Player';
import { EnemyController } from './EnemyController';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property(Player)
    private player: Player;

    @property(EnemyController)
    private EnemyCtrl: EnemyController;

    private hitCount: number = 0;

    protected onLoad(): void {
        this.contactEnemy();
    }

    protected update(dt: number): void {
        console.log(this.hitCount)
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
        this.hitCount++;
        if (otherCollider.tag === 1) {
            if (this.hitCount === 3) {
                this.hitCount = 0;
                console.log("Enemy Die");
                otherCollider.node.active = false;
            }
        }
        console.log("player dame");
        this.player.takeDamage();
    }

    protected onFireContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        this.scheduleOnce(function(){
            this.hitCount++;
            if (otherCollider.tag === 1) {
                console.log("Fire dame");
                if (this.hitCount === 3) {
                    this.hitCount = 0;
                    console.log("Enemy Die");
                    otherCollider.node.active = false;
                }
            }
        })
    }
}
