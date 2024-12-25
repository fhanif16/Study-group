import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://media.istockphoto.com/id/2030273719/photo/students-studying-together-at-the-library.jpg?s=1024x1024&w=is&k=20&c=VbaqglDuCRaJtYkNn8phJ3uZ8uVlYY39fdG2xVG_jqs=)",
  }}>
  <div className="hero-overlay bg-opacity-40"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-3xl font-bold text-center">Study together Grow Together</h1>
      <p className="mb-5">
      For Individuals and charities. No startup fees. No hidden fees.
      </p>
      <button className="btn btn-primary"><Link to="/getStarted" >Get Started</Link> </button>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default Banner;