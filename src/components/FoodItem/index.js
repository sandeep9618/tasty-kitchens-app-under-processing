/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import './index.css'

class FoodItem extends Component {
  state = {isAddBtnVisible: true, count: 1}

  onToggleAddBtn = () => {
    const {count} = this.state
    const {eachFoodItem} = this.props
    const {id, name, imageUrl, cost} = eachFoodItem
    const obj = {cost, quantity: count, id, imageUrl, name}
    const item = localStorage.getItem('cartData')
    if (item === null) {
      localStorage.setItem('cartData', JSON.stringify([obj]))
    } else {
      let parsedData = JSON.parse(item)
      parsedData = [...parsedData, obj]

      localStorage.setItem('cartData', JSON.stringify(parsedData))
    }

    this.setState(i => ({
      isAddBtnVisible: !i.isAddBtnVisible,
    }))
  }

  onIncrementCount = () => {
    const {count} = this.state
    const {eachFoodItem} = this.props
    const {id, name, imageUrl, cost} = eachFoodItem
    const obj = {cost, quantity: count, id, imageUrl, name}
    if (count > 0) {
      this.setState(i => ({count: i.count + 1}))
      console.log(obj)
    }
  }

  onDecrementCount = () => {
    const {count, isAddBtnVisible} = this.state
    if (count > 1) {
      this.setState(i => ({count: i.count - 1}))
    } else {
      this.setState({isAddBtnVisible: !isAddBtnVisible})
    }
  }

  render() {
    const {eachFoodItem} = this.props
    const {cost, imageUrl, id, name, rating} = eachFoodItem
    const {isAddBtnVisible, count} = this.state
    return (
      <li className="food-item-container" testid="foodItem">
        <img src={imageUrl} alt="food-item" className="food-item-img" />
        <div className="food-item-name-cost-rating-container">
          <h1 className="food-item-name">{name}</h1>
          <div className="cost-container">
            <BiRupee size={13} />
            <p className="food-item-cost">{parseFloat(cost).toFixed(2)}</p>
          </div>
          <div className="rating-container">
            <AiFillStar size={16} color="#FFCC00" />
            <p className="food-item-rating">{rating}</p>
          </div>
          {isAddBtnVisible ? (
            <button
              type="button"
              className="food-item-add-btn"
              onClick={this.onToggleAddBtn}
            >
              Add
            </button>
          ) : (
            <div className="add-counter-container">
              <button
                type="button"
                testid="decrement-count"
                onClick={this.onDecrementCount}
                className="increment-count-btn"
              >
                -
              </button>
              <p testid="active-count" className="count-para">
                {count}
              </p>
              <button
                type="button"
                testid="increment-count"
                onClick={this.onIncrementCount}
                className="increment-count-btn"
              >
                +
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
