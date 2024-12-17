import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency} from './utils/money.js';
let checkoutHTML = ``;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
      let listCheckout = products.find((product) => product.id === productId);
      console.log(listCheckout);

      checkoutHTML +=  
      `
        <div class="cart-item-container js-cart-item-container-${listCheckout.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
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
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id = "${listCheckout.id}">
                  Update
                </span>

                <span class="js-update-text">
                </span>

                <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${listCheckout.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="delivery-option-${listCheckout.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
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
                    Wednesday, June 15
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
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    }); 

document.querySelector('.js-order-summary').innerHTML = checkoutHTML;
const deleteBtn = document.querySelectorAll('.js-delete-link');

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

let theInputValue = document.querySelector('.js-update-text');
let newUpdatesElements;
let theElement;

updateBtn.forEach((update) => {
  update.addEventListener('click', ()=>{
    let productId = update.dataset.productId;
    console.log(`The product id for this one is: ${productId}`);

    newUpdatesElements =  `
    <input class="quantity-input">
    <span class="save-quantity-link link-primary">Save</span>
    `;

    const theParent = update.closest('.cart-item-container ');
    theParent.classList.add('is-editing-quantity');
    theElement = theParent.querySelector('.js-update-text').innerHTML = newUpdatesElements;
    });

    console.log(theElement);
  });

