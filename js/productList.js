window.addEventListener("DOMContentLoaded", init);

const apiURL = "https://kea-alt-del.dk/t7/api/products";

let productTemplate;
let productContainer;

function init() {
  console.log("init");

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
    productClone.querySelector("a").href = `product.html?id=${product.id}`;
    productClone.querySelector(".product_image").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    productClone.querySelector(".product_image").alt = `Picture of a ${product.productdisplayname} beer`;
    productClone.querySelector(".product_name").textContent = product.productdisplayname;
    productClone.querySelector(".brand_name").textContent = product.brandname;
    productClone.querySelector(".price").textContent = product.price + " DKK";
    if(product.discount > 0){
      productClone.querySelector(".discount").textContent = product.discount + "%";
      productClone.querySelector(".price").classList.add("discounted");
      productClone.querySelector(".discounted_price").textContent = Math.round(product.price - (product.price * product.discount / 100)) + " DKK";
    }

    if(product.soldout === 1){
      productClone.querySelector(".sold_out").style.display = "block";
      console.log("Sold out");
    }
    productContainer.appendChild(productClone);
  });
}
