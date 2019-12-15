/*jshint esversion: 6 */
const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  framesCounter: 0,
  squareSize: 50,

  colX: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
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
    TOP_KEY: 38,
    RIGHT_KEY: 39,
    BUTTON_KEY: 40
  },

  score: 0,
  fps: 60,

  init: function() {
    this.canvas = document.getElementById("tetris-board");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.getAttribute("width");
    this.height = this.canvas.getAttribute("height");
    this.start();
  },

  start: function() {
    this.reset();
    let past = 0;
    let delta = 0;
    function refresh(timestamp) {
      delta = timestamp - past;
      past = timestamp;
      this.framesCounter++;
      // let fps = 1000 / delta;
      this.clear();
      this.drawAll();

      if (this.framesCounter % 20 === 0) this.moveAll();
      if (this.framesCounter > 1000) this.framesCounter = 0;
      window.requestAnimationFrame(refresh.bind(this));
      //console.log(fps);
    }
    window.requestAnimationFrame(refresh.bind(this));
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.drawNewBlock();
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  drawAll: function() {
    this.background.draw();
    this.block.draw();
  },

  drawNewBlock: function() {
    const initX = this.colX[Math.floor(Math.random() * this.colX.length)];
    const initY = 0;
    this.block = new Block(this.ctx, this.squareSize, initX, initY, this.board);
  },

  moveAll: function() {
    //this.block.setListeners();
    if (this.block.y < 700) {
      this.block.moveDown();
      // this.grid[this.gridX][this.initY] = 1;
      // console.log(this.grid);
      // this.y = 700;
    } else {
      const gridX = this.colX.indexOf(this.block.x);
      const gridY = this.rowY.indexOf(this.block.y);

      this.board[gridY][gridX] = this.block;
      console.log(this.board);
    }
  }
};
