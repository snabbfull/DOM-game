export default class GameLogic {
  constructor(element, onGameEnd) {
    this._element = element;
    this.onGameEnd = onGameEnd;
    this.winScore = 0;
    this.loseScore = 0;
    this.isGameOver = false;
    this.isClicked = false;
    this.onGoblinClick = this.onGoblinClick.bind(this);

    this.gameTarget = this._element.querySelectorAll(".container-item");
    this.gameTarget.forEach((element) => {
      element.addEventListener("click", this.onGoblinClick);
    });
  }

  onGoblinClick(e) {
    if (this.isGameOver) return;
    // Если уже был клик по гоблину в этом раунде — выходим
    if (this.isClicked && e.target.tagName === "IMG") return;

    if (e.target.tagName === "IMG") {
      this.isClicked = true;
      this.winScore += 1;
      this.checkWin();
    } else {
      this.loseScore += 1;
      this.checkLose();
    }
  }

  resetIsClicked() {
    this.isClicked = false;
  }

  isInactive() {
    if (!this.isClicked && !this.isGameOver) {
      this.loseScore++;
      this.checkLose();
    }
  }

  resetGame() {
    this.winScore = 0;
    this.loseScore = 0;
    this.isGameOver = false;
    this.isClicked = false;
  }

  checkWin() {
    if (this.winScore >= 5) {
      this.isGameOver = true;
      this.onGameEnd?.("win");
      this.resetGame();
    }
  }

  checkLose() {
    if (this.loseScore >= 5) {
      this.isGameOver = true;
      this.onGameEnd?.("lose");
      this.resetGame();
    }
  }

  removeListeners() {
    this.gameTarget.forEach((element) => {
      element.removeEventListener("click", this.onGoblinClick);
    });
  }

  renderScores() {
    return `
      <div class="score hits">Попаданий: ${this.winScore}</div>
      <div class="score misses">Промахов: ${this.loseScore}</div>
    `.trim();
  }
}
