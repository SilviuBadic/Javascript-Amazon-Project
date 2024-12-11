
// I iniliazed an empty variable in which I will put all the list and checkout values;

let listCheckout = '';
let countButtons = 0;

// we loop through each product of the bage. and we apply an event listener for each button
  products.forEach((element) => {
    element.addEventListener('click',  () => {
      let countItems = document.querySelectorAll('.js-count-items');
      
      listCheckout +=  
      `
      <div class="main">
        <div class="page-title">Review your order</div>
          <div class="order-summary">
            <div class="cart-item-container">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${product.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                  ${product.name}
                  </div>
                  <div class="product-price">
                    $${(product.priceCents / 100).toFixed(2) }
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${product.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary">
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
                      name="delivery-option-1">
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
                      name="delivery-option-1">
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
                      name="delivery-option-1">
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
  
            <div class="cart-item-container">
              <div class="delivery-date">
                Delivery date: Wednesday, June 15
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="images/products/intermediate-composite-basketball.jpg">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    Intermediate Size Basketball
                  </div>
                  <div class="product-price">
                    $20.95
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">1</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
  
                  <div class="delivery-option">
                    <input type="radio" class="delivery-option-input"
                      name="delivery-option-2">
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
                    <input type="radio" checked class="delivery-option-input"
                      name="delivery-option-2">
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
                    <input type="radio" class="delivery-option-input"
                      name="delivery-option-2">
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
          </div>
  
          <div class="payment-summary">
            <div class="payment-summary-title">
              Order Summary
            </div>
  
            <div class="payment-summary-row">
              <div>Items (3):</div>
              <div class="payment-summary-money">$42.75</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$4.99</div>
            </div>
  
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$47.74</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$4.77</div>
            </div>
  
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$52.51</div>
            </div>
  
            <button class="place-order-button button-primary">
              Place your order
            </button>
          </div>
      
      `
   
  
    })
  });  
let checkoutDiv = document.querySelector('.js-checkout-grid');

checkoutDiv.innerHTML = listCheckout;