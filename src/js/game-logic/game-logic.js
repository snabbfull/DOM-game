export default class GameLogic {
  constructor(element) {
    this._element = element;
    this.winScore = 0;
    this.loseScore = 0;
    this.isGameOver = false;
    this.onGoblinClick = this.onGoblinClick.bind(this);

    this.gameTarget = this._element.querySelectorAll(".container-item");
    this.gameTarget.forEach((element) => {
      element.addEventListener("click", this.onGoblinClick);
    });
  }

  onGoblinClick(e) {
    if (this.isGameOver) return;

    if (e.target.tagName === "IMG") {
      this.winScore += 1;
      this.checkWin();
    } else {
      this.loseScore += 1;
      this.checkLose();
    }
  }

  resetGame() {
    this.winScore = 0;
    this.loseScore = 0;
    this.isGameOver = false;
  }

  checkWin() {
    if (this.winScore >= 5) {
      this.isGameOver = true;
      alert("Вы победили");
      this.resetGame();
    }
  }

  checkLose() {
    if (this.loseScore >= 5) {
      this.isGameOver = true;
      alert("Вы проиграли");
      this.resetGame();
    }
  }

  removeListeners() {
    this.gameTarget.forEach((element) => {
      element.removeEventListener("click", this.onGoblinClick);
    });
  }
}
