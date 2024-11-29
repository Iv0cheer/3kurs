const productDatabase = [
  { name: "Яблоко (100г)", calories: 52 },
  { name: "Банан (100г)", calories: 96 },
  { name: "Куриная грудка (100г)", calories: 165 },
  { name: "Рис (100г)", calories: 130 },
  { name: "Брокколи (100г)", calories: 34 }
];

function calculateCalories() {
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const activityLevel = parseFloat(document.getElementById('activity').value);

  if (isNaN(age) || isNaN(weight) || isNaN(height) || age < 0 || weight < 20 || height < 70 || age >= 120 || weight > 120 || height > 220) {
      document.getElementById('calorieResult').innerText = "Пожалуйста, введите корректные значения.";
      return;
  }

  let bmr;

  if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const dailyCalories = Math.round(bmr * activityLevel);
  document.getElementById('calorieResult').innerText = `Ваши суточные калории: ${dailyCalories}`;
}

function addProduct(name, calories) {
  const productsDiv = document.getElementById('products');
  const productDiv = document.createElement('div');
  productDiv.classList.add('product');

  productDiv.innerHTML = `
      <span>${name} - ${calories} калорий</span>
      <button onclick="removeProduct(this, ${calories})">Удалить</button>
  `;

  productsDiv.appendChild(productDiv);
  updateTotalCalories(calories);
}

function removeProduct(button, calories) {
  const productDiv = button.parentElement;
  productDiv.remove();
  updateTotalCalories(-calories);
}

function updateTotalCalories(calories) {
  const totalCaloriesElement = document.getElementById('totalCalories');
  const currentTotal = parseInt(totalCaloriesElement.innerText) || 0;
  totalCaloriesElement.innerText = currentTotal + calories;
}

function populateProductList() {
  const productsDiv = document.getElementById('products');
  productDatabase.forEach(product => {
      const button = document.createElement('button');
      button.innerText = `Добавить ${product.name}`;
      button.onclick = () => addProduct(product.name, product.calories);
      productsDiv.appendChild(button);
  });
}

window.onload = populateProductList;