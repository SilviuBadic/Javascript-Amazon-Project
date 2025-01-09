import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderOrderSummery } from "../../scripts/checkout/ordersSummary.js";

import { cart, addToCart } from "../../data/cart.js";

describe('test suite: renderOrderSummary', ()=>{
  it('displays the cart', ()=>{
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary">
    </div>
    `;

    SpyOn(localStorage, 'getItem').and.callFake(()=> {
      return JSON.stringify([{
        productId: '',
        quantity: 1,
        deliveryOptions: '1'
      }]);
    });
    loadFromStorage();
  })
})