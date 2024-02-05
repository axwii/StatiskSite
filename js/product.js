const parameter = new URLSearchParams(window.location.search);
const id = parameter.get("id");

const apiUrl = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch(apiUrl)
.then(res=>res.json())
.then((data) => showProduct(data))

function showProduct(product){
    console.log(product);
    document.querySelector(".purchaseBox .productName").textContent = product.productdisplayname;
    document.querySelector(".purchaseBox .brand").textContent = product.brandname;
    document.querySelector(".purchaseBox .price").textContent = product.price;
    document.querySelector(".purchaseBox .articletype").textContent = product.articletype;
    document.querySelector(".productImage").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    document.querySelector(".productImage").alt = product.productdisplayname;
    document.querySelector(".breadcrumbsProductName").textContent = product.productdisplayname;
    // Info
    document.querySelector(".info .variantName").textContent = product.variantname;
    document.querySelector(".info .baseColour").textContent = product.basecolour;
    document.querySelector(".info .relId").textContent = product.relid;
    document.querySelector(".info .brandName").textContent = product.brandname;
    document.querySelector(".info .brandBio").textContent = product.brandbio;
    document.querySelector(".info .brandImage").src = product.brandimage;
    document.querySelector(".info .brandImage").alt = product.brandname;
}