/*jshint esversion: 6 */
window.onload = function() {
  startButton = document.getElementById("start-button");
  startButton.onclick = function() {
    let cover = document.getElementById("cover").style;
    fade(cover);
    startGame();
  };

  function startGame() {
    setTimeout(function() {
      Game.init();
    }, 1000);
  }
  function fade(e) {
    (e.opacity -= 0.1) < 0 ? (e.display = "none") : setTimeout(fade, 20);
  }
};
