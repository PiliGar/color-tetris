/*jshint esversion: 6 */
const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  framesCounter: 0,
  past: 0,
  delta: 0,
  squareSize: 50,
  colX: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450],
  rowY: [
    0,
    50,
    100,
    150,
    200,
    250,
    300,
    350,
    400,
    450,
    500,
    550,
    600,
    650,
    700,
    750,
  ],

  removedLineY: undefined,

  board: [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ],

  playerKeys: {
    LEFT_KEY: 37,
    RIGHT_KEY: 39,
    BUTTON_KEY: 40,
    SPACE: 32,
  },

  playAnimation: true,
  requestId: undefined,

  score: 0,
  lines: 0,
  level: 1,

  pauseButton: document.getElementById("pause-btn"),
  startButton: document.getElementById("start-btn"),
  exitButton: document.getElementById("exit-btn"),

  fps: 60,

  // INIT

  init: function () {
    this.canvas = document.getElementById("tetris-board");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.getAttribute("width");
    this.height = this.canvas.getAttribute("height");
    this.start();
  },

  reset: function () {
    this.background = new Background(this.ctx, this.width, this.height);
    this.drawNewBlock();
  },

  start: function () {
    this.reset();
    this.past = 0;
    this.delta = 0;
    this.requestId = window.requestAnimationFrame(this.refresh.bind(this));
    console.log("run");
  },

  refresh: function (timestamp) {
    if (this.playAnimation) {
      this.delta = timestamp - this.past;
      this.past = timestamp;
      this.framesCounter++;
      fps = 1000 / this.delta;
      this.clear();
      this.drawAll();
      console.log("running");

      //* * * level check
      if (this.level === 1) {
        if (this.framesCounter % 14 === 0) this.moveAll();
      } else if (this.level === 2) {
        if (this.framesCounter % 10 === 0) this.moveAll();
      } else if (this.level === 3) {
        if (this.framesCounter % 8 === 0) this.moveAll();
      }

      //* * * gameover check
      this.checkCollision();

      //* * * winner check
      if (this.score === 900) {
        console.log("WIN");
        this.winner();
      }
      //console.log(fps);
      if (this.framesCounter > 1000) this.framesCounter = 0;
      this.requestId = window.requestAnimationFrame(this.refresh.bind(this));
    }
  },

  // RENDER

  clear: function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillRect(0, 0, 500, 750);
  },

  drawAll: function () {
    this.background.draw();
    this.drawAllBlocks();
    this.block.draw();
  },

  drawNewBlock: function () {
    // * * * draw new blocks
    const initX = this.colX[Math.floor(Math.random() * this.colX.length)];
    //const initX = 50;
    const initY = 0;
    this.block = new Block(
      this.ctx,
      this.squareSize,
      initX,
      initY,
      this.playerKeys,
      this.colX,
      this.rowY,
      this.board
    );
  },

  drawAllBlocks: function () {
    // * * * go over the rows and cols to draw every block saved
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] != null) {
          this.board[row][col].draw();
        }
      }
    }
  },

  // MOVE

  moveAll: function () {
    const gridX = this.colX.indexOf(this.block.x);
    const gridY = this.rowY.indexOf(this.block.y);
    if (this.block.y < 700 && this.board[gridY + 1][gridX] === null) {
      this.block.fallDown();
    } else {
      this.block.type = false;
      this.board[gridY][gridX] = this.block; // * saves the new block into the grid box
      blockCollisionMusic.play();
      this.drawNewBlock();
    }
  },

  // COLLISIONS

  checkCollision: function () {
    this.isLineCollision();

    if (this.isTopCollision()) this.gameOver();
  },

  isTopCollision: function () {
    // console.log("Top COL");
    for (let i = 0; i < this.board[0].length; i++) {
      if (this.board[0][i] != null) {
        return true;
      }
    }
  },

  isLineCollision: function () {
    // * * * checks if line is compleate
    for (let row = 0; row < this.board.length; row++) {
      const gridArr = this.board;
      const rowArr = this.board[row];
      const areFull = (e) => e != null;
      if (rowArr.every(areFull) && this.areSameColor(rowArr)) {
        // console.log("Line COL");
        compleateLineMusic.play();
        this.countLines();
        this.removecompletedLines(gridArr, rowArr);
        this.moveAllBlockPos(gridArr);
      }
    }
  },

  areSameColor: function (data) {
    const firstColor = data[0].color;
    let sameColors = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].color != firstColor) {
        sameColors = false;
      }
    }
    return sameColors;
  },

  removecompletedLines: function (arr, line) {
    let lineToRemove = arr.indexOf(line);
    // console.log("Index line" + arr.indexOf(line));
    this.removedLineY = this.rowY[lineToRemove];
    // console.log(this.removedLineY);
    arr.splice(lineToRemove, 1);
    arr.unshift([null, null, null, null, null, null, null, null, null, null]);
    console.log("Add line");
  },

  moveAllBlockPos: function (arr) {
    // * * * move all block when line is completed
    for (let row = 0; row < arr.length; row++) {
      for (let col = 0; col < arr[row].length; col++) {
        if (
          arr[row][col] != null &&
          arr[row][col].type === false &&
          arr[row][col].y < this.removedLineY
        ) {
          arr[row][col].y += 50;
        }
      }
    }
  },

  // SCORE

  countLines: function () {
    this.lines = this.lines += 1;
    this.score = this.score += 300;

    this.upDateScore();
    console.log("update score");
    this.checkLevel();
    console.log("check level");
    this.upDateLevel();
    console.log("update level");
  },

  checkLevel: function () {
    if (this.score >= 300 && this.score < 600) {
      this.level = 2;
      console.log("LEVEL 2");
    } else if (this.score >= 600 && this.score < 900) {
      this.level = 3;
      console.log("LEVEL 3");
    }
  },

  upDateScore: function () {
    document.getElementById("lines").innerHTML = this.lines;
    document.getElementById("score").innerHTML = this.score;
  },

  upDateLevel: function () {
    document.getElementById("level").innerHTML = this.level;
  },

  // GAME OVER / WIN

  gameOver: function () {
    this.stop();
    backgroundMusic.pause();
    gameOverMusic.play();
    document.getElementById("pause-btn").style.display = "none";
    this.ctx.fillRect(0, 0, 500, 750);
    this.ctx.fillStyle = "#151515";
    this.ctx.save();
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "100px Oswald";
    this.ctx.fillText("GAME", 140, 350);
    this.ctx.fillText("OVER", 150, 450);
    this.ctx.restore();
  },

  winner: function () {
    this.stop();
    backgroundMusic.pause();
    winnerMusic.play();
    document.getElementById("pause-btn").style.display = "none";
    this.flash();
    this.ctx.fillRect(0, 0, 500, 750);
    this.ctx.fillStyle = "#151515";
    this.ctx.save();
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "100px Oswald";
    this.ctx.fillText("YOU", 154, 350);
    this.ctx.fillText("WIN!", 150, 450);
    this.ctx.restore();
  },

  flash: function () {
    document.getElementById("lines").classList.add("flash");
    document.getElementById("score").classList.add("flash");
    document.getElementById("level").classList.add("flash");
  },

  // BUTTONS

  handleButtons: function () {
    this.pauseButton.classList.toggle("stop");
    this.pauseButton.innerHTML = this.pauseButton.classList.contains("stop")
      ? "PAUSE"
      : "CONTINUE";
  },

  pause: function () {
    this.handleButtons();
    backgroundMusic.pause();
    this.pauseButton.classList.add("btn-animated");
    this.playAnimation = false;
    console.log("PAUSE");
  },

  continue: function () {
    this.handleButtons();
    backgroundMusic.play();
    this.pauseButton.classList.remove("btn-animated");
    this.playAnimation = true;
    this.refresh();
    console.log("PLAY");
  },
  stop: function () {
    this.clear();
    this.playAnimation = false;
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
      console.log("STOP");
    }
  },
};
