import $ from 'jquery';
import {SquarePageViewer} from "./core/viewer/SquarePageViewer";
import {createTetris} from "./core/Tetris";
import {TetrisRule} from "./core/TetrisRule";
import {MoveDirection} from "./core/types";

const tetris = createTetris({x: 3, y: 2});
tetris.squares.forEach(sq => {
    sq.viewer = new SquarePageViewer(sq, $('#root'));
});

$('#up').click(() => {
    TetrisRule.move(tetris, {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y - 1,
    });
});

$('#down').click(() => {
    TetrisRule.move(tetris, MoveDirection.down);
});

$('#left').click(() => {
    TetrisRule.move(tetris, MoveDirection.left);
});

$('#right').click(() => {
    TetrisRule.move(tetris, MoveDirection.right)
});

$('#rotate').click(() => {
    TetrisRule.rotate(tetris);
});
