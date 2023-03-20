import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dj3r4fhqp/image/upload/v1679321815/erroring_1_upd776.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button className="not-found-btn" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
