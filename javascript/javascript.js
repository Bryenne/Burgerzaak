let order = [];
let currentBurger = [];
let lives = 3;

function startGame() {
  document.querySelector('#beginscherm').style.display = "none";
  document.querySelector('#midspel').classList.remove("hidden");

  const music = document.getElementById("bg-music");
  music.volume = 0.5;
  music.play().catch(e => {
    console.log("Autoplay geblokkeerd:", e.message);
  });

  randomOrder();

  lives = 3;
  updateLivesDisplay();
}

function updateLivesDisplay() {
  const container = document.getElementById('lives-container');
  container.innerHTML = '';

  for (let i = 0; i < lives; i++) {
    const img = document.createElement('img');
    img.src = '../images/life_heart.png'
    img.alt = 'Life'
    container.appendChild(img);
  }
}

function randomOrder() {
  const ingredients = ['lettuce', 'tomato', 'patty'];
  order = [];

  order.push('bottom');

  const aantalToppings = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < aantalToppings; i++) {
    const random = ingredients[Math.floor(Math.random() * ingredients.length)];
    order.push(random);
  }

  order.push('top');

  const container = document.querySelector('#order-container');
  container.innerHTML = "<strong>Bestelling:</strong><ul>" + order.map(item => `<li>${item}</li>`).join('') + "</ul>";
}

function addIngredient(type) {
  const burger = document.querySelector('#burger-build');
  const img = document.createElement('img');
  img.src = `images/${type}.png`;
  img.alt = type;
  img.className = 'ingredient';
  burger.insertBefore(img, burger.firstChild);
  currentBurger.push(type);
}

function checkOrder() {
  const correct = JSON.stringify(order) === JSON.stringify(currentBurger);

  if (correct) {
    alert("Perfecte burger! 🍔");
  } else {
    alert("Verkeerde volgorde! ❌");
    lives--;
    updateLivesDisplay();

    if (lives == 0) {
      alert("Game Over! Je hebt geen levens meer. Je wordt terug verwezen naar de startpagina :(");
      location.reload();
      return;
    }
  }

  currentBurger = [];
  document.querySelector('#burger-build').innerHTML = '';
  randomOrder();
}

function deleteOrder() {
  currentBurger = [];
  document.querySelector('#burger-build').innerHTML = '';
}

