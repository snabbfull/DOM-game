import goblinImg from "../../img/goblin.png";

export default class MyContainer {
  constructor(element, gameLogic) {
    this._element = element;
    this.gameLogic = gameLogic;
    this.lastIndex = null;
  }

  deleteRandomImage() {
    //Ищем в классе элемент по селектору
    const imgElement = this._element.querySelector(".img");

    //Удаляем элемент
    if (imgElement) {
      imgElement.remove();
    }
  }

  getRandomImage() {
    //Получаем коллекцию div-ов
    const items = this._element.querySelectorAll(".container-item");

    //Проверка использования ранее индекса, если ранее он был уже записан, повторяем рандомное вычесления до тех пор, пока новый индекс не будет отличаться от ранее выбранного
    let randomIndex;
    if (items.length === 1) {
      // Только один элемент — повтор неизбежен, просто используем его
      randomIndex = 0;
    } else {
      // Гарантируем, что индекс отличается от предыдущего
      do {
        randomIndex = Math.floor(Math.random() * items.length);
      } while (randomIndex === this.lastIndex);
    }

    //Перезаписываем предыдущий индекс, чтобы картинка повторно туда не могла попасть
    this.lastIndex = randomIndex;

    const randomItem = items[randomIndex];

    //Создаем HTML элемент img, указывая путь на картинку и class
    const imgElement = document.createElement("img");
    imgElement.src = goblinImg;
    imgElement.classList.add("img");

    //Помещаем картинку в рандомный div из актуального списка
    randomItem.append(imgElement);
  }
}
