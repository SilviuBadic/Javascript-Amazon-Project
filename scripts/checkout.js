import { cart, removeFromCart, updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency} from './utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


hello();

const now = dayjs();
const delivery_date = now.add(7, 'days')
const final_date = delivery_date.format('dddd, MMMM D')
console.log(final_date);


JSON.parse(localStorage.getItem('cart')) || [];
console.log('cart after initialization', cart)

let checkoutHTML = ``;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
      let listCheckout = products.find((product) => product.id === productId);
      console.log(listCheckout);

      checkoutHTML +=  
      `
        <div class="cart-item-container js-cart-item-container-${listCheckout.id}">
          <div class="delivery-date">
            Delivery date: ${final_date}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${listCheckout.image}">

            <div class="cart-item-details">
              <div class="product-name">
              ${listCheckout.name}
              </div>
              <div class="product-price">
                $${formatCurrency(listCheckout.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  <class="show-quantity">Quantity:
                  <span class="quantity-label js-quantity">${cartItem.quantity}</span>
              
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id = "${listCheckout.id}">
                  Update
                </span>

                <span class="js-update-text">
                </span>

                <span class="delete-quantity-link link-primary js-delete-link js-delete-link2" data-product-id = "${listCheckout.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options js-delivery-options">
              
            </div>
          </div>
        </div>
      `
    }); 

document.querySelector('.js-order-summary').innerHTML = checkoutHTML;
let deleteBtn = document.querySelectorAll('.js-delete-link');

deleteBtn.forEach( (link) => {
  link.addEventListener('click', ()=>{
    let productId = link.dataset.productId;
    removeFromCart(productId);
    updateCartQuantity();
    console.log(cart);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove(); 
  });
});
console.log(checkoutHTML);


document.addEventListener('DOMContentLoaded', ()=>{
  updateCartQuantity();
})

function updateCartQuantity(){

  let theCheckoutQuantity = document.querySelector('.js-checkout-counter');

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  theCheckoutQuantity.innerHTML = `${cartQuantity} items`;
  console.log(`${cartQuantity} is the quantity`);
}

let updateBtn = document.querySelectorAll('.js-update-link');
let newUpdatesElements;

// added an event listener for every update button, so we can change the value inside the quantity:

updateBtn.forEach((update) => {
  update.addEventListener('click', () => {

    // Identify the current product (container)
    const theParent = update.closest('.cart-item-container ');
    
    update.style.display = 'none';

    // Dynamically added the input and "Save" buttons
    newUpdatesElements =  `
    <input class="quantity-input type="number" value="1">
    <span class="save-quantity-link link-primary js-saveBtn">Save</span>
    `;

    theParent.classList.add('is-editing-quantity');
    theParent.querySelector('.js-update-text').innerHTML = newUpdatesElements;

    // find the element and add focus on it
    const inputElement = theParent.querySelector('.quantity-input');
    inputElement.focus();

    // Find the save button
    const saveBtn = theParent.querySelector('.js-saveBtn');

    // Creates a function to update the quantity
    const updateQuantity = () => {
      const newQuantity = inputElement.value;

      if(newQuantity > 0 && newQuantity < 100){
        const productId = update.dataset.productId;
        const cartItem = cart.find(item => item.productId === productId);

        // Updating the quantity
        cartItem.quantity = Number(newQuantity);
        theParent.querySelector('.js-quantity').innerHTML = newQuantity;

        // save the value to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
      
        // deleting the input and display Save button;
        theParent.querySelector('.js-update-text').innerHTML = '';
        theParent.classList.remove('is-editing-quantity');

        // display the Update button again
        update.style.display = 'inline';

        // Update the total of quantity
        updateCartQuantity();

      } else {
        console.warn('Invalid quantity entered');
      }
    };

      // add event listener for Save button
      saveBtn.addEventListener('click', updateQuantity);
        
      // add event listener for Enter
      inputElement.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
          updateQuantity();
        }
      });
    });
  });



cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let listCheckout = products.find((product) => product.id === productId);

  //find the container for the current product
  const productContainer = document.querySelector(`.js-cart-item-container-${listCheckout.id}`);
  
  if (!productContainer){
    console.error(`Container for product ${productId} not found`); // if the container does not exist, stop the iteration
  }

  // Find the section for delivery

  const deliveryOptions = productContainer.querySelector('.js-delivery-options');

  if (!deliveryOptions){
    console.error(`Delivery options section for product ${productId} not found`);
    return; // if the container does not exist, stop the iteration
  }

  const freeShiping = now.add(1, 'days').format('dddd, MMMM D');
  const threeDaysShipping = now.add(3, 'days').format('dddd, MMMM D');
  const sevenDaysShipping = now.add(7, 'days').format('dddd, MMMM D')
  deliveryOptions.innerHTML = `
  <div class="delivery-options-title">
    Choose a delivery option:
  </div>
  <div class="delivery-option">
    <input type="radio" checked
      class="delivery-option-input"
      name="delivery-option-${listCheckout.id}">
    <div>
      <div class="delivery-option-date">
        ${freeShiping}
      </div>
      <div class="delivery-option-price">
        FREE Shipping
      </div>
    </div>
  </div>
  <div class="delivery-option">
    <input type="radio"
      class="delivery-option-input"
      name="delivery-option-${listCheckout.id}">
    <div>
      <div class="delivery-option-date">
        ${threeDaysShipping}
      </div>
      <div class="delivery-option-price">
        $4.99 - Shipping
      </div>
    </div>
  </div>
  <div class="delivery-option">
    <input type="radio"
      class="delivery-option-input"
      name="delivery-option-${listCheckout.id}">
    <div>
      <div class="delivery-option-date">
        ${sevenDaysShipping}
      </div>
      <div class="delivery-option-price">
        $9.99 - Shipping
      </div>
    </div>
  </div>
  `

});