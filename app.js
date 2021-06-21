'use strict';



const productSelectorElem = document.getElementById('all_products');
const leftImgElem = document.getElementById('left_product_img');
const middleImgElem = document.getElementById('middle_product_img');
const rightImgElem = document.getElementById('right_product_img');
const leftH2Elem = document.getElementById('left_product_h2');
const middleH2Elem = document.getElementById('middle_product_h2');
const rightH2Elem = document.getElementById('right_product_h2');
const productUlElem = document.getElementById('');
let voteCounter = 0;
Products.allProducts = [];
let leftProduct = null;
let middleProduct = null;
let rightProduct = null;

// ------------------Global Var above--------------
function Products(name, image) {
  this.name = name;
  this.image = image;
  this.timesDisplayed = 0;
  this.votes = 0;
  Products.allProducts.push(this);
}
// ------------------Constructor Functions above-----------
Products.prototype.renderSingleProduct = function(imgPostion, h2Postion) {
  imgPostion.src = this.image;
  imgPostion.alt = 'this product is ${this.name}';
  // ?????????????? this product is
  h2Postion.textContent = this.name;
  this.timesDisplayed++;
}

//------------------ prototype methods above-----------------
function pickThreeProducts() {
  let leftProductIndex = Math.floor(Math.random() * Products.allProducts.length);
  leftProduct = Products.allProducts[leftProductIndex];
  let middleProductIndex = Math.floor(Math.random() * Products.allProducts.length);
  middleProduct = Products.allProducts[middleProductIndex];

  while(middleProduct === leftProduct || middleProduct === null) {
    middleProductIndex = Math.floor(Math.random() * Products.allProducts.length);
    middleProduct = Products.allProducts[middleProductIndex];
  }

  let rightProductIndex = Math.floor(Math.random() * Products.allProducts.length);
  rightProduct = Products.allProducts[rightProductIndex];

  while(rightProduct === leftProduct || middleProduct === rightProduct || rightProduct === null){
    rightProductIndex = Math.floor(Math.random() * Products.allProducts.length);
    rightProduct = Products.allProducts[rightProductIndex];
    // middleProductIndex = Math.floor(Math.random() * Products.allProducts.length);
    // middleProduct = Products.allProducts[middleProductIndex];
  }
  leftProduct.pickThreeProducts(leftImgElem, leftH2Elem);
  middleProduct.pickThreeProducts(middleImgElem, middleH2Elem);
  rightProduct.pickThreeProducts(rightImgElem, rightH2Elem);
}


function renderResults() {
  productUlElem.innerHTML = '';
  for (let product of Products.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.votes}`;
    productUlElem.appendChild(liElem);
  }
}

function productClicked(event) {
  let id = event.target.id;
  if (id === 'left_product_img' || id === 'middle_product_img' || id === 'right_product_img') {
    
  }
}
// ----------------global functions above -----------------

// --------------------event listeners above-----------------