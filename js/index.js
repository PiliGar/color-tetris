/*jshint esversion: 6 */
window.onload = function() {
  startButton = document.getElementById("start-button");
  startButton.onclick = function() {
    startGame();
    startButton.style.display = "none";
  };

  function startGame() {
    Game.init();
  }
};
