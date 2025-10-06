import MyContainer from "./container/container.js";
import GameLogic from "./game-logic/game-logic.js";

//Инициализация контейнера

document.addEventListener("DOMContentLoaded", () => {
  const game = document.querySelector("body");
  const finishGame = document.createElement("button");
  finishGame.textContent = "Завершить игру";
  finishGame.classList.add("finish");

  game.append(finishGame);

  const container = document.querySelector(".container");

  for (let i = 0; i < 16; i++) {
    const containerItem = document.createElement("div");
    containerItem.classList.add("container-item");
    containerItem.dataset.id = i;

    container.append(containerItem);
  }

  const gameLogic = new GameLogic(container);
  const myContainer = new MyContainer(container, gameLogic);

  const randomImgInterval = setInterval(() => {
    if (!gameLogic.isGameOver) {
      myContainer.deleteRandomImage();
      myContainer.getRandomImage();
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
