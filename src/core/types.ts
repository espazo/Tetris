import {SquareGroup} from "./SquareGroup";
import {Game} from "./Game";

export interface Point {
    readonly x: number,
    readonly y: number,
}

export interface IViewer {
    show(): void,

    remove(): void,
}

export type Shape = Point[];

export enum MoveDirection {
    left,
    right,
    down,
}

export enum GameStatus {
    init,
    playing,
    pause,
    over,
}

export interface IGameViewer {
    showNext(tetris: SquareGroup): void;

    switch(tetris: SquareGroup): void;

    init(game: Game): void;

    showScore(score: number): void;

    onGamePause(): void;

    onGameStart(): void;

    onGameOver(): void;
}
