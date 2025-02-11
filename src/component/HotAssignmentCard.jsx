import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from './hooks/useAuth';
import { motion } from 'framer-motion';

const HotAssignmentCard = ({ assignment, handleDelete }) => {
  const { user } = useAuth();
  const isCreator = user?.email === assignment.email;

  const confirmDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(assignment._id);
        Swal.fire('Deleted!', 'Your assignment has been deleted.', 'success');
      }
    });
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <figure className="mb-4">
        <img
          src={assignment.thumbnail}
          alt={assignment.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </figure>
      <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
      <p className="text-gray-600 mb-4">{assignment.description}</p>
      <div className="text-gray-700 mb-2">
        <span className="font-medium">Marks:</span> {assignment.marks}
      </div>
      <div className="text-gray-700 mb-2">
        <span className="font-medium">Due Date:</span> {assignment.dueDate}
      </div>
      <div className="text-gray-700 mb-4">
        <span className="font-medium">Difficulty:</span> {assignment.difficulty}
      </div>
      <div className="flex gap-4">
        <Link to={`/assignments/${assignment._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            View Assignment
          </button>
        </Link>
        {isCreator && (
          <>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <Link to={`/updateAssignment/${assignment._id}`}>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                Update
              </button>
            </Link>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default HotAssignmentCard;
