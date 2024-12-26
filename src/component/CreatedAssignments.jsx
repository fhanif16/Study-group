
import { format } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from './hooks/useAuth';

const CreatedAssignments = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [marks, setMarks] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [dueDate, setDueDate] = useState(null);
    const { user } = useAuth(); // Corrected destructuring

    const formattedDate = dueDate ? format(dueDate, 'MMMM dd, yyyy') : '';
   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted')

    
        if (marks <= 0) {
            toast.error('Marks must be greater than zero.');
            return;
        }

        const assignmentData = {
            title,
            description,
            marks,
            thumbnail,
            difficulty,
            dueDate: formattedDate,
            email: user?.email,
            name: user?.displayName || 'Anonymous',
        };

        console.log('Assignment Created:', assignmentData);

        fetch('https://group-study-online.vercel.app/allAssignments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assignmentData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Assignment created successfully!',
                        text: 'Your assignment has been added.',
                        icon: 'success',
                    });

                    // Reset form fields
                    setTitle('');
                    setDescription('');
                    setMarks('');
                    setThumbnail('');
                    setDifficulty('easy');
                    setDueDate(null);
                } else {
                    toast.error('Failed to create the assignment. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error creating assignment:', error);
                toast.error('Something went wrong!');
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md border border-gray-300">
            <h1 className="text-2xl font-bold text-center mb-6">Create Assignment</h1>
            <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                {/* Description Input */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                </div>
                {/* Marks Input */}
                <div className="mb-4">
                    <label htmlFor="marks" className="block text-gray-700 font-medium mb-2">Marks</label>
                    <input
                        id="marks"
                        type="number"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        min="1"
                    />
                </div>
                {/* Thumbnail Input */}
                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block text-gray-700 font-medium mb-2">Thumbnail Image URL</label>
                    <input
                        id="thumbnail"
                        type="url"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                {/* Difficulty Selector */}
                <div className="mb-4">
                    <label htmlFor="difficulty" className="block text-gray-700 font-medium mb-2">Difficulty Level</label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                {/* Due Date Selector */}
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-2">Due Date</label>
                    <DatePicker
                        id="dueDate"
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {dueDate && (
                        <div className="mt-2 text-gray-500">
                            Formatted Due Date: {formattedDate}
                        </div>
                    )}
                </div>
                {/* User Info */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">User Email</label>
                    <input
                        id="email"
                        type="email"
                        value={user?.email}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">User Name</label>
                    <input
                        id="name"
                        type="text"
                        value={user?.displayName || 'Anonymous'}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        readOnly
                    />
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Create Assignment
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default CreatedAssignments;
