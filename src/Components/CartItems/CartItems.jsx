import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

export const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart, addToCart } = useContext(ShopContext);
  const [orderDetails, setOrderDetails] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDecrease = (itemId) => {
    removeFromCart(itemId);
  };

  const handleIncrease = (itemId) => {
    addToCart(itemId);
  };

  const handleBuyNow = () => {
    // Check if any field is blank
    if (!orderDetails.phone || !orderDetails.firstName || !orderDetails.lastName || !orderDetails.address || !orderDetails.email) {
      alert('Please fill in all the fields.');
    } else {
      // All fields are filled, show the success message
      alert('Your order confirmed successfully!');
      window.location.href = '/';
    }
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

            <div className='promobox'>
              <input
                name="phone"
                className="cartitems-promobox"
                type="number"
                placeholder="Phone"
                value={orderDetails.phone}
                onChange={handleInputChange}
              />
              <input
                name="firstName"
                className="cartitems-promobox"
                type="text"
                placeholder="First Name"
                value={orderDetails.firstName}
                onChange={handleInputChange}
              />
              <input
                name="lastName"
                className="cartitems-promobox"
                type="text"
                placeholder="Last Name"
                value={orderDetails.lastName}
                onChange={handleInputChange}
              />
              <input
                name="address"
                className="cartitems-promobox"
                type="text"
                placeholder="Address"
                value={orderDetails.address}
                onChange={handleInputChange}
              />
              <input
                name="email"
                className="cartitems-promobox"
                type="email"
                placeholder="Email"
                value={orderDetails.email}
                onChange={handleInputChange}
              />
              <button onClick={handleBuyNow}>BUY NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
