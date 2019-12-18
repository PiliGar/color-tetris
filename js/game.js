/*jshint esversion: 6 */
const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  framesCounter: 0,
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
    750
  ],

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
    [null, null, null, null, null, null, null, null, null, null]
  ],

  playerKeys: {
    LEFT_KEY: 37,
    RIGHT_KEY: 39,
    BUTTON_KEY: 40
  },

  stop: false,
  requestId: undefined,

  score: 0,
  lines: 0,
  level: 1,

  fps: 60,

  // STOP

  stopGame: function() {
    this.stop = true;
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  },

  // resumeGame: function() {
  //   this.stop = false;
  //   this.requestId = window.requestAnimationFrame(this.refresh.bind(this));
  // },

  // reset: function() {
  //   this.stopGame();
  //   this.start();
  // },

  // INIT

  init: function() {
    this.canvas = document.getElementById("tetris-board");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.getAttribute("width");
    this.height = this.canvas.getAttribute("height");
    this.start();
  },

  reset: function() {
    console.log("2 * reset");
    this.stopGame();
    this.background = new Background(this.ctx, this.width, this.height);
    this.drawNewBlock();
  },

  start: function() {
    this.reset();
    this.stop = false;
    this.timeVar = new Date();
    let past = 0;
    let delta = 0;
    function refresh(timestamp) {
      delta = timestamp - past;
      past = timestamp;
      this.framesCounter++;
      fps = 1000 / delta;
      this.clear();
      this.drawAll();

      //* * * level check
      if (this.level === 1) {
        if (this.framesCounter % 16 === 0) this.moveAll();
      } else if (this.level === 2) {
        if (this.framesCounter % 8 === 0) this.moveAll();
      } else if (this.level === 3) {
        if (this.framesCounter % 4 === 0) this.moveAll();
      }

      //* * * collision chek
      this.checkCollision();

      //if (this.framesCounter > 1000) this.framesCounter = 0;
      this.requestId = window.requestAnimationFrame(refresh.bind(this));
    }
    this.requestId = window.requestAnimationFrame(refresh.bind(this));
  },

  // RENDER

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  drawAll: function() {
    this.background.draw();
    this.drawAllBlocks();
    this.block.draw();
  },

  drawNewBlock: function() {
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

  drawAllBlocks: function() {
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

  moveAll: function() {
    const gridX = this.colX.indexOf(this.block.x);
    const gridY = this.rowY.indexOf(this.block.y);
    if (this.block.y < 700 && this.board[gridY + 1][gridX] === null) {
      this.block.fallDown();
    } else {
      this.block.type = false;
      this.board[gridY][gridX] = this.block; // * saves the new block into the grid box
      this.drawNewBlock();
    }
  },

  // COLLISIONS

  checkCollision: function() {
    this.isLineCollision();
    if (this.isTopCollision()) this.gameOver();
  },

  isTopCollision: function() {
    //console.log(" * TOP COLL");
    for (let i = 0; i < this.board[0].length; i++) {
      if (this.board[0][i] != null) {
        return true;
      }
    }
  },

  isLineCollision: function() {
    //console.log(" * LINE COLL");
    // * * * checks if line is compleate
    for (let row = 0; row < this.board.length; row++) {
      const gridArr = this.board;
      const rowArr = this.board[row];
      const areFull = e => e != null;
      if (rowArr.every(areFull) && this.areSameColor(rowArr)) {
        console.log("- - -  L I N E");
        console.log(this.board.indexOf(this.board[row]));
        this.countLines();
        this.removecompletedLines(gridArr, rowArr);
        this.moveAllBlockPos(gridArr);
      }
    }
  },

  areSameColor: function(data) {
    const firstColor = data[0].color;
    let sameColors = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].color != firstColor) {
        sameColors = false;
      }
    }
    return sameColors;
  },

  removecompletedLines: function(arr, line) {
    let lineToRemove = arr.indexOf(line);
    arr.splice(lineToRemove, 1);
    arr.unshift([null, null, null, null, null, null, null, null, null, null]);
    console.log("Guay");
  },

  moveAllBlockPos: function(arr) {
    // * * * move all block when line is completed
    for (let row = 0; row < arr.length; row++) {
      for (let col = 0; col < arr[row].length; col++) {
        if (arr[row][col] != null) {
          console.log("Hey");
          console.log(arr[row][col]);
          arr[row][col].y += 50;
        }
      }
    }
  },

  // SCORE

  countLines: function() {
    this.lines = this.lines += 1;
    this.score = this.score += 100;
    this.checkLevel();
    this.upDateScore();
  },

  checkLevel: function() {
    if (this.score >= 300) {
      this.level = 2;
    } else if (this.score >= 600) {
      this.level = 3;
    }
  },

  upDateScore: function() {
    document.getElementById("lines").innerHTML = this.lines;
    document.getElementById("score").innerHTML = this.score;
    document.getElementById("level").innerHTML = this.level;
  },

  // GAME OVER

  gameOver: function() {
    this.totalTiempo = (new Date() - this.timeVar) / 1000;
    this.ctx.fillRect(0, 0, 500, 750);
    this.ctx.fillStyle = "#151515";
    this.ctx.save();
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "70px Oswald";
    this.ctx.fillText("GAME", 200, 150);
    this.ctx.fillText("OVER", 200, 250);
    this.ctx.restore();
    console.log("G A M E  O V E R");
    window.cancelAnimationFrame(this.refresh);
    //this.stopGame();
  }
};
