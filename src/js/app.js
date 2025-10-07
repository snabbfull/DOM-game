import MyContainer from "./container/container.js";
import GameLogic from "./game-logic/game-logic.js";

//Инициализация контейнера

document.addEventListener("DOMContentLoaded", () => {
  const game = document.querySelector("body");
  const finishGame = document.createElement("button");
  finishGame.textContent = "Завершить игру";
  finishGame.classList.add("finish");

  game.append(finishGame);

  // Контейнер для счёта
  const scoreDisplay = document.createElement("div");
  scoreDisplay.classList.add("score-display");
  game.prepend(scoreDisplay);

  const container = document.querySelector(".container");

  for (let i = 0; i < 16; i++) {
    const containerItem = document.createElement("div");
    containerItem.classList.add("container-item");
    containerItem.dataset.id = i;

    container.append(containerItem);
  }

  const gameLogic = new GameLogic(container);
  const myContainer = new MyContainer(container, gameLogic);

  // Отображаем счёт ВНЕ игрового контейнера
  scoreDisplay.innerHTML = gameLogic.renderScores();

  const randomImgInterval = setInterval(() => {
    if (!gameLogic.isGameOver) {
      myContainer.deleteRandomImage();
      myContainer.getRandomImage();
      if (!gameLogic.isClicked) {
        gameLogic.isInactive();
        gameLogic.resetIsClicked();
      }
      gameLogic.resetIsClicked();
      scoreDisplay.innerHTML = gameLogic.renderScores();
    }
  }, 1000);

  // Завершение игры по кнопке
  finishGame.addEventListener("click", () => {
    clearInterval(randomImgInterval);
    gameLogic.removeListeners();
    myContainer.deleteRandomImage();
    alert("Игра завершена");
  });
});
