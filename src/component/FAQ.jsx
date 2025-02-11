import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: 'What is StudyTogether?',
            answer: 'StudyTogether is an online platform where you can create and join group study sessions with your friends. It provides tools for collaboration, such as video calls, shared whiteboards, task tracking, and more, to make studying productive and enjoyable.',
        },
        {
            question: 'How do I create a group study session?',
            answer: 'Simply sign up or log in to your account, go to the "Create Session" page, and fill out the session details like topic, date, and time. Once created, you can invite your friends by sharing the session link or adding their emails.',
        },
        {
            question: 'Can I use StudyTogether on mobile devices?',
            answer: 'Yes! StudyTogether is fully optimized for both desktop and mobile devices, so you can join or host sessions from anywhere.',
        },
        {
            question: 'What features are included in a group study session?',
            answer: 'Our platform offers: Video and audio conferencing, real-time shared whiteboards for brainstorming, task and progress tracking, file sharing and document collaboration, and chat functionality with topic-based threads.',
        },
        {
            question: 'Is StudyTogether free to use?',
            answer: 'Yes, the basic features are free! We also offer premium plans with additional tools like session recordings, extended whiteboard access, and priority support.',
        },
    ];

    return (
        <div className="faq-container p-6 sm:p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">Frequently Asked Questions</h1>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg shadow-md bg-white overflow-hidden"
                    >
                        {/* Accordion Header */}
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full text-left p-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                        >
                            <h2 className="text-xl font-semibold text-primary">{faq.question}</h2>
                            <span
                                className={`transform transition-transform duration-300 ${
                                    activeIndex === index ? 'rotate-180' : 'rotate-0'
                                }`}
                            >
                                ▼
                            </span>
                        </button>
                        {/* Accordion Content */}
                        <div
                            className={`transition-all duration-500 ease-in-out ${
                                activeIndex === index ? 'max-h-screen p-4' : 'max-h-0'
                            }`}
                        >
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
