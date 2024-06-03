import {Square} from "./Square";
import {Point, Shape} from "./types";

export class SquareGroup {
    private _squares: readonly Square[];

    public get squares() {
        return this._squares;
    }

    public get centerPoint() {
        return this._centerPoint;
    }

    public set centerPoint(value) {
        this._centerPoint = value;
        this.squares.forEach((square, index) => {
            square.point = {
                x: this._centerPoint.x + this._shape[index].x,
                y: this._centerPoint.y + this._shape[index].y,
            };
        });
    }

    constructor(
        private _shape: Shape,
        private _centerPoint: Point,
        private _color: string
    ) {
        const arr: Square[] = [];
        this._shape.forEach(p => {
            const sq = new Square();
            sq.color = this._color;
            sq.point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y,
            };
            arr.push(sq);
        });

        this._squares = arr;
    }
}