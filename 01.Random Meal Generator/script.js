const getMealBtn = document.getElementById("get-meal");
const mealContainer = document.getElementById("meal");

// fetch recipes
const fetchMeal = async function () {
  try {
    // data link
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    // if no response throw error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();
    // call mealsInfo() returns random meal
    mealsInfo(data.meals[0]);
  } catch (error) {
    console.error(error);
  }
};
// get all the information that we want to display name, ingredients etc..
const mealsInfo = function (meal) {
  // create an empty array so we can push all the ings into one one array
  const ingredients = [];
  // get all the ingredients up to 20 ings
  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      // push all the ings and measures into the empty array we created
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // we stop the loop once there are no more ings nor measures
      break;
    }
  }
  // create all the new html elements and insert the info we want
  const newHTML =
    // 1. meal img, 2.category we use ternary '?' to check if there is a category if not we don't return anything, 3.Area, 4.Tags split by a comma and then join them again with comma and a space, 5.ingredient map through each and return a list of ings and join them together to form a string, 6.meal name, 7.recipe instructs, 8. get video we need to get the id so we use slice(-11) thats the position of id
    `<div class='row'>
  <div class='columns five'>
  <img src='${meal.strMealThumb}' id='img-meal'>
  ${
    meal.strCategory
      ? `
      <p>
        <strong>Category:</strong> ${meal.strCategory}
      </p>`
      : ""
  }

  ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}

  ${
    meal.strTags
      ? `<p><strong>Tags:</strong> ${meal.strTags.split(",").join(", ")}</p>`
      : ""
  }

<h4>Ingredients:</h4>
<ul>
${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
</ul>
  </div>

  <div class = 'columns seven'>
  <h3>${meal.strMeal}</h3>
  <p>${meal.strInstructions}</p>
  </div>
 </div>

 ${
   meal.strYoutube
     ? `
  <div class="row"> 
  <h5>Video Recipe</h5>
<div class='videoWrapper'>
 
    <iframe
      width="420"
      height="315"
      src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"
    ></iframe>
</div>
</div>`
     : ""
 }`;
  // insert the created elms into the mealContainer element created in the html
  mealContainer.innerHTML = newHTML;
};

// click event to btn
getMealBtn.addEventListener("click", () => {
  // change the btn text
  getMealBtn.innerHTML = "Next Meal";
  // h3 text change
  document.querySelector(".text-center h3").innerHTML = "Want Something Else?";
  // change h5 text
  document.querySelector(".text-center h5").innerHTML =
    "Click below to get another recipe.";
  // call fetch() to display new recipte everytime we click the btn
  fetchMeal();
});
