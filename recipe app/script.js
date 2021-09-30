const searchForm = document.querySelector('form');
const searchItemDiv = document.querySelector('.search-item');
const container = document.querySelector('container');
let searchQuery = '';
const APP_ID = 'b03bdf3b';
const APP_key = '918b216770b99e8cb4536ecaf3add1d5';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  console.log(searchQuery);
  fetchAPI();
});

async function fetchAPI() {
  const url = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
  const response = await fetch(url);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}
function generateHTML(results) {
  let generatedHTML = '';
  results.map((result) => {
    generatedHTML += `
        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${
              result.recipe.url
            }" target="_blank">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet Label: ${result.recipe.dietLabels}</p>
        <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        <p class="item-data"> Ingredients: ${result.recipe.ingredientLines}</p>
    </div>

        `;
  });

  searchItemDiv.innerHTML = generatedHTML;
}
