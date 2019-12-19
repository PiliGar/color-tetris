/*jshint esversion: 6 */
window.onload = function() {
  /* HTML elements */
  let cover = document.getElementById("cover").style;

  Game.startButton.onclick = function() {
    fadeOut();
    startGame();
  };

  Game.exitButton.onclick = function() {
    show();
    stopGame();
  };

  Game.pauseButton.addEventListener("click", function() {
    Game.pauseButton.classList.contains("stop")
      ? Game.pause()
      : Game.continue();
  });

  function startGame() {
    setTimeout(function() {
      Game.init();
    }, 1000);
  }
  function stopGame() {
    Game.stop();
  }
  function show() {
    cover.display = "block";
    cover.opacity = 1;
  }
  function fadeOut() {
    cover.opacity -= 0.1;
    cover.opacity < 0 ? (cover.display = "none") : setTimeout(fadeOut, 10);
  }
};
