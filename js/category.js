window.addEventListener("DOMContentLoaded", init);

const apiURLs = [
  "https://kea-alt-del.dk/t7/api/seasons",
  "https://kea-alt-del.dk/t7/api/subcategories",
  "https://kea-alt-del.dk/t7/api/categories"
];

let seasonTemplate;
let subcategoryTemplate;
let categoryTemplate;
let seasonContainer;
let subcategoryContainer;
let categoryContainer;

function init() {
  console.log("init");

  seasonTemplate = document.querySelector(".season_template");
  subcategoryTemplate = document.querySelector(".subcategory_template");
  categoryTemplate = document.querySelector(".category_template");

  seasonContainer = document.querySelector(".season_container");
  subcategoryContainer = document.querySelector(".subcategory_container");
  categoryContainer = document.querySelector(".category_container");

  console.log("season_template", seasonTemplate);
  console.log("subcategory_template", subcategoryTemplate);
  console.log("category_template", categoryTemplate);
  console.log("category_container", categoryContainer);


  apiURLs.forEach(apiURL => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((json) => {
        if (apiURL.includes("seasons")) {
          showSeasons(json);
        } else if (apiURL.includes("subcategories")) {
          showSubcategories(json);
        } else if (apiURL.includes("categories")) {
          showCategories(json);
        }
      });
  });
}


function showSeasons(seasonJSON) {
  let seasonClone;

  seasonJSON.forEach((season) => {
    console.log("season", season);
    seasonClone = seasonTemplate.cloneNode(true).content;
    seasonClone.querySelector("a").href = `productList.html?season=${season.season}`;
    seasonClone.querySelector(".season_name").textContent = season.season;
    seasonContainer.appendChild(seasonClone);
  });
}

function showSubcategories(subcategoryJSON) {
  let subcategoryClone;

  subcategoryJSON.forEach((subcategory) => {
    console.log("subcategory", subcategory);
    subcategoryClone = subcategoryTemplate.cloneNode(true).content;
    subcategoryClone.querySelector("a").href = `productList.html?subcategory=${subcategory.subcategory}`;
    subcategoryClone.querySelector(".subcategory_name").textContent = subcategory.subcategory;
    subcategoryContainer.appendChild(subcategoryClone);
  });
}

function showCategories(categoryJSON) {
  let categoryClone;

  categoryJSON.forEach((category) => {
    console.log("category", category);
    categoryClone = categoryTemplate.cloneNode(true).content;
    categoryClone.querySelector("a").href = `productList.html?category=${category.category}`;
    categoryClone.querySelector(".category_name").textContent = category.category;
    categoryContainer.appendChild(categoryClone);
  });
}