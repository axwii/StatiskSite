window.addEventListener("DOMContentLoaded", init);

const apiURL = "https://kea-alt-del.dk/t7/api/seasons";

let categoryTemplate;
let categoryContainer;

function init() {
  console.log("init");

  categoryTemplate = document.querySelector(".category_template");
  console.log("category_template", categoryTemplate);

  categoryContainer = document.querySelector(".category_container");
  console.log("category_container", categoryContainer);

  fetch(apiURL)
    .then((res) => res.json())
    .then((json) => showCategorys(json));
}

function showCategorys(categoryJSON) {
  let categoryClone;

  categoryJSON.forEach((category) => {
    console.log("category", category);
    categoryClone = categoryTemplate.cloneNode(true).content;
    categoryClone.querySelector("a").href = `productList.html?season=${category.season}`;
    categoryClone.querySelector(".category_name").textContent = category.season;
    categoryContainer.appendChild(categoryClone);
  });
}
