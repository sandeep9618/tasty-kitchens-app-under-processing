import {Component} from 'react'
import {Link} from 'react-router-dom'

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
          <h1>No Order Yet!</h1>
          <p className="empty-cart-description">
            Your cart is empty. Add something from the menu.
          </p>
          <Link to="/">
            <button className="order-now-btn" type="button">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Cart
