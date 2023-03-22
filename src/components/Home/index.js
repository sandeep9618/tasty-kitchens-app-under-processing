/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {BsFilterLeft} from 'react-icons/bs'

import Header from '../Header'
import FilterOption from '../FilterOption'
import PopularRestaurants from '../PopularRestaurants'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    offersDetails: [],
    offersApiStatus: apiStatusConstants.initial,
    restaurantsDetails: [],
    restaurantApiStatus: apiStatusConstants.initial,
    filterItem: sortByOptions[0].value,
  }

  componentDidMount() {
    this.getOfferDetails()
    this.getRestaurantsDetails()
  }

  convertingToCamelCase = data => {
    const csData = data.map(i => ({
      costForTwo: i.cost_for_two,
      cuisine: i.cuisine,
      groupByTime: i.group_by_time,
      hasOnlineDelivery: i.has_online_delivery,
      hasTableBooking: i.has_table_booking,
      id: i.id,
      imageUrl: i.image_url,
      isDeliveringNow: i.is_delivering_now,
      location: i.location,
      menuType: i.menu_type,
      name: i.name,
      opensAt: i.opens_at,
      userRating: i.user_rating,
    }))
    return csData
  }

  getRestaurantsDetails = async () => {
    this.setState({restaurantApiStatus: apiStatusConstants.inProgress})
    const {filterItem} = this.state
    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list?offset=${0}&limit=${9}&sort_by_rating=${filterItem}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {authorization: `bearer ${jwtToken}`},
    }
    const response = await fetch(restaurantsUrl, options)
    if (response.ok === true) {
      const jsonData = await response.json()
      const {restaurants} = jsonData
      const csData = this.convertingToCamelCase(restaurants)
      this.setState({
        restaurantsDetails: csData,
        restaurantApiStatus: apiStatusConstants.success,
      })
    }
  }

  getOfferDetails = async () => {
    this.setState({offersApiStatus: apiStatusConstants.inProgress})
    const fetchUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(fetchUrl, options)
    if (response.ok === true) {
      const jsonData = await response.json()
      const {offers} = jsonData
      const csData = offers.map(i => ({
        imageUrl: i.image_url,
        id: i.id,
      }))
      this.setState({
        offersDetails: csData,
        offersApiStatus: apiStatusConstants.success,
      })
    }
  }

  loaderView = () => (
    <div testid="restaurants-offers-loader" className="loader-container">
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  offerDetailsView = () => {
    const {offersDetails} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className="offers-details-container">
        <Slider {...settings}>
          {offersDetails.map(eachItem => (
            <div className="slider-item">
              <img src={eachItem.imageUrl} alt="offer" className="offer-img" />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderOfferDetailsStateWise = () => {
    const {offersApiStatus, offersDetails} = this.state
    switch (offersApiStatus) {
      case apiStatusConstants.inProgress:
        return this.loaderView()
      case apiStatusConstants.success:
        return this.offerDetailsView()
      default:
        return null
    }
  }

  setSortByOption = value => {
    this.setState({filterItem: value}, this.getRestaurantsDetails)
  }

  renderFilterView = () => (
    <div className="popular-restaurants-heading-container">
      <h1 className="popular-heading">Popular Restaurants</h1>
      <div className="filter-and-para-container">
        <p className="popular-paragraph">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="filter-container">
          <div className="filter-icon">
            <BsFilterLeft size={22} />
          </div>
          <p className="sort-by-para">Sort By</p>
          <select className="filter-options" onChange={this.setSortByOption}>
            {sortByOptions.map(eachItem => (
              <FilterOption eachItem={eachItem} key={eachItem.id} />
            ))}
          </select>
        </div>
      </div>
    </div>
  )

  renderRestaurantDetailsView = () => {
    const {restaurantsDetails} = this.state
    return <PopularRestaurants restaurantsDetails={restaurantsDetails} />
  }

  renderRestaurantDetailsStateWise = () => {
    const {restaurantApiStatus} = this.state
    switch (restaurantApiStatus) {
      case apiStatusConstants.inProgress:
        return this.loaderView()
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="home-container">
          {this.renderOfferDetailsStateWise()}
          {this.renderFilterView()}
          {this.renderRestaurantDetailsStateWise()}
        </div>
      </div>
    )
  }
}

export default Home
