import { _decorator, Animation, Component, EventKeyboard, input, Input, KeyCode, Node, Vec3, tween, SystemEvent, EventMouse, systemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property(Animation)
    private animation: Animation | null = null;

    private isMovingLeft: boolean = false;
    private isMovingRight: boolean = false;
    private moveSpeed: number = 100;
    private isJumping: boolean = false;
    private isAttacking: boolean = false;
    private tempJumb: Vec3;

    protected start(): void {
        this.playAnimation("idle");
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
                this.isMovingLeft = true;
                if (!this.isJumping && !this.isAttacking) { 
                    this.playAnimation("run");
                }
                break;
            case KeyCode.KEY_D:
                this.node.scale = new Vec3(1, 1, 0);
                this.isMovingRight = true;
                if (!this.isJumping && !this.isAttacking) {
                    this.playAnimation("run");
                }
                break;
            case KeyCode.SPACE:
                if (!this.isAttacking) { 
                    this.playAnimation("attack");
                    this.isMovingLeft = false;
                    this.isMovingRight = false;
                }
                break;
            // case  KeyCode.KEY_W:
            //     this.playAnimation("jumb");
            //     this.tempJumb.x = 10;
            //     this.tempJumb.y = 10;
            //     this.node.setPosition(this.tempJumb);
        }
    }

    protected onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.node.scale = new Vec3(-1, 1, 0);
                this.isMovingLeft = false;
                if (!this.isJumping && !this.isAttacking) { 
                    this.stopAnimation();
                    this.playAnimation("idle");
                }
                break;
            case KeyCode.KEY_D:
                this.node.scale = new Vec3(1, 1, 0);
                this.isMovingRight = false;
                if (!this.isJumping && !this.isAttacking) { 
                    this.stopAnimation();
                    this.playAnimation("idle");
                }
                break;
            case KeyCode.SPACE:
                if (!this.isAttacking) { 
                    this.playAnimation("attack");
                    this.isMovingLeft = false;
                    this.isMovingRight = false;
                }
                break;
        }
    }
    

    protected update(deltaTime: number): void {
        if (this.isJumping || this.isAttacking) {
            return;
        }

        if (this.isMovingLeft) {
            this.node.translate(new Vec3(-this.moveSpeed * deltaTime, 0, 0));
        }
        if (this.isMovingRight) {
            this.node.translate(new Vec3(this.moveSpeed * deltaTime, 0, 0));
        }
    }

    protected playAnimation(clipName: string): void {
        if (this.animation) {
            const clip = this.animation.clips.find((clip) => clip.name === clipName);
            if (clip) {
                this.animation.play(clipName);
                if (clip.duration) {
                    this.isAttacking = true;
                    setInterval(() => {
                        this.isAttacking = false;
                    },0.1);
                } else {
                    this.isAttacking = false;
                    this.playAnimation("idle");
                }
            }
        }
    }
    

    protected stopAnimation(): void {
        if (this.animation) {
            this.animation.stop();
        }
    }
}
