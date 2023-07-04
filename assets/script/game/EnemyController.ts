import { _decorator, Animation, Collider2D, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
     
    @property(Prefab)
    private blackPigPrefab : Prefab;

    private blackPig: Node[] = [];
    private enemyCount: number = 5; 

    protected onLoad(): void {
        this.black_Pig_Prefab();
    }
    
    protected black_Pig_Prefab() {
        for(let i = 0; i < this.enemyCount; i++){
            const enemy = instantiate(this.blackPigPrefab);
            enemy.setPosition(i *500, -217, 0);
            enemy.parent = this.node;
            this.blackPig.push(enemy);

            // const randomPosX = Math.random() * this.mapWidth - this.mapWidth / 2;
            enemy.getComponent(Collider2D).apply();
        }
    }
    
}
