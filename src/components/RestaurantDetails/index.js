/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class RestaurantDetails extends Component {
  state = {restaurantDetails: {}}

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
      this.setState({restaurantDetails: csData})
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="restaurant-bg-details">
          <Footer />
        </div>
      </div>
    )
  }
}

export default RestaurantDetails
