'use strict';


// branch
const productSelectorElem = document.getElementById('all_products');
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
function Products(name, image, timesDisplayed, votes) {
  this.name = name;
  this.image = image;
  this.timesDisplayed = timesDisplayed;
  this.votes = votes;
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
var a;
function show_hide() {
  if(a==1) {
    document.getElementById('product-clicks').style.display="none";
    return a=0;
  }
  else {
    document.getElementById('product-clicks').style.display="inline";
    return a=1;
  }
}

function pickThreeProducts() {

  let usedProducts = [leftProduct, middleProduct, rightProduct];
  while (usedProducts.includes(leftProduct)) {
    let leftProductIndex = Math.floor(Math.random() * Products.allProducts.length);
    leftProduct = Products.allProducts[leftProductIndex];
  }
  
  while(middleProduct === rightProduct || middleProduct === leftProduct || usedProducts.includes(middleProduct)) {
    let middleProductIndex = Math.floor(Math.random() * Products.allProducts.length);
    middleProduct = Products.allProducts[middleProductIndex];
  }

  while(rightProduct === leftProduct || rightProduct === middleProduct || usedProducts.includes(rightProduct)) {
    let rightProductIndex = Math.floor(Math.random() * Products.allProducts.length);
    rightProduct = Products.allProducts[rightProductIndex];
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



function addProductChart() {
  const productNamesArray = [];
  const productVotesArray = [];
  const productShownArray = [];
  for (let product of Products.allProducts) {
    productNamesArray.push(product.name);
    productVotesArray.push(product.votes);
    productShownArray.push(product.timesDisplayed);
  }
  const chartVar = document.getElementById('productChart').getContext('2d');
  const productChart = new Chart(chartVar, {

    type: 'bar',
    data: {
      labels: productNamesArray,
      datasets: [{
        label: 'How many times Products were selected',
        data: productVotesArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1 
      }, {
        label: 'How many times Products were shown',
        data: productShownArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true 
        }
      }
    }
  });
}

function productClicked(event) {
  let id = event.target.id;
  // voteCounter++;
  if (id === 'left_product_img' || id === 'middle_product_img' || id === 'right_product_img') {
    voteCounter++;
    if (id === 'left_product_img') {
      leftProduct.votes++;
    } else if (id === 'right_product_img') {
      rightProduct.votes++;
    } else {
      middleProduct.votes++;
    }
    pickThreeProducts();
  }
  if (voteCounter === 15){
    renderResults();
    addProductChart();
    productSelectorElem.removeEventListener('click', productClicked);
  }
  storeProductsClicked();
}
// productSelectorElem.addEventListener('click', productClicked);

function storeProductsClicked() {
  let stringifiedProducts = JSON.stringify(Products.allProducts);
  localStorage.setItem('Product', stringifiedProducts);
}

function getProductsClicked() {
  let potentialProduct = localStorage.getItem('Product');
  if (potentialProduct) {
    let parsedProduct = JSON.parse(potentialProduct);
    for (let productT of parsedProduct) {
      // console.log(productT);
      let name = productT.name;
      let image = productT.image;
      let timesDisplayed = productT.timesDisplayed;
      let votes = productT.votes;
      new Products(name, image, timesDisplayed, votes);
      // productClicked(name, image, timesDisplayed, votes);

    }
  }
}

productSelectorElem.addEventListener('click', productClicked);

// --------------------event listeners above-----------------

getProductsClicked();

if (Products.allProducts.length < 1) {
  new Products('bag', './img/bag.jpg', 0, 0);
  new Products('banana', './img/banana.jpg', 0, 0);
  new Products('bathroom', './img/bathroom.jpg', 0, 0);
  new Products('boots', './img/boots.jpg', 0, 0);
  new Products('breakfeast', './img/breakfast.jpg', 0, 0);
  new Products('bubblegum', './img/bubblegum.jpg', 0, 0);
  new Products('chair', './img/chair.jpg', 0, 0);
  new Products('cthulhu', './img/cthulhu.jpg', 0, 0);
  new Products('dog-duck', './img/dog-duck.jpg', 0, 0);
  new Products('dragon', './img/dragon.jpg', 0, 0);
  new Products('pen', './img/pen.jpg', 0, 0);
  new Products('pet-sweep', './img/pet-sweep.jpg', 0, 0);
  new Products('scissors', './img/scissors.jpg', 0, 0);
  new Products('shark', './img/shark.jpg', 0, 0);
  new Products('sweep', './img/sweep.png', 0, 0);
  new Products('tauntaun', './img/tauntaun.jpg', 0, 0);
  new Products('unicorn', './img/unicorn.jpg', 0, 0);
  new Products('water-can', './img/water-can.jpg', 0, 0);
  new Products('wine-glass', './img/wine-glass.jpg', 0, 0);
}

pickThreeProducts();

