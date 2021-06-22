'use strict';


// branch
// const productSelectorElem = document.getElementById('all_products');
// const leftImgElem = document.getElementById('left_product');
// const middleImgElem = document.getElementById('middle_product');
// const rightImgElem = document.getElementById('right_product');
const leftImgElem = document.getElementById('left_product_img');
const middleImgElem = document.getElementById('middle_product_img');
const rightImgElem = document.getElementById('right_product_img');
const leftH2Elem = document.getElementById('left_product_h2');
const middleH2Elem = document.getElementById('middle_product_h2');
const rightH2Elem = document.getElementById('right_product_h2');
const productUlElem = document.getElementById('product-clicks');
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
  imgPostion.alt = `this product is ${this.name}`;
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

  while(rightProduct === leftProduct || middleProduct === rightProduct || rightProduct === null) {
    rightProductIndex = Math.floor(Math.random() * Products.allProducts.length);
    rightProduct = Products.allProducts[rightProductIndex];
    // ----
    // leftProductIndex = Math.floor(Math.random() * Products.allProducts.length);
    // leftProduct = Products.allProducts[leftProductIndex];
    // middleProductIndex = Math.floor(Math.random() * Products.allProducts.length);
    // middleProduct = Products.allProducts[middleProductIndex];
  }
  leftProduct.renderSingleProduct(leftImgElem, leftH2Elem);
  middleProduct.renderSingleProduct(middleImgElem, middleH2Elem);
  rightProduct.renderSingleProduct(rightImgElem, rightH2Elem);
}


function renderResults() {
  productUlElem.innerHTML = '';
  for (let product of Products.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.votes}`;
    productUlElem.appendChild(liElem);
  }
}


// ---------
// function addProductChart () {
//   const = [];
//   Const = [];
//   const = [];

//   for (let product of Products.allProducts) {
//     productNamesArray.push(product.name);
//     productNamesArray.push(product.votes);
//     productNamesArray.push(prodcut.timesDisplayed);
//   }
// }
// ------------

function productClicked(event) {
  let id = event.target.id;
  voteCounter++;
  if (id === 'left_product_img' || id === 'middle_product_img' || id === 'right_product_img') {
    if (id === 'left_product_img') {
      leftProduct.votes++;
    } else if (id === 'right_product_img') {
      rightProduct.votes++;
    } else {
      middleProduct.votes++;
    }
    pickThreeProducts();
   }
    // else {
  //   alert('Please pick a product');
  // }
  if (voteCounter === 25){
    renderResults();
    // productSelectorElem.removeEventListener('click', productClicked);
    leftImgElem.removeEventListener('click', productClicked);
    middleImgElem.removeEventListener('click', productClicked);
    rightImgElem.removeEventListener('click', productClicked);

  }
}
// ----------------global functions above -----------------
// productSelectorElem.addEventListener('click', productClicked);
leftImgElem.addEventListener('click', productClicked);
middleImgElem.addEventListener('click', productClicked);
rightImgElem.addEventListener('click', productClicked);
// --------------------event listeners above-----------------
new Products('bag', './img/bag.jpg');
new Products('banana', './img/banana.jpg');
new Products('bathroom', './img/bathroom.jpg');
new Products('boots', './img/boots.jpg');
new Products('breakfest', './img/breakfast.jpg');
new Products('bubblegum', './img/bubblegum.jpg');
new Products('chair', './img/chair.jpg');
new Products('cthulhu', './img/cthulhu.jpg');
new Products('dog-duck', './img/dog-duck.jpg');
new Products('dragon', './img/dragon.jpg');
new Products('pen', './img/pen.jpg');
new Products('pet-sweep', './img/pet-sweep.jpg');
new Products('scissors', './img/scissors.jpg');
new Products('shark', './img/shark.jpg');
new Products('sweep', './img/sweep.png');
new Products('tauntaun', './img/tauntaun.jpg');
new Products('unicorn', './img/unicorn.jpg');
new Products('water-can', './img/water-can.jpg');
new Products('wine-glass', './img/wine-glass.jpg');


pickThreeProducts();