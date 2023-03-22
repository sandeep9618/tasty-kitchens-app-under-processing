const FilterOption = props => {
  const {eachItem} = props
  const {displayText, value} = eachItem
  return <option value={value}>{displayText}</option>
}

export default FilterOption
