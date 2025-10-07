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

  const elementsNumber = 16;
  for (let i = 0; i < elementsNumber; i++) {
    const containerItem = document.createElement("div");
    containerItem.classList.add("container-item");
    containerItem.dataset.id = i;

    container.append(containerItem);
  }
  const modal = document.getElementById("game-modal");
  const modalTitle = modal.querySelector(".modal-title");
  const modalBtn = document.getElementById("modal-btn");
  modalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    gameLogic.resetGame();
    scoreDisplay.innerHTML = gameLogic.renderScores();
    startGameLoop(); // ← перезапускаем интервал!
  });

  let randomImgInterval = null;

  const gameLogic = new GameLogic(container, (result) => {
    clearInterval(randomImgInterval);
    modal.classList.add("active");
    modalTitle.textContent =
      result === "win" ? "Вы победили 🎉" : "Вы проиграли 😢";
  });
  const myContainer = new MyContainer(container, gameLogic);

  // Отображаем счёт ВНЕ игрового контейнера
  scoreDisplay.innerHTML = gameLogic.renderScores();

  function startGameLoop() {
    randomImgInterval = setInterval(() => {
      if (!gameLogic.isGameOver) {
        if (gameLogic.isClicked) {
          myContainer.deleteRandomImage();
          myContainer.getRandomImage();
          gameLogic.resetIsClicked();
        } else {
          myContainer.deleteRandomImage();
          myContainer.getRandomImage();
          gameLogic.isInactive();
          gameLogic.resetIsClicked();
        }
        scoreDisplay.innerHTML = gameLogic.renderScores();
      }
    }, 1000);
  }

  // 🟢 Запуск при первой загрузке
  startGameLoop();

  // Завершение игры по кнопке
  finishGame.addEventListener("click", () => {
    clearInterval(randomImgInterval);
    gameLogic.removeListeners();
    myContainer.deleteRandomImage();
    alert("Игра завершена");
  });
});
