import { _decorator, Animation, Collider2D, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
     
    @property(Prefab)
    private blackPigPrefab : Prefab;
    private blackPig: Node = null;

    protected onLoad(): void {
        this.black_Pig_Prefab();
    }

    protected black_Pig_Prefab() {
        this.blackPig = instantiate(this.blackPigPrefab);
        this.blackPig.active = true;
        this.blackPig.getComponent(Collider2D).apply();
        this.blackPig.parent = this.node;
    }
}

