import './index.css'
import RestaurantItem from '../RestaurantItem'

const PopularRestaurants = props => {
  const {restaurantsDetails} = props
  return (
    <ul className="restaurants-bg-container">
      {restaurantsDetails.map(eachItem => (
        <RestaurantItem eachItem={eachItem} key={eachItem.id} />
      ))}
    </ul>
  )
}
export default PopularRestaurants
