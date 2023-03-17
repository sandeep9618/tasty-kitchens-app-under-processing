import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {userNameIp: '', userPassIp: ''}

  onChangerUserNameIp = event => {
    this.setState({userNameIp: event.target.value})
  }

  onChangerUserPasswordIp = event => {
    this.setState({userPassIp: event.target.value})
  }

  onClickToLogin = event => {
    event.preventDefault()
  }

  render() {
    const {userNameIp, userPassIp} = this.state
    console.log(userNameIp, userPassIp)
    return (
      <div className="login-bg-container">
        <div className="login-form-bg-container">
          <form className="login-form-container" onSubmit={this.onClickToLogin}>
            <div className="login-logo-and-title-container">
              <img
                src="https://res.cloudinary.com/dj3r4fhqp/image/upload/v1679060481/Vector_1_xthlvl.png"
                alt="website logo"
              />
              <h1 className="login-website-heading">Tasty Kitchens</h1>
              <h1 className="login-heading">Login</h1>
            </div>

            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="login-input"
              onChange={this.onChangerUserNameIp}
              value={userNameIp}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="login-pass-input"
              onChange={this.onChangerUserPasswordIp}
              value={userPassIp}
            />
            <p className="error-msg">please</p>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dj3r4fhqp/image/upload/ar_1:1,c_fill,co_rgb:ffffff,dn_54,g_auto,w_1000/v1678866929/Rectangle_1456_l9mght.png"
          alt="website login"
          className="website-login-img-desktop"
        />
      </div>
    )
  }
}

export default Login
