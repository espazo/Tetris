import $ from 'jquery';
import {SquarePageViewer} from "./core/viewer/SquarePageViewer";
import {SquareGroup} from "./core/SquareGroup";

const group = new SquareGroup([
    {x: 0, y: -1},
    {x: -1, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 1},
], {x: 1, y: 1}, 'red');
group.squares.forEach(sq => {
    sq.viewer = new SquarePageViewer(sq, $('#root'));
});

$('#up').click(() => {
    group.centerPoint = {
        x: group.centerPoint.x,
        y: group.centerPoint.y - 1,
    };
});

$('#down').click(() => {
    group.centerPoint = {
        x: group.centerPoint.x,
        y: group.centerPoint.y + 1,
    };
});

$('#left').click(() => {
    group.centerPoint = {
        x: group.centerPoint.x - 1,
        y: group.centerPoint.y,
    };
});

$('#right').click(() => {
    group.centerPoint = {
        x: group.centerPoint.x + 1,
        y: group.centerPoint.y,
    };
});
