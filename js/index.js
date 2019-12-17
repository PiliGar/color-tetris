/*jshint esversion: 6 */
window.onload = function() {
  startButton = document.getElementById("start-button");
  startButton.onclick = function() {
    var cover = document.getElementById("cover").style;
    cover.opacity = 1;
    (function fade() {
      (cover.opacity -= 0.1) < 0 ? (s.display = "none") : setTimeout(fade, 20);
    })();

    setTimeout(function() {
      startGame();
    }, 1000);

    startButton.style.display = "none";
  };

  function startGame() {
    Game.init();
  }
};
