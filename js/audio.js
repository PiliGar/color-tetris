/*jshint esversion: 6 */
const backgroundMusic = new Audio("./music/tetris.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.1;

const blockCollisionMusic = new Audio("./music/block-collision.mp3");
blockCollisionMusic.volume = 1;

const compleateLineMusic = new Audio("./music/compleate-line.mp3");
compleateLineMusic.volume = 0.3;

const gameOverMusic = new Audio("./music/gameover.mp3");
gameOverMusic.volume = 0.3;

const winnerMusic = new Audio("./music/winner.mp3");
winnerMusic.volume = 0.3;
