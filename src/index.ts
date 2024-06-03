import $ from 'jquery';
import {SquarePageViewer} from "./core/viewer/SquarePageViewer";
import {SquareGroup} from "./core/SquareGroup";
import {createTetris, SMirrorShape} from "./core/Tetris";

const tetris = createTetris({x: 3, y: 2});
tetris.squares.forEach(sq => {
    sq.viewer = new SquarePageViewer(sq, $('#root'));
});

$('#up').click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y - 1,
    };
});

$('#down').click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y + 1,
    };
});

$('#left').click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x - 1,
        y: tetris.centerPoint.y,
    };
});

$('#right').click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x + 1,
        y: tetris.centerPoint.y,
    };
});
