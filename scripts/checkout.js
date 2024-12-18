import { cart, removeFromCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency} from './utils/money.js';

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
let theElement;

// added an event listener for every update button, so we can change the value inside the quantity:

updateBtn.forEach((update) => {
  update.addEventListener('click', ()=>{

    // Identify the current product (container)
    const theParent = update.closest('.cart-item-container ');
    
    update.style.display = 'none';
    // Dynamically added the input and "Save" buttons

    
    newUpdatesElements =  `
    <input class="quantity-input type="number" value="1">
    <span class="save-quantity-link link-primary js-saveBtn">Save</span>
    `;

    theParent.classList.add('is-editing-quantity');

    theElement = theParent.querySelector('.js-update-text').innerHTML = newUpdatesElements;

    // Added the event listener for the Save buttons

    const saveBtn = theParent.querySelector('.js-saveBtn');
    saveBtn.addEventListener('click', ()=> {
      update.style.display = 'inline';
      // Read the value from the input
      let newQuantity = theParent.querySelector('.quantity-input').value;

      if(newQuantity > 0){
        let productId = update.dataset.productId;
        let cartItem = cart.find(item => item.productId === productId);
        cartItem.quantity = Number(newQuantity);

        theParent.querySelector('.js-quantity').innerHTML = newQuantity;

        // save the value to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

      } else {
        console.warn('Invalid quantity entered');
        return;
      }
      // after we found out the input and replaced it we have to delete the <input> and Save button and add the number in his initial place;

      console.log('removing input and Save btn');

      theParent.querySelector('.js-update-text').innerHTML = '';
      theParent.classList.remove('is-editing-quantity');

     updateCartQuantity();
      })
    })
  });



  

