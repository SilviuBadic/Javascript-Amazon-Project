export let cart = [
{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity : 2
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity : 1
}
];

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
      quantity : theValue
    });
  }
};

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach( (cartItem)=>{
    if (cartItem.productId !== productId){
      newCart.push(cartItem);
    };
    cart = newCart;
  })
}