import {GameStatus, IGameViewer, MoveDirection} from "./types";
import {SquareGroup} from "./SquareGroup";
import {createTetris} from "./Tetris";
import {TetrisRule} from "./TetrisRule";
import GameConfig from "./GameConfig";
import {Square} from "./Square";

export class Game {
    private _gameStatus: GameStatus = GameStatus.init;
    private _curTetris?: SquareGroup;
    private _nextTetris: SquareGroup;
    private _timer?: number;
    private _during: number = 1000;
    private _exists: Square[] = [];
    private _score: number = 0;

    constructor(private _viewer: IGameViewer) {
        this._nextTetris = createTetris({x: 0, y: 0});
        this.createNext();
    }

    private createNext() {
        this._nextTetris = createTetris({x: 0, y: 0});
        this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris);
        this._viewer.showNext(this._nextTetris);
    }

    private init() {
        this._exists.forEach(sq => sq.viewer?.remove());
        this._exists = [];
        this.createNext();
        this._curTetris = undefined;
        this._score = 0;
    }

    start() {
        if (this._gameStatus == GameStatus.playing) {
            return;
        }
        if (this._gameStatus == GameStatus.over) {
            this.init();
        }
        this._gameStatus = GameStatus.playing;
        if (!this._curTetris) {
            this.switchTetris();
        }
        this.autoDrop();
    }

    pause() {
        if (this._gameStatus == GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
        }
    }

    controlLeft() {
        if (this._curTetris && this._gameStatus == GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirection.left, this._exists);
        }
    }

    controlRight() {
        if (this._curTetris && this._gameStatus == GameStatus.playing) {
            TetrisRule.move(this._curTetris, MoveDirection.right, this._exists);
        }
    }

    controlDown() {
        if (this._curTetris && this._gameStatus == GameStatus.playing) {
            TetrisRule.moveDirectly(this._curTetris, MoveDirection.down, this._exists);
            this.hitBottom();
        }
    }

    controlRotate() {
        if (this._curTetris && this._gameStatus == GameStatus.playing) {
            TetrisRule.rotate(this._curTetris, this._exists);
        }
    }

    private autoDrop() {
        if (this._timer || this._gameStatus != GameStatus.playing) {
            return;
        }
        this._timer = setInterval(() => {
            if (this._curTetris) {
                const isHitBottom = !TetrisRule.move(this._curTetris!, MoveDirection.down, this._exists);
                if (isHitBottom) {
                    this.hitBottom();
                }
            }
        }, this._during) as unknown as number;
    }

    private switchTetris() {
        this._curTetris = this._nextTetris;
        this._curTetris.squares.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        });
        this.resetCenterPoint(GameConfig.panelSize.width, this._curTetris);

        const isGameOver = !TetrisRule.canIMove(this._curTetris.shape, this._curTetris.centerPoint, this._exists);
        if (isGameOver) {
            this._gameStatus = GameStatus.over;
            clearInterval(this._timer);
            this._timer = undefined;
            return;
        }

        this.createNext();
        this._viewer.switch(this._curTetris);
    }

    private resetCenterPoint(width: number, tetris: SquareGroup) {
        const x = Math.ceil(width / 2) - 1;
        const y = 0;
        tetris.centerPoint = {x, y};
        while (tetris.squares.some(it => it.point.y < 0)) {
            tetris.centerPoint = {
                x: tetris.centerPoint.x,
                y: tetris.centerPoint.y + 1,
            }
        }
    }

    private hitBottom() {
        this._exists.push(...this._curTetris!.squares);
        const num = TetrisRule.deleteSquares(this._exists);
        this.addScore(num);
        this.switchTetris();
    }

    private addScore(lineNum: number) {
        if (lineNum == 0) {
            return;
        } else if (lineNum == 1) {
            this._score += 10;
        } else if (lineNum == 2) {
            this._score += 25;
        } else if (lineNum == 3) {
            this._score += 50;
        } else {
            this._score += 100;
        }
    }
}
