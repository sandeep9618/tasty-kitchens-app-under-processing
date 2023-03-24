import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import CartItem from '../CartItem'
import './index.css'

class Cart extends Component {
  state = {cartItems: []}

  componentDidMount() {
    this.renderCartItems()
  }

  renderCartItems = () => {
    let cartDetails = localStorage.getItem('cartData')
    cartDetails = JSON.parse(cartDetails)
    if (cartDetails !== null) {
      this.setState({cartItems: cartDetails})
    }
  }

  renderEmptyCartDetails = () => (
    <div className="empty-cart-bg-container">
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
  )

  renderCartItemsView = () => {
    const {cartItems} = this.state
    return (
      <div className="cart-items-bg-container">
        <div className="cart-details-headers">
          <p className="cart-header-item">Item</p>
          <p className="cart-header">Quantity</p>
          <p className="cart-header">Price</p>
        </div>
        <ul className="cart-items-container">
          {cartItems.map(eachCartItem => (
            <CartItem eachCartItem={eachCartItem} key={eachCartItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {cartItems} = this.state
    return (
      <div>
        <Header />
        <div className="cart-details-container">
          {cartItems.length === 0
            ? this.renderEmptyCartDetails()
            : this.renderCartItemsView()}
        </div>
      </div>
    )
  }
}

export default Cart
