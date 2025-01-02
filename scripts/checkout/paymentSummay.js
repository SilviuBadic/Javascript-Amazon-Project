import { cart } from "../../data/cart.js";
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { getDeliveryOptions } from "../../data/deliveryOptions.js";


let countElements = document.querySelectorAll('.js-order-numbers');

export function renderPaymentSummary(){

  let theProductPriceCents = 0;
  let centsToEuro = 0;
  let theShippingItems = 0;
  

  JSON.parse(localStorage.getItem('count'));
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  countElements.innerHTML = cartQuantity;
  localStorage.setItem('count', JSON.stringify(cartQuantity));


  cart.forEach((cartItem) => {
   const product = getProduct(cartItem.productId);
   theProductPriceCents += product.priceCents * cartItem.quantity;
   centsToEuro = theProductPriceCents;

   let shippingAndHandling = getDeliveryOptions(cartItem.deliveryOptionId);
   theShippingItems += shippingAndHandling.priceCents;
  });

  let totalBeforeTax = (Number(centsToEuro) + Number(theShippingItems)).toFixed(2);
  let estimatedTax = ((totalBeforeTax * 0.1)).toFixed(2);
  let totalOrder = (Number(estimatedTax) + Number(totalBeforeTax)).toFixed(2);


  console.log(centsToEuro);
  console.log(theShippingItems);
  console.log('hello, working good');

  let paymentSummary = document.querySelector('.js-payment-summary');

  paymentSummary.innerHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div class="js-order-numbers">Items (${countElements.innerHTML})</div>
    <div class="payment-summary-money">$${formatCurrency(centsToEuro)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatCurrency(theShippingItems)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatCurrency(totalOrder)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `;

}

renderPaymentSummary();
document.addEventListener('DOMContentLoaded', ()=>{
  renderPaymentSummary()();
})