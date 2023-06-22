import { _decorator, Animation, Component, Event, EventKeyboard, Input, input, KeyCode, macro, Node, SystemEvent, tween, Vec2, Vec3 } from 'cc';
import { Constants } from '../data/Contants';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private Animation: Animation | null = null;

    private mapAnim: Map<KeyCode, string> = new Map();

    private key: KeyCode;

    protected start(): void {
        input.on(Input.EventType.KEY_DOWN, this.gamePlay, this);
        input.on(Input.EventType.KEY_PRESSING, this.gamePlay, this);
       
    }

    protected onLoad(): void {
        this.Animation = this.getComponent(Animation);
    }

    protected gamePlay(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.node.scale = new Vec3(-1, 1, 0);
                this.Animation.play("run");
                this.leftStep(1);
                break;
            case KeyCode.KEY_D:
                this.node.scale = new Vec3(1, 1, 0);
                this.Animation.play("run");
                this.rightStep(1);
                break;
            case KeyCode.SPACE:
                this.Animation.play("attack");
                break;
            case KeyCode.KEY_W:
                this.Animation.play("jumb");
                break;
        }
    }

    protected rightStep(step: number): void {
        if (Constants.STARTMOVE) {
            return;
        }
        Constants.STARTMOVE = true;
        Constants.MOVESTEP = step;
        Constants.CURMOVETIME = 0;
        Constants.CURMOVESPEED = Constants.MOVESTEP * Constants.RIGHT_BLOCK_SIZE / Constants.MOVESTEP;
        this.node.getPosition(Constants.CURPOS);
        tween(this.node).to(2, { position: Vec3.add(Constants.TARGETPOS, Constants.CURPOS, new Vec3(Constants.MOVESTEP * Constants.RIGHT_BLOCK_SIZE, 0, 0)) })
        // Vec3.add(Constants.TARGETPOS, Constants.CURPOS, new Vec3(Constants.MOVESTEP * Constants.RIGHT_BLOCK_SIZE, 0, 0));
    }

    protected leftStep(step: number): void {
        if (Constants.STARTMOVE) {
            return;
        }
        Constants.STARTMOVE = true;
        Constants.MOVESTEP = step;
        Constants.CURMOVETIME = 0;
        Constants.CURMOVESPEED = Constants.MOVESTEP * Constants.LEFT_BLOCK_SIZE / Constants.MOVESTEP;
        this.node.getPosition(Constants.CURPOS);
        tween(this.node).to(2, { position: Vec3.add(Constants.TARGETPOS, Constants.CURPOS, new Vec3(Constants.MOVESTEP * Constants.LEFT_BLOCK_SIZE, 0, 0)) })
        // Vec3.add(Constants.TARGETPOS, Constants.CURPOS, new Vec3(Constants.MOVESTEP * Constants.LEFT_BLOCK_SIZE, 0, 0));
    }

    protected update(deltaTime: number): void {
        if (Constants.STARTMOVE) {
            Constants.CURMOVETIME += deltaTime;
            if (Constants.CURMOVETIME > Constants.MOVETIME) {
                this.node.setPosition(Constants.TARGETPOS);
                Constants.STARTMOVE = false;
            } else {
                this.node.getPosition(Constants.CURPOS);
                Constants.DELTAPOS.x = Constants.CURMOVESPEED * deltaTime;
                Vec3.add(Constants.CURPOS, Constants.CURPOS, Constants.DELTAPOS);
                this.node.setPosition(Constants.CURPOS);
            }
        }
    }


}

