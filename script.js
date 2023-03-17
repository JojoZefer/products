let productsGrid = document.getElementById('products-grid');
let productsArray = [];
let xhr = new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/JojoZefer/products'

xhr.open('GET', url + '/products');
xhr.responseType = 'json';
xhr.onload = function() {
	products = xhr.response;
	productsGrid.innerHTML = null;
	products.forEach(p => {
		//productsArray.push(p);//
		let pElem = document.createElement('div');
		pElem.classList.add('products');
		pElem.innerHTML = `
         <h2 class = 'products-name'>${p.name}</h2>
         <img class='product-photo' src="$${p.photo_url}" alt="${p.name}">
         <p class='products-price'><b>Price:</b>${p.price}UAH</p>
         <p class='products-description'><b>Description</b>${p.description}</p>
         <a href="profile.html?id=${p.author_id}">Seller profiles</a>
         <button onclick="addProductToCart(${p.id})">Buy</button>
		`;
		productsGrid.append(pElem);
	});
}
xhr.send();

let cartProd = document.getElementById('cart-products');

let cart = [];

function addProductToCart(id) {
	let product = productsArray.find(function(p){
		return p.id == id;
	})
	cart.push(product);
	drawCartProducts();
}

function drawCartProducts() {
	if(cart.length == 0) return cartProd.innerHTML = 'Cart is empty'
	cartProd.innerHTML = null;
	let sun = 0;
	cart.forEach(function(p){
		cartProd.innerHTML +- `
        <p><img src="${p.photo_url}" alt="${p.name}">${p.name} |${p.price}UAH</p>
        <hr><br>
		`;
		sum += p.price;
	});
	cartProd.innerHTML += `
       <p>Total price: ${sum}UAH</p>
       <button onclick="buyAll()">Buy all</button>
	`	
}

function buyAll() {
	cart = [];
	cartProd.innerHTML = 'Money was withdrawn from your credit card'
}

function openCart() {
	cartProd.classList.toggle('hide');
}
