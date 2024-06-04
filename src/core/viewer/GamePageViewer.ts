import $ from 'jquery';
import {IGameViewer} from "../types";
import {SquareGroup} from "../SquareGroup";
import {SquarePageViewer} from "./SquarePageViewer";

export class GamePageViewer implements IGameViewer {
    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, $('#next'));
        });
    }

    switch(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer!.remove();
            sq.viewer = new SquarePageViewer(sq, $('#panel'));
        })
    }

}
