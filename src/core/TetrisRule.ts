import {MoveDirection, Point, Shape} from "./types";
import GameConfig from "./GameConfig";
import {SquareGroup} from "./SquareGroup";

function isPoint(obj: any): obj is Point {
    return !(typeof obj.x == 'undefined' || typeof obj.y == 'undefined');

}

export class TetrisRule {
    static canIMove(shape: Shape, targetPoint: Point): boolean {
        const targetSquarePoints: Point[] = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y,
            };
        });

        return !targetSquarePoints.some(p => {
            return p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1;
        });
    }

    static move(tetris: SquareGroup, targetPoint: Point): boolean;
    static move(tetris: SquareGroup, direction: MoveDirection): boolean;
    static move(tetris: SquareGroup, targetPointOrDirection: Point | MoveDirection): boolean {
        if (isPoint(targetPointOrDirection)) {
            const result = TetrisRule.canIMove(tetris.shape, targetPointOrDirection);
            if (result) {
                tetris.centerPoint = targetPointOrDirection;
            }

            return result;
        } else {
            const direction = targetPointOrDirection;
            let targetPoint;
            if (direction == MoveDirection.down) {
                targetPoint = {
                    x: tetris.centerPoint.x,
                    y: tetris.centerPoint.y + 1,
                };
            } else if (direction == MoveDirection.left) {
                targetPoint = {
                    x: tetris.centerPoint.x - 1,
                    y: tetris.centerPoint.y,
                };
            } else if (direction == MoveDirection.right) {
                targetPoint = {
                    x: tetris.centerPoint.x + 1,
                    y: tetris.centerPoint.y,
                };
            }

            return this.move(tetris, targetPoint!);
        }
    }

    static moveDirectly(tetirs: SquareGroup, direction: MoveDirection) {
        while (this.move(tetirs, direction)) {
        }
    }

    static rotate(tetris: SquareGroup): boolean {
        const newShape = tetris.afterRotateShape();
        if (this.canIMove(newShape, tetris.centerPoint)) {
            tetris.rotate();
            return true;
        } else {
            return false;
        }
    }
}
