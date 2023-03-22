import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  render() {
    return (
      <div className="header-bg-container">
        <Link to="/" className="link-item">
          <div className="logo-container-for-header">
            <img
              src="https://res.cloudinary.com/dj3r4fhqp/image/upload/v1679060481/Vector_1_xthlvl.png"
              alt="website logo"
              className="header-website-logo"
            />
            <h1 className="tasty-kitchens-heading-for-header">
              Tasty Kitchens
            </h1>
          </div>
        </Link>
        <div className="logo-container-for-header">
          <Link to="/">
            <button type="button" className="home-btn">
              Home
            </button>
          </Link>
          <Link to="/cart">
            <button type="button" className="cart-btn">
              Cart
            </button>
          </Link>
          <button type="button" className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
