import { _decorator, Animation, Collider2D, Node, Component, EventKeyboard, input, Input, KeyCode, Vec3, tween, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property(Node)
    public Fire: Node = null;

    private animation: Animation | null = null;

    public isMoving: boolean = false;
    private moveSpeed: number = 100;
    public isAttacking: boolean = false;
    private canJump: boolean = true;
    private isJumping: boolean = false;
    private jumpSpeed: number = 300;
    private jumpDuration: number = 0.5;
    private initialY: number = 0;
    private canInput: boolean = true;
    private canMove: boolean = true;

    protected start(): void {
        this.getComponent(Animation).play("idle");
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    protected onLoad(): void {
        this.animation = this.getComponent(Animation);
    }

    protected onKeyDown(event: EventKeyboard) {
        if (!this.canInput) {
            return;
        }

        switch (event.keyCode) {
            case KeyCode.KEY_A:
                if (!this.isAttacking) {
                    this.moveLeft();
                }
                this.node.scale = new Vec3(-1, 1, 0);
                this.isMoving = true;
                break;
            case KeyCode.KEY_D:
                if (!this.isAttacking) {
                    this.moveRight();
                }
                this.node.scale = new Vec3(1, 1, 0);
                this.isMoving = true;
                break;
            case KeyCode.KEY_W:
                if (this.node.position.y <= -180) {
                    this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 20)
                    this.getComponent(Animation).play("jumb");
                    setTimeout(() => {
                        this.node.getComponent(Animation).play("idle");
                    }, 1000);
                }
                // if(this.isMoving === true){
                //     this.node.getComponent(Animation).play("run");
                // }
                break;
            case KeyCode.SPACE:
                this.attack();
                if (this.Fire) {
                    this.Fire.active = true;
                    this.stopMoving();
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
            case KeyCode.KEY_W:
                // this.node.getComponent(Animation).play("run");
                break;
            case KeyCode.SPACE:
                this.stopAttack();
                if (this.Fire) {
                    this.Fire.active = false;
                    this.stopMoving();
                    this.canMove = true;
                }
                break;
        }
    }
    public takeDamage(): void {
        console.log('Player die');
        this.getComponent(Animation).play("idle");
    }

    public playerLight() {
        this.node.getComponent(Animation).play("playerlight");
    }

    protected moveLeft(): void {
        if (!this.isMoving && !this.isAttacking) {
            this.isMoving = true;
            this.node.getComponent(Animation).play("run");
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
            this.getComponent(Animation).play("idle");
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
        if (this.isMoving ===  true) {
            const direction = this.node.scale.x > 0 ? 1 : -1;
            this.node.translate(new Vec3(this.moveSpeed * direction * deltaTime, 0, 0));
        }
        if (this.Fire) {
            this.Fire.setPosition(this.node.getPosition());
        }
    }

}
