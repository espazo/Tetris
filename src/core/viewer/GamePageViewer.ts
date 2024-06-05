import $ from 'jquery';
import {GameStatus, IGameViewer} from "../types";
import {SquareGroup} from "../SquareGroup";
import {SquarePageViewer} from "./SquarePageViewer";
import {Game} from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";

export class GamePageViewer implements IGameViewer {
    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq, this.nextDom);
        });
    }

    switch(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer!.remove();
            sq.viewer = new SquarePageViewer(sq, this.panelDom);
        })
    }

    private nextDom = $('#next');
    private panelDom = $('#panel');
    private scoreDom = $('#score');
    private msgDom = $('#msg');

    init(game: Game): void {
        this.panelDom.css({
            width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
            height: GameConfig.panelSize.height * PageConfig.SquareSize.height,
        });

        this.nextDom.css({
            width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
            height: GameConfig.nextSize.height * PageConfig.SquareSize.height,
        });

        $(document).keydown((e) => {
            const keyCode = e.keyCode;
            switch (keyCode) {
                case 37:
                    game.controlLeft()
                    break;
                case 38:
                    game.controlRotate();
                    break;
                case 39:
                    game.controlRight();
                    break;
                case 40:
                    game.controlDown();
                    break;
                case 32:
                {
                    if (game.gameStatus == GameStatus.playing) {
                        game.pause();
                    } else {
                        game.start();
                    }
                }
                break;
            }
        });
    }

    showScore(score: number): void {
        this.scoreDom.html(score.toString());
    }

    onGameOver(): void {
        this.msgDom.css({
            display: 'flex',
        });
        this.msgDom.find('p').html('游戏结束');
    }

    onGamePause(): void {
        this.msgDom.css({
            display: 'flex',
        });
        this.msgDom.find('p').html('游戏暂停');
    }

    onGameStart(): void {
        this.msgDom.hide();
    }
}
