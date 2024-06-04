import {MoveDirection, Point, Shape} from "./types";
import GameConfig from "./GameConfig";
import {SquareGroup} from "./SquareGroup";
import {Square} from "./Square";

function isPoint(obj: any): obj is Point {
    return !(typeof obj.x == 'undefined' || typeof obj.y == 'undefined');

}

export class TetrisRule {
    static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {
        const targetSquarePoints: Point[] = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y,
            };
        });

        const isOut = targetSquarePoints.some(p => {
            return p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1;
        });

        const isInclude = targetSquarePoints.some(p =>
            exists.some(sq => sq.point.x == p.x && sq.point.y == p.y)
        );

        return !(isOut || isInclude);
    }

    static move(tetris: SquareGroup, targetPoint: Point, exists: Square[]): boolean;
    static move(tetris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean;
    static move(tetris: SquareGroup, targetPointOrDirection: Point | MoveDirection, exists: Square[]): boolean {
        if (isPoint(targetPointOrDirection)) {
            const result = TetrisRule.canIMove(tetris.shape, targetPointOrDirection, exists);
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

            return this.move(tetris, targetPoint!, exists);
        }
    }

    static moveDirectly(tetirs: SquareGroup, direction: MoveDirection, exists: Square[]) {
        while (this.move(tetirs, direction, exists)) {
        }
    }

    static rotate(tetris: SquareGroup, exists: Square[]): boolean {
        const newShape = tetris.afterRotateShape();
        if (this.canIMove(newShape, tetris.centerPoint, exists)) {
            tetris.rotate();
            return true;
        } else {
            return false;
        }
    }

    private static getLineSquare(exists: Square[], y: number) {
        return exists.filter(sq => sq.point.y == y);
    }

    static deleteSquares(exists: Square[]): number {
        const ys = exists.map(sq => sq.point.y);
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);

        let num = 0;
        for (let y = minY; y <= maxY; y++) {
            if (this.deleteLine(exists, y)) {
                num++;
            }
        }

        return num;
    }

    private static deleteLine(exists: Square[], y: number): boolean {
        const squares = this.getLineSquare(exists, y);
        if (squares.length == GameConfig.panelSize.width) {
            squares.map(sq => {
                sq.viewer?.remove()
                exists.filter(sq => sq.point.y < y).forEach(sq => {
                    sq.point = {
                        x: sq.point.x,
                        y: sq.point.y + 1,
                    };
                });
                const index = exists.indexOf(sq);
                exists.splice(index, 1);
            });
            return true;
        }

        return false;
    }
}
