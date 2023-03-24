import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'

import './index.css'

class CartItem extends Component {
  render() {
    const {eachCartItem} = this.props
    const {imageUrl, cost, name, quantity} = eachCartItem
    return (
      <li className="cart-item-details">
        <div className="cart-img-and-name-container">
          <img src={imageUrl} alt="" className="cart-item-img" />
          <h1 className="cart-food-item-name">{name}</h1>
        </div>

        <div className="quantity-container">
          <button type="button" className="increment-count-btn">
            -
          </button>
          <p className="count-para">{quantity}</p>
          <button type="button" className="increment-count-btn">
            +
          </button>
        </div>

        <div className="cart-amount-container">
          <FaRupeeSign size={16} color="#FFA412" />

          <p className="cart-item-cost">{cost}</p>
        </div>
      </li>
    )
  }
}

export default CartItem
