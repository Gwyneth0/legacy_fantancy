import { _decorator, Animation, Collider2D, Node, Component, EventKeyboard, input, Input, instantiate, KeyCode, Prefab, Vec3, animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property(Node)
    public Fire: Node = null;

    private animation: Animation | null = null;

    private isMoving: boolean = false;
    private moveSpeed: number = 100;
    public isAttacking: boolean = false;

    protected start(): void {
        this.getComponent(Animation).play("idle");
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected onLoad(): void {
        this.animation = this.getComponent(Animation);
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
                this.attack();
                if (this.Fire) {
                    this.Fire.active = true;
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
                if (this.Fire) {
                    this.Fire.active = false;
                }
                break;
        }
    }


    public takeDamage(): void {
        console.log('Player die');
        this.getComponent(Animation).play("idle");
    }

    protected moveLeft(): void {
        if (!this.isMoving && !this.isAttacking) {
            this.isMoving = true;
            this.getComponent(Animation).play("run");
        }
    }

    protected moveRight(): void {
        if (!this.isMoving && !this.isAttacking) {
            this.isMoving = true;
            this.getComponent(Animation).play("run");
        }
    }

    protected stopMoving(): void {
        if (this.isMoving && !this.isAttacking) {
            this.isMoving = false;
            this.stopAnimation();
            this.getComponent(Animation).play("run");
        }
    }

    protected attack(): void {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.stopMoving();
            this.getComponent(Animation).play("attack")
            setTimeout(() => {
                this.stopAttack();
            }, 5000);
        }
    }

    protected stopAttack(): void {
        if (this.isAttacking) {
            this.isAttacking = false;
            this.stopAnimation();
            this.getComponent(Animation).play("idle");
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
        if (this.Fire) {
            this.Fire.setPosition(this.node.getPosition());
        }
    }

}
