import { _decorator, math, Vec3 } from 'cc';
import { Player } from '../game/Player';
const { ccclass, property } = _decorator;

enum GAME_EVENT {
    RESTART = 'restart',
    ADDSCORE = 'addscore',
    DYING = 'dying'
}

enum GAME_STATE {
    START = 1,
    PLAYING = 2,
    PAUSE = 3,
    OVER 
}

enum MOVE_STATE {
    MOVE_LEFT = 1,
    MOVE_RIGHT = 2
}

enum OBSTACLES {
    LEFT,
    RIGHT,
    TOP,
    CENTER_RIGHT,
    CENTER_LEFT
}