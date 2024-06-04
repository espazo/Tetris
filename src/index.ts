import $ from 'jquery';
import {Game} from "./core/Game";
import {GamePageViewer} from "./core/viewer/GamePageViewer";

const g = new Game(new GamePageViewer());

$('#btnStart').click(() => {
    g.start();
});

$('#btnPause').click(() => {
    g.pause();
});

$('#btnLeft').click(() => {
    g.controlLeft();
});

$('#btnRight').click(() => {
    g.controlRight();
});

$('#btnDown').click(() => {
    g.controlDown();
});

$('#btnRotate').click(() => {
    g.controlRotate();
});

