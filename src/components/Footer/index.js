import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-bg-container">
    <div className="footer-website-logo-and-name-container">
      <img
        src="https://res.cloudinary.com/dj3r4fhqp/image/upload/v1679549757/Frame_275_kpb6hn.png"
        alt="website-footer-logo"
        className="footer-website-logo"
      />
      <h1 className="footer-website-name">Tasty Kitchens</h1>
    </div>
    <p className="contact-us-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-icons-container">
      <FaPinterestSquare
        size={30}
        color="#ffffff"
        testid="pintrest-social-icon"
      />
      <FaInstagram size={30} color="#ffffff" testid="instagram-social-icon" />
      <FaTwitter size={30} color="#ffffff" testid="twitter-social-icon" />
      <FaFacebookSquare
        size={30}
        color="#ffffff"
        testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
