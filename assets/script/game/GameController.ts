import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact } from 'cc';
import { Player } from './Player';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property(Player)
    private player: Player;

    @property(Enemy)
    private enemy: Enemy;

    private enemyHitCount: number = 0;
    private isPlayerAttacking: boolean = false;

    protected onLoad(): void {
        this.contactEnemy();
    }

    protected start(): void {
        this.contactEnemy();
    }

    protected contactEnemy(): void {
        const playerCollider = this.player.getComponent(Collider2D);
        if (playerCollider) {
            playerCollider.on(Contact2DType.BEGIN_CONTACT, this.onPlayerContact, this);
        }
        const enemyCollider = this.enemy.getComponent(Collider2D);
        if (enemyCollider) {
            enemyCollider.on(Contact2DType.BEGIN_CONTACT, this.onEnemyContact, this);
        }
    }

    protected onPlayerContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        if (!this.isPlayerAttacking) {
            this.playerTakeDamage();
        }
    }

    protected onEnemyContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        if (this.isPlayerAttacking) {
            this.enemyTakeDamage();
        }
    }
    protected playerAttack(): void {
        if (!this.isPlayerAttacking) {
            this.isPlayerAttacking = true;
            this.enemyTakeDamage();
            console.log('Player is attacking the enemy');
        }
    }
    
    protected playerTakeDamage(): void {
        this.player.takeDamage();
    }

    protected enemyTakeDamage(): void {
        this.enemy.takeDamage();
        console.log('Enemy takes damage');
    }
    
}
