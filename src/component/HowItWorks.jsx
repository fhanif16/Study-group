import React from 'react';
import 'animate.css';

const HowItWorks = () => {
    const steps = [
        {
            title: 'Step 1: Organize',
            description:
                'Create a group chat and decide on a study schedule. Agree on a platform to use for video calls, like Zoom, Google Meet, or Microsoft Teams.',
            delayClass: 'animate__delay-1s',
        },
        {
            title: 'Step 2: Share Resources',
            description:
                'Share study materials with your friends, such as notes, textbooks, and practice questions. Use collaborative tools like Google Docs or Notion.',
            delayClass: 'animate__delay-2s',
        },
        {
            title: 'Step 3: Study Together',
            description:
                'Join the video call, set clear goals for the session, and focus on specific topics. Take breaks together to keep the energy up!',
            delayClass: 'animate__delay-3s',
        },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-2">
            <div className="max-w-4xl w-full text-center">
                <h1 className="text-4xl font-bold mb-6 text-gray-800 animate__animated animate__fadeInDown">
                    How to Study Online with Friends
                </h1>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeInUp animate__delay-${index + 1}s`}
                        >
                            <h2 className="text-2xl font-semibold text-primary mb-4">
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
