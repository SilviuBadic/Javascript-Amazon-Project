
export let cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [
]


if(!cart){
  cart = [
    {
      productId: '4f4fbcc2-4e72-45cc-935c-9e13d79cc57f',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '8b5a2ee1-6055-422a-a666-b34ba28b76d4',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}

function saveToLocal(){
localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId){
  let matchingItem;

  let valueInside = document.querySelector(`.js-quantity-selector-${productId}`);

  let theValue = Number(valueInside.value);

  let addedText = document.querySelector(`.js-added-to-cart-${productId}`);
  addedText.classList.add('one-opacity');
  addedText.classList.remove('zero-opacity');
  
  const twoSeconds = setTimeout( () => {
    addedText.classList.add('zero-opacity');
  }, 2000);

  clearTimeout(() => {
    twoSeconds();
  }, 2000);

  console.log(`the selected value was: ${theValue}`);
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    } 
  });

  if (matchingItem){
    matchingItem.quantity += theValue;
  } else {
    cart.push({
      productId,
      quantity : theValue,
      deliveryOptionId: '1'
    });
  }

  saveToLocal();
};

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach( (cartItem)=>{
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    };
    cart = newCart;
  });

  saveToLocal();
}


export function updateQuantity(productId, newQuantity){
  addToCart(productId);
  if (matchingItem){
    matchingItem.quantity += theValue;
  } else {
    cart.push({
      productId,
      quantity : newQuantity
    });
  }
}