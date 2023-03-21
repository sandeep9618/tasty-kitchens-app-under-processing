import {Component} from 'react'

import Header from '../Header'
import './index.css'

class Cart extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="cart-bg-container">
          <img
            src="https://res.cloudinary.com/dj3r4fhqp/image/upload/v1679383718/cooking_1_enbhbb.png"
            alt="empty cart"
            className="empty-cart-img"
          />
          <h1>No Orders Yet!</h1>
          <p className="empty-cart-description">
            Your cart is empty. Add something from the menu.
          </p>
          <button className="order-now-btn">Order Now</button>
        </div>
      </div>
    )
  }
}

export default Cart
