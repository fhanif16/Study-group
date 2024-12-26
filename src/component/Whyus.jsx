import React from 'react';
import { Zoom } from "react-awesome-reveal";

const Whyus = () => {
    return (
        <div className='mt-10 mb-10 ml-10 mr-10'>
            <h1 className='text-center text-2xl font-bold mb-8'>Why Join Our Study Group</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                
                <Zoom>
                    <div className="card bg-base-100 w-full h-[400px] shadow-xl transition-transform transform hover:scale-105">
                        <figure className="px-8 pt-8">
                            <img
                                src="https://img.freepik.com/free-photo/group-students-having-study-session_1150-17711.jpg?t=st=1733604428~exp=1733608028~hmac=cd410a0c1a24c36bd832e1258c3fafbe9d89998a5d5f09a4742ff9247fa9ebf5&w=1060"
                                className="rounded-xl object-cover w-full h-48" />
                        </figure>
                        <div className="card-body flex flex-col items-center text-center space-y-4 overflow-hidden">
                            <h2 className="card-title text-lg font-semibold">Collaborative Learning</h2>
                            <p className="text-sm">Our study group fosters collaboration where every member can share knowledge and learn together, enhancing understanding of challenging topics.</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Details</button>
                            </div>
                        </div>
                    </div>
                </Zoom>

          
                <Zoom>
                    <div className="card bg-base-100 w-full h-[400px] shadow-xl transition-transform transform hover:scale-105">
                        <figure className="px-8 pt-8">
                            <img
                                src="https://img.freepik.com/free-photo/group-diverse-students-working-together-using-laptop_23-2149329766.jpg?t=st=1733604474~exp=1733608074~hmac=65eb468d204a5ed426003cf6ed7b7f87e306c3061d3d5a4370091812711a45b6&w=1060"
                                alt="Study Group"
                                className="rounded-xl object-cover w-full h-48" />
                        </figure>
                        <div className="card-body flex flex-col items-center text-center space-y-4 overflow-hidden">
                            <h2 className="card-title text-lg font-semibold">Focused Environment</h2>
                            <p className="text-sm">We provide a focused and supportive study environment where you can stay motivated and on track to achieve your academic goals.</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Details</button>
                            </div>
                        </div>
                    </div>
                </Zoom>

            
                <Zoom>
                    <div className="card bg-base-100 w-full h-[400px] shadow-xl transition-transform transform hover:scale-105">
                        <figure className="px-8 pt-8">
                            <img
                                src="https://img.freepik.com/free-photo/group-young-students-study-laptop-tablet_1150-12982.jpg?t=st=1733604508~exp=1733608108~hmac=6d760ff677d268c9961cb880591334881b465705062600f99e73f8345839156e&w=1060"
                                alt="Study Group"
                                className="rounded-xl object-cover w-full h-48" />
                        </figure>
                        <div className="card-body flex flex-col items-center text-center space-y-4 overflow-hidden">
                            <h2 className="card-title text-lg font-semibold">Diverse Perspectives</h2>
                            <p className="text-sm">Our group includes members from various backgrounds and disciplines, allowing you to gain diverse perspectives and ideas on topics.</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Details</button>
                            </div>
                        </div>
                    </div>
                </Zoom>

                <Zoom>
                    <div className="card bg-base-100 w-full h-[400px] shadow-xl transition-transform transform hover:scale-105">
                        <figure className="px-8 pt-8">
                            <img
                                src="https://img.freepik.com/free-photo/young-woman-working-desk-with-books-tablet_23-2148513034.jpg?t=st=1731967144~exp=1731970744~hmac=a000674cb0c1a47955a85a16447ba4de28ecb57d04f8f35647fc9ab6bd5ef78f&w=1380"
                                className="rounded-xl object-cover w-full h-48" />
                        </figure>
                        <div className="card-body flex flex-col items-center text-center space-y-4 overflow-hidden">
                            <h2 className="card-title text-lg font-semibold">Flexible Schedule</h2>
                            <p className="text-sm">Our study group accommodates flexible schedules to ensure that every member can participate at their convenience.</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Details</button>
                            </div>
                        </div>
                    </div>
                </Zoom>

            </div>
        </div>
    );
};

export default Whyus;
