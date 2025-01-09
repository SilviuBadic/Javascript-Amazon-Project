import { cart, addToCart } from "../../data/cart.js";

describe('test suite: addToCart', ()=> {
  it('add an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem('cart'))
  });

  it('add a new product to the cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1)
  })
})