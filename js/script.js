const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('.btn-open');
const closeModalBtn = document.querySelector('.btn-close');

const openModal = function () {
 modal.classList.remove('hidden');
 overlay.classList.remove('hidden');
};

openModalBtn.addEventListener('click', openModal);

const closeModal = function () {
 modal.classList.add('hidden');
 overlay.classList.add('hidden');
};
closeModalBtn.addEventListener('click', closeModal);

overlay.addEventListener("click", closeModal);




/* ====================================== */

document.addEventListener('DOMContentLoaded', function () {
	const productInfo = [
	  { id: 1, name: 'Суші', count: 0, price: 22.99, imageSrc: "img/sushi-6715579_1280.jpg" },
	  { id: 2, name: 'Шніцель', count: 0, price: 16.50, imageSrc: "img/shnicel1.jpg" },
	  { id: 3, name: 'Бургер', count: 0, price: 12.99, imageSrc: "img/p_O.jpg" },
	];
 
	let cartItems = [];
 
	const addButtonCart = document.querySelectorAll('.foot__add');
	const numberProducts = document.querySelectorAll('.foot-num__on');
	const numberMinusList = document.querySelectorAll('.foot-num__minus');
	const numberPlusList = document.querySelectorAll('.foot-num__plus');
 
	addButtonCart.forEach(function (button, index) {
	  button.addEventListener('click', function () {
		 const productId = button.dataset.id;
		 const selectedProduct = productInfo.find(product => product.id == productId);
		 const currentValue = parseInt(numberProducts[index].textContent);
 
		 if (selectedProduct && currentValue > 0) {
			const existingIndex = cartItems.findIndex(item => item.id === productId);
 
			if (existingIndex !== -1) {
			  cartItems[existingIndex].count += currentValue;
			} else {
			  cartItems.push({ ...selectedProduct, count: currentValue });
			}
 
			// Reset product count to 0
			numberProducts[index].textContent = 0;
 
			updateCartView();
		 }
	  });
	});
 
	numberPlusList.forEach(function (numberPlus, index) {
	  numberPlus.addEventListener('click', function () {
		 let currentProduct = numberProducts[index];
		 let currentValue = parseInt(currentProduct.textContent);
 
		 currentValue += 1;
		 currentProduct.textContent = currentValue;
	  });
	});
 
	numberMinusList.forEach(function (numberMinus, index) {
	  numberMinus.addEventListener('click', function () {
		 let currentProduct = numberProducts[index];
		 let currentValue = parseInt(currentProduct.textContent);
 
		 if (currentValue > 0) {
			currentValue -= 1;
		 }
 
		 currentProduct.textContent = currentValue;
	  });
	});
 
	function updateCartView() {
	  const cartContainer = document.querySelector('.flex');
	  const totalPriceElement = document.querySelector('#total-price');
	  let totalPrice = 0;
 
	  cartContainer.innerHTML = '';
 
	  cartItems.forEach(function (item) {
		 const itemDiv = document.createElement('div');
		 itemDiv.classList.add('cart-item');
 
		 const itemImage = document.createElement('img');
		 itemImage.classList.add('foto__koshukk');
		 itemImage.src = item.imageSrc;
		 itemImage.style.width = '150px';
		 itemImage.style.height = '100px';
		 itemDiv.appendChild(itemImage);
 
		 const itemDetails = document.createElement('div');
		 itemDetails.classList.add('product-koshuk__info')
 
		 const itemName = document.createElement('span');
		 itemName.textContent = item.name;
		 itemDetails.append(itemName)
 
		 const itemPrice = document.createElement('span');
		 itemPrice.textContent = `$${(item.price * item.count).toFixed(2)}`
		 itemDetails.append(itemPrice);
 
		 const itemNumber = document.createElement('span');
		 itemNumber.textContent = `Кількість: ${item.count}`
		 itemDetails.appendChild(itemNumber);
 
		 itemDiv.appendChild(itemDetails);
 
		 let deleteButton = document.createElement('button');
		 deleteButton.classList.add('btn-x');
		 deleteButton.textContent = 'X';
		 deleteButton.addEventListener('click', function () {
			removeItemFromCart(item.id);
		 });
		 itemDiv.appendChild(deleteButton);
 
		 cartContainer.appendChild(itemDiv);
 
		 totalPrice += item.price * item.count;
	  });
 
	  totalPriceElement.textContent = 'Загальна сума $' + totalPrice.toFixed(2);
 
	  updateCartQuantity();
	}
 
	function updateCartQuantity() {
	  const koshukNumber = document.querySelector('.cart-header__quantity');
	  koshukNumber.textContent = cartItems.reduce((total, item) => total + item.count, 0);
	}
 
	function removeItemFromCart(productId) {
	  const index = cartItems.findIndex(function (item) {
		 return item.id == productId;
	  });
	  if (index !== -1) {
		 const removedItem = cartItems.splice(index, 1)[0];
		 updateCartView();
	  }
	}
 
	updateCartQuantity();
 });
 