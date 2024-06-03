import {Square} from "./Square";
import {Point, Shape} from "./types";

export class SquareGroup {
    private _squares: readonly Square[];

    public get shape() {
        return this._shape;
    }

    public get squares() {
        return this._squares;
    }

    public get centerPoint() {
        return this._centerPoint;
    }

    public set centerPoint(value) {
        this._centerPoint = value;
        this.setSquarePoints();
    }

    private setSquarePoints() {
        this._shape.forEach((p, i) => {
            this._squares[i].point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y,
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
            arr.push(sq);
        });

        this._squares = arr;

        this.setSquarePoints();
    }

    protected isClock = true;

    afterRotateShape(): Shape {
        if (this.isClock) {
            return this._shape.map(p => {
                return {
                    x: -p.y,
                    y: p.x,
                };
            });
        } else {
            return this._shape.map(p => {
                return {
                    x: p.y,
                    y: -p.x,
                };
            });
        }
    }

    rotate() {
        this._shape = this.afterRotateShape();
        this.setSquarePoints();
    }
}