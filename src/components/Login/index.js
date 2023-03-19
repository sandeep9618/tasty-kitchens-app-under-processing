import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {userNameIp: '', userPassIp: '', errorMsg: '', isShowError: false}

  onChangerUserNameIp = event => {
    this.setState({userNameIp: event.target.value, isShowError: false})
  }

  onChangerUserPasswordIp = event => {
    this.setState({userPassIp: event.target.value, isShowError: false})
  }

  onClickToLogin = async event => {
    event.preventDefault()
    const {userNameIp, userPassIp} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userData = {username: userNameIp, password: userPassIp}
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const jsonData = await response.json()
      const {history} = this.props
      Cookies.set('jwt_token', jsonData, {expires: 3, path: '/login'})
      history.replace('/')
    } else {
      const jsonData = await response.json()
      this.setState({errorMsg: jsonData.error_msg, isShowError: true})
    }
  }

  render() {
    const {userNameIp, userPassIp, errorMsg, isShowError} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-desk-top-bg-container">
          <div className="login-form-bg-container">
            <form
              className="login-form-container"
              onSubmit={this.onClickToLogin}
            >
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
              {isShowError ? <p className="error-msg">{errorMsg}</p> : null}
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

        <div className="mobile-login-bg-container">
          <img
            src="https://res.cloudinary.com/dj3r4fhqp/image/upload/v1678866715/Rectangle_1457_1_qrjij2.png"
            alt="website login"
            className="mobile-login-img"
          />
          <h1 className="login-heading">Login</h1>

          <form className="login-form-container" onSubmit={this.onClickToLogin}>
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
            {isShowError ? <p className="error-msg">{errorMsg}</p> : null}
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </>
    )
  }
}

export default Login
