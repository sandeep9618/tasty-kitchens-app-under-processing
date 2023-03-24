/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'

import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {restaurantDetails: {}, fetchingStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getSpecificRestaurantDetails()
  }

  getCsFoodItems = data => {
    const csData = data.map(i => ({
      cost: i.cost,
      foodType: i.food_type,
      id: i.id,
      imageUrl: i.image_url,
      name: i.name,
      rating: i.rating,
    }))
    return csData
  }

  getCamelCaseData = jsonData => {
    const camelCaseData = {
      costForTwo: jsonData.cost_for_two,
      cuisine: jsonData.cuisine,
      foodItems: this.getCsFoodItems(jsonData.food_items),
      id: jsonData.id,
      imageUrl: jsonData.image_url,
      itemsCount: jsonData.items_count,
      location: jsonData.location,
      name: jsonData.name,
      opensAt: jsonData.opens_at,
      rating: jsonData.rating,
      reviewsCount: jsonData.reviews_count,
    }
    return camelCaseData
  }

  getSpecificRestaurantDetails = async () => {
    this.setState({fetchingStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const fetchUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {authorization: `bearer ${jwtToken}`},
    }
    const response = await fetch(fetchUrl, options)
    if (response.ok === true) {
      const jsonData = await response.json()
      const csData = this.getCamelCaseData(jsonData)
      this.setState({
        restaurantDetails: csData,
        fetchingStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderFoodItems = () => {
    const {restaurantDetails} = this.state
    const {foodItems} = restaurantDetails
    return (
      <ul className="food-items-container">
        {foodItems.map(eachFoodItem => (
          <FoodItem eachFoodItem={eachFoodItem} key={eachFoodItem.id} />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => {
    const {restaurantDetails} = this.state
    const {
      imageUrl,
      cuisine,
      location,
      name,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantDetails
    return (
      <div className="restaurant-details-container">
        <div className="banner-details-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-details-img"
          />
          <div className="restaurant-banner-details">
            <h1 className="banner-heading">{name}</h1>
            <p className="banner-cuisine">{cuisine}</p>
            <p className="banner-location">{location}</p>

            <div className="banner-rating-and-cost-container">
              <div className="banner-rating-and-count-of-reviews-container">
                <div className="banner-rating-container">
                  <AiFillStar color="#ffffff" size={20} />
                  <p className="banner-rating-para">{rating}</p>
                </div>
                <p className="banner-no-of-reviews">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="banner-hr-line" />
              <div>
                <div className="banner-rating-container">
                  <FaRupeeSign color="#ffffff" size={16} />
                  <p className="banner-cost-for-two-para">{costForTwo}</p>
                </div>
                <p className="banner-no-of-reviews">Cost For Two</p>
              </div>
            </div>
          </div>
        </div>
        {this.renderFoodItems()}
        <Footer />
      </div>
    )
  }

  renderRestaurantDetails = () => {
    const {fetchingStatus} = this.state
    switch (fetchingStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="restaurant-details-bg-container">
          {this.renderRestaurantDetails()}
        </div>
      </div>
    )
  }
}

export default RestaurantDetails
