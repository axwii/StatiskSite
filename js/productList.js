window.addEventListener("DOMContentLoaded", init);

const parameter = new URLSearchParams(window.location.search);

const { season, subcategory, category } = Object.fromEntries(parameter.entries());

const apiURL = season
  ? `https://kea-alt-del.dk/t7/api/products?season=${season}`
  : subcategory
  ? `https://kea-alt-del.dk/t7/api/products?subcategory=${subcategory}`
  : category
  ? `https://kea-alt-del.dk/t7/api/products?category=${category}`
  : 'https://kea-alt-del.dk/t7/api/products';

// let apiURL;

// const season = parameter.get('season');
// const subcategories = parameter.get('subcategory');
// const categories = parameter.get('category');

// if (season) {
//   apiURL = `https://kea-alt-del.dk/t7/api/products?season=${season}`;
// } else if (subcategories) {
//   apiURL = `https://kea-alt-del.dk/t7/api/products?subcategory=${subcategories}`;
// } else if (categories) {
//   apiURL = `https://kea-alt-del.dk/t7/api/products?category=${categories}`;
// } else {
//   apiURL = 'https://kea-alt-del.dk/t7/api/products';
//   console.log("Api URL" + apiURL);
// }

let productTemplate, productContainer;

function init() {
  productTemplate = document.querySelector(".product_template");
  console.log("product_template", productTemplate);

  productContainer = document.querySelector(".product_container");
  console.log("product_container", productContainer);

  fetch(apiURL)
    .then((res) => res.json())
    .then((json) => showProducts(json));
}

function showProducts(productJSON) {
  let productClone;

  productJSON.forEach((product) => {
    console.log("Product", product);
    productClone = productTemplate.cloneNode(true).content;

    const imgSrc = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    const discountedPrice = product.discount > 0 ? Math.round(product.price - (product.price * product.discount / 100)) + " DKK" : "";

    Object.assign(productClone.querySelector(".product_image"), { src: imgSrc, alt: `Picture of a ${product.productdisplayname} beer` });
    productClone.querySelector(".product_name").textContent = product.productdisplayname;
    productClone.querySelector(".brand_name").textContent = product.brandname;
    productClone.querySelector(".sold_out").style.display = product.soldout === 1 ? "block" : "none";
    productClone.querySelector(".price").textContent = product.price + " DKK";
    productClone.querySelector(".price").className = product.discount > 0 ? "discounted" : "";    
    productClone.querySelector(".discounted_price").textContent = discountedPrice;

    productClone.querySelector("a").href = `product.html?id=${product.id}`;
    productContainer.appendChild(productClone);

  });
}
