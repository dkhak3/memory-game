const cardsArray = [
  {
    name: "fire",
    img: "img/fire.png",
  },
  {
    name: "youtube",
    img: "img/youtube.png",
  },
  {
    name: "flash",
    img: "img/flash.png",
  },
  {
    name: "gift",
    img: "img/gift.png",
  },
  {
    name: "tron",
    img: "img/tron.png",
  },
  {
    name: "ufo",
    img: "img/ufo.png",
  },
  {
    name: "plant",
    img: "img/plant.png",
  },
  {
    name: "burger",
    img: "img/burger.png",
  },
];

let previousCard;
let count = 0;
let firstGuess = "";
let secondGuess = "";
const delay = 1000;
const grid = document.querySelector(".grid");

function generateCard() {
  grid.innerHTML = "";

  // random array
  const cardsArrayMerge = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());

  cardsArrayMerge.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-name", item.name);

    const front = document.createElement("div");
    front.className = "front";

    const back = document.createElement("div");
    back.className = "back";
    back.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
}

function matchingCard() {
  const selects = document.querySelectorAll(".selected");
  [...selects].forEach((item) => item.classList.add("matched"));
}

function resetGuess() {
  previousCard = null;
  count = 0;
  firstGuess = "";
  secondGuess = "";
  const selects = document.querySelectorAll(".selected");
  const matchedAll = document.querySelectorAll(".matched");
  const cardLength = document.querySelectorAll(".card").length;

  // 2 kết quả không đúng -> remove class selected
  [...selects].forEach((item) => item.classList.remove("selected"));

  // khi chơi xong thì matched remove all matched rồi generateCard
  if (matchedAll.length === cardLength) {
    // done game -> reset game
    setTimeout(
      matchedAll.forEach((item) => item.classList.remove("matched")),
      delay
    );
    setTimeout(generateCard, delay);
  }
}
generateCard();

grid.addEventListener("click", (e) => {
  const clicked = e.target;

  if (
    clicked.name === "SECTION" ||
    previousCard === clicked ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("matched")
  ) {
    return;
  }

  if (count < 2) {
    count++;

    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        // đầu và cuối khớp dataset.name nên gọi matchingCard để add matched
        setTimeout(matchingCard, delay);
      }

      // đầu và cuối khác dataset.name nên gọi resetGuess để remove selected
      //   or dùng để reset lại game khi hết
      setTimeout(resetGuess, delay);
    }

    previousCard = clicked;
  }
});
