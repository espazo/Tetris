import {IViewer, Point} from "./types";

export class Square {
    private _point: Point = {
        x: 0,
        y: 0,
    };

    private _color: string = 'red';

    private _viewer?: IViewer;

    public get viewer() {
        return this._viewer;
    }

    public set viewer(val) {
        this._viewer = val;
        if (this.viewer) {
            this.viewer.show();
        }
    }

    public get point() {
        return this._point;
    }

    public set point(val) {
        this._point = val;
        // finish display
        if (this.viewer) {
            this.viewer.show();
        }
    }

    public get color() {
        return this._color;
    }

    public set color(value) {
        this._color = value;
    }
}
