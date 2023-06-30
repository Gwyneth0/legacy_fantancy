import { _decorator, Component, misc, Node, Prefab } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('Camera')
export class Camera extends Component {

    @property(Player)
    private Player: Player;

    update(deltaTime: number) {
        let targerPos = this.Player.node.getPosition();
        targerPos.y = misc.clampf(targerPos.y, 0, 1150);
        targerPos.x = misc.clampf(targerPos.x, 0, 5669);

        let curPos = this.node.getPosition();
        curPos.lerp(targerPos, 0.2);
        this.node.setPosition(curPos);
    }
}

