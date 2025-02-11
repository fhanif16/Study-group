import React from 'react';
import Banner from '../component/Banner';
import Carousel from '../component/Carousel';
import HowItWorks from '../component/HowItWorks';
import FAQ from '../component/FAQ';
import Feature from '../component/Feature';
import HotAssignments from '../component/HotAssignments';
import Assignments from '../component/Assignments';
import Whyus from '../component/Whyus';
import HotAssignmentCard from '../component/HotAssignmentCard';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Carousel></Carousel>
           
           
           <HowItWorks></HowItWorks>
           
           
           <Feature></Feature>
           <Whyus></Whyus>




           <FAQ></FAQ>
            
        </div>
    );
};

export default Home;