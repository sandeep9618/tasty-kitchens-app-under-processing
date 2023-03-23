/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

const RestaurantItem = props => {
  const {eachItem} = props
  const {cuisine, id, name, userRating, imageUrl} = eachItem
  const {totalReviews, rating} = userRating
  return (
    <Link
      to={`/restaurant/${id}`}
      className="link-item-popular-rest"
      testid="restaurant-item"
    >
      <li className="restaurant-item">
        <img src={imageUrl} className="restaurant-img" alt="restaurant" />
        <div className="rating-and-restaurant-name-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="rating-container">
            <AiFillStar color="#FFCC00" size={20} />
            <p className="rating-para">{rating}</p>
            <h1 className="total-reviews-para">({totalReviews} ratings)</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
