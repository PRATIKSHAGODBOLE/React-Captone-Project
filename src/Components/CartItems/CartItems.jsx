import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

export const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, addToCart } = useContext(ShopContext);

  const handleDecrease = (itemId) => {
    removeFromCart(itemId);
  };

  const handleIncrease = (itemId) => {
    addToCart(itemId);
  };

  return (
    <div>
      <div className="cartitems">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="cartitems-format cartitems-format-main">
                  <div className="cartitem-product">
                    <img src={e.image} alt="" className='carticon-product-icon' />
                  </div>
                  <div className="cartitem-details">
                    <p>{e.name}</p>
                  </div>
                  <div className="cartitem-price">
                    <p>${e.new_price}</p>
                  </div>
                  <div className="cartitem-quantity">
                    <button className='cartitems-quantity-btn' onClick={() => handleDecrease(e.id)}>-</button>
                    <span className='cartitems-quantity'>{cartItems[e.id]}</span>
                    <button className='cartitems-quantity-btn' onClick={() => handleIncrease(e.id)}>+</button>
                  </div>
                  <div className="cartitem-total">
                    <p>${e.new_price * cartItems[e.id]}</p>
                  </div>
                  <div className="cartitem-remove">
                    <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                  </div>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}

        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className='cartitems-total-item' >
                <h3>Total</h3>
                <h3>${getTotalCartAmount()}</h3>
              </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cartitems-promocode">
            <h1>Place Your Order</h1>

            <div  className='promobox'>
              <input className="cartitems-promobox" type="number" placeholder="Phone" />
              <input  className="cartitems-promobox" type="text" placeholder="First Name" />
              <input className="cartitems-promobox"  type="text" placeholder="Last Name" />
              <input className="cartitems-promobox"  type="text" placeholder="Address" />
              <input className="cartitems-promobox"  type="email" placeholder="Email" />
              <button>BUY NOW</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
