import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../component/Carousel.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Carousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("./data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((data) => setDonations(data))
      .catch((error) => console.error(error));
  }, []);

  const openModal = (donation) => {
    Swal.fire({
      title: donation.cause,
      text: donation.details,
      imageUrl: donation.picture,
      imageWidth: 400,
      imageHeight: 250,
      imageAlt: donation.cause,
      confirmButtonText: "Close",
      customClass: {
        title: 'text-2xl font-bold',
        content: 'text-lg',
      },
    });
  };

  return (
    <div className="slider-container mx-4 lg:mx-8 xl:mx-16 2xl:mx-24">
      <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl mt-6 mb-2 font-bold">
        Our Programs
      </h1>

      <Slider {...settings}>
        {donations.map((donation) => (
          <div key={donation.id} className="mt-6 lg:mt-10">
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={donation.picture}
                  alt={donation.cause}
                  className="w-full h-40 object-cover sm:h-48 lg:h-56"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg sm:text-xl lg:text-2xl">
                  {donation.cause}
                </h2>
                <p className="text-sm sm:text-base">{donation.motivationalLine}</p>
                <div className="card-actions flex flex-col sm:flex-row gap-2">
                  <button
                    className="btn btn-primary w-full sm:w-auto"
                    onClick={() => openModal(donation)}
                  >
                    Learn More
                  </button>
                  <Link to="/register" className="btn btn-primary w-full sm:w-auto">
                    Join Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
