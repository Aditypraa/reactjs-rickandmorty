import { Link } from "react-router-dom";
import "./ErrorPage.scss";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page Not Found</h2>
        <div className="portal-animation">
          <img
            src="https://media2.giphy.com/media/l41JWw65TcBGjPpRK/giphy.gif"
            alt="Rick and Morty Portal"
          />
        </div>
        <p className="error-message">
          The page you're looking for doesn't exist or has been teleported to
          another dimension.
        </p>
        <Link to="/" className="btn btn-primary error-button">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
