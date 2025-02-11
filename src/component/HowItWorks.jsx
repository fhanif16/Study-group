import React from 'react';
import 'animate.css';

const HowItWorks = () => {
    const steps = [
        {
            title: 'Step 1: Organize',
            description:
                'Create a group chat and decide on a study schedule. Agree on a platform to use for video calls, like Zoom, Google Meet, or Microsoft Teams.',
        },
        {
            title: 'Step 2: Share Resources',
            description:
                'Share study materials with your friends, such as notes, textbooks, and practice questions. Use collaborative tools like Google Docs or Notion.',
        },
        {
            title: 'Step 3: Study Together',
            description:
                'Join the video call, set clear goals for the session, and focus on specific topics. Take breaks together to keep the energy up!',
        },
    ];

    return (
        <div className=" bg-gray-50 flex flex-col items-center justify-center py-12">
            <div className="max-w-4xl w-full text-center">
                <h1 className="text-4xl font-bold mb-10 text-gray-800 animate__animated animate__fadeInDown">
                    How to Study Online with Friends
                </h1>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`bg-white shadow-lg rounded-lg p-6 border border-gray-200 animate__animated animate__fadeInUp animate__delay-${index + 1}s`}
                        >
                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                                {step.title}
                            </h2>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
