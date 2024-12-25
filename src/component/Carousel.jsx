import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../component/Carousel.css'
import { FaBeer } from "react-icons/fa";

const Carousel = () => {
    const settings = {
       
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        arrows: true,
        prevArrow: <button type="button" className="slick-prev"> Previous</button>, 
        nextArrow: <button type="button" className="slick-next">Next</button>,
      };

      const [donations , setDonations] = useState([]);
      useEffect(()=> {
        fetch('./data.json')
        .then(response => response.json())
          
        .then(data => setDonations(data))
        

      }, [])

      

      
    return (
        <div className='slider-container mx-auto  justify-center'>
            <h1 className='text-center text-5xl mt-4 font-bold'>Our Programs</h1>
           
             <Slider {...settings}>
             {
                donations.map(donation => <div key={donation.id} className='mt-10 mb-28'>

<div>
             <div className="card bg-base-100 w-80 h-80 shadow-xl">
  <figure>
    <img
      src={donation.picture}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      
      <div className="">{donation.cause}</div>
    </h2>
    <p>{donation.motivationalLine}</p>
    <div className="card-actions ">
      <div className="badge badge-outline">Learn More</div>
      <div className="badge badge-outline">Join US</div>
    </div>
  </div>
</div>
        
        </div>
                    
                    
                     </div>
                    
                 )
            }

            
                
                </Slider>   
        </div>
    );
};

export default Carousel;