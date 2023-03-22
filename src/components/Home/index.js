/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {BsFilterLeft} from 'react-icons/bs'

import Header from '../Header'
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
  state = {offersDetails: [], offersApiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getOfferDetails()
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
    } else {
      this.setState({offersApiStatus: apiStatusConstants.failure})
    }
  }

  loaderView = () => (
    <div data-testid="restaurants-offers-loader" className="loader-container">
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

  renderFilterView = () => (
    <div className="popular-restaurents-heading-container">
      <h1 className="popular-heading">Popular Restaurants</h1>
      <div className="filter-and-para-container">
        <p className="popular-paragraph">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="filter-container">
          <BsFilterLeft size={22} color="#475569" />
        </div>
      </div>
    </div>
  )

  render() {
    return (
      <div>
        <Header />
        <div className="home-container">
          {this.renderOfferDetailsStateWise()}
          {this.renderFilterView()}
        </div>
      </div>
    )
  }
}

export default Home
