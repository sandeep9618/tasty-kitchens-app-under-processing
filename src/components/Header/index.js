import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  onClickToLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-bg-container">
        <div className="logo-container-for-header">
          <Link to="/" className="link-item">
            <img
              src="https://res.cloudinary.com/dj3r4fhqp/image/upload/v1679060481/Vector_1_xthlvl.png"
              alt="website logo"
              className="header-website-logo"
            />
          </Link>
          <h1 className="tasty-kitchens-heading-for-header">Tasty Kitchens</h1>
        </div>

        <div className="logo-container-for-header">
          <Link to="/" className="link-item">
            <p className="home-btn">Home</p>
          </Link>
          <Link to="/cart" className="link-item">
            <p className="cart-btn">Cart</p>
          </Link>
          <button
            type="button"
            className="logout-btn"
            onClick={this.onClickToLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
