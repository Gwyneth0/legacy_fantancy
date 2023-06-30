import { _decorator, Animation, Collider2D, Node, Component, EventKeyboard, input, Input, instantiate, KeyCode, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property(Prefab)
    private Prefab: Prefab;
    private animation: Animation | null = null;

    private isMoving: boolean = false;
    private moveSpeed: number = 100;
    private attackPlayer: Node = null;
    public isAttacking: boolean = false;

    protected start(): void {
        this.playAnimation("idle");
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected onLoad(): void {
        this.animation = this.getComponent(Animation);
        this.attackPrefab();
    }

    protected attackPrefab() {
        this.attackPlayer = instantiate(this.Prefab);
        this.attackPlayer.active = false;
        this.attackPlayer.getComponent(Collider2D).apply();
        this.attackPlayer.parent = this.node.parent;
    }

    protected onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.node.scale = new Vec3(-1, 1, 0);
                if (!this.isAttacking) {
                    this.moveLeft();
                }
                break;
            case KeyCode.KEY_D:
                this.node.scale = new Vec3(1, 1, 0);
                if (!this.isAttacking) {
                    this.moveRight();
                }
                break;
            case KeyCode.SPACE:
                if (!this.isMoving) {
                    this.attack();
                    if (this.attackPlayer) {
                        this.attackPlayer.active = true;
                    }
                }
                break;
        }
    }

    protected onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.stopMoving();
                break;
            case KeyCode.KEY_D:
                this.stopMoving();
                break;
            case KeyCode.SPACE:
                this.stopAttack();
                if (this.attackPlayer) {
                    this.attackPlayer.active = false;
                }
                break;
        }
    }

    public takeDamage(): void {
        console.log('Player die');
        this.playAnimation("die");
    }

    protected moveLeft(): void {
        if (!this.isMoving && !this.isAttacking) {
            this.isMoving = true;
            this.playAnimation("run");
        }
    }

    protected moveRight(): void {
        if (!this.isMoving && !this.isAttacking) {
            this.isMoving = true;
            this.playAnimation("run");
        }
    }

    protected stopMoving(): void {
        if (this.isMoving && !this.isAttacking) {
            this.isMoving = false;
            this.stopAnimation();
            this.playAnimation("idle");
        }
    }

    protected attack(): void {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.stopMoving();
            this.playAttackAnimation();
            setTimeout(() => {
                this.stopAttack();
            }, 5000);
        }
    }

    protected stopAttack(): void {
        if (this.isAttacking) {
            this.isAttacking = false;
            this.stopAnimation();
            this.playAnimation("idle");
        }
    }

    public playAttackAnimation(): void {
        if (this.animation) {
            const clip = this.animation.clips.find((clip) => clip.name === "attack");
            if (clip) {
                this.animation.play("attack");
            }
        }
    }

    protected stopAnimation(): void {
        if (this.animation) {
            this.animation.stop();
        }
    }

    protected update(deltaTime: number): void {
        if (this.isMoving) {
            const direction = this.node.scale.x > 0 ? 1 : -1;
            this.node.translate(new Vec3(this.moveSpeed * direction * deltaTime, 0, 0));
        }
        if (this.attackPlayer) {
            this.attackPlayer.setPosition(this.node.getPosition());
        }
    }

    public playAnimation(clipName: string): void {
        if (this.animation) {
            const clip = this.animation.clips.find((clip) => clip.name === clipName);
            if (clip) {
                this.animation.play(clipName);
            }
        }
    }
}
