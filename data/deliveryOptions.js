import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id : '1',
    deliveryDays : 7,
    priceCents: 0
  },

  {
    id : '2',
    deliveryDays : 3,
    priceCents: 499
  },

  {
    id : '3',
    deliveryDays : 1,
    priceCents: 999
  }
]

export function getDeliveryOptions(deliveryOptionId){
  let deliveryOption;
  deliveryOption = deliveryOptions.find(option => String(option.id) === String(deliveryOptionId));
  return deliveryOption || deliveryOptions[0];
}

export function getProduct(productId){
    let listCheckout;
    listCheckout = products.find((product) => product.id === productId);
  return listCheckout;
}

