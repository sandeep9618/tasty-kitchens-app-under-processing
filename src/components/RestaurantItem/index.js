const RestaurantItem = props => {
  const {eachItem} = props
  const {cuisine, id, name, userRating, imageUrl} = eachItem
  return (
    <li className="restaurant-item">
      <img src={imageUrl} className="restaurant-img" />
      <p>{name}</p>
    </li>
  )
}

export default RestaurantItem
