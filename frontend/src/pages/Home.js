import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'

const Home = () => (
  <div className="home-container">
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="home-title">Welcome to Job Portal</h1>
        <p className="home-subtitle">Find your dream job or post a job opening – everything in one place.</p>
        <div className="home-links">
          <Link to="/login" className="home-button">Login</Link>
          <Link to="/register" className="home-button">Register</Link>
        </div>
      </div>
    </div>

    <div className="home-info">
      <h2 className="info-title">Why Use Our Job Portal?</h2>
      <div className="info-list">
        <div className="info-item">
          <img src="2.jpg" alt="2" className="info-icon" />
          <p>Quick and easy job search</p>
        </div>
        <div className="info-item">
          <img src="3.jpg" alt="3" className="info-icon" />
          <p>Verified employer listings</p>
        </div>
        <div className="info-item">
          <img src="4.jpg" alt="4" className="info-icon" />
          <p>Simple registration process</p>
        </div>
        <div className="info-item">
          <img src="5.jpg" alt="5" className="info-icon" />
          <p>Post and manage job listings</p>
        </div>
      </div>
      <p className="info-description">Start your career journey or find the perfect candidate today!</p>
    </div>

    <style>
      {`
        /* General Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Hero Section */
        .hero-section {
  position: relative;
  height: 100vh;
  background-image: url('https://png.pngtree.com/background/20211216/original/pngtree-flat-job-search-with-magnifying-glass-illustration-background-picture-image_1509708.jpg');
  background-size: cover;      /* This ensures the image covers the entire section */
  background-position: center; /* This centers the image */
  background-repeat: no-repeat; /* This prevents the image from repeating */
  overflow: hidden;            /* Ensures no overflow of the image */
}


        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
        }

        .home-title {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .home-subtitle {
          font-size: 1.5rem;
          margin-bottom: 30px;
        }

        .home-links {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .home-button {
          padding: 10px 30px;
          background-color: #007bff;
          color: white;
          font-size: 1rem;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .home-button:hover {
          background-color: #0056b3;
        }

        /* Info Section */
        .home-info {
          background-color: #f9f9f9;
          padding: 40px 20px;
          text-align: center;
        }

        .info-title {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .info-list {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }

        .info-item {
          width: 220px;
          text-align: center;
          margin: 20px;
        }

        .info-icon {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 15px;
        }

        .info-description {
          font-size: 1.2rem;
          color: #555;
        }

        @media (max-width: 768px) {
          .info-list {
            flex-direction: column;
          }

          .info-item {
            width: 100%;
          }
        }
      `}
    </style>
  </div>
);

export default Home;
