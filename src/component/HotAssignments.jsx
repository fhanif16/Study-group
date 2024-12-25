


import React, { useEffect, useState } from 'react';
import HotAssignmentCard from './HotAssignmentCard';

const HotAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch('https://group-study-server-side-three.vercel.app/assignments')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched assignments:", data); // Debugging to ensure no duplicates
        setAssignments(data);
      })
      .catch(err => console.error("Error fetching assignments:", err));
  }, []);

  const handleDelete = (_id) => {
    fetch(`https://group-study-server-side-three.vercel.app/assignments/${_id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          setAssignments(prevAssignments =>
            prevAssignments.filter(assignment => assignment._id !== _id)
          );
        }
      })
      .catch(err => console.error("Error deleting assignment:", err));
  };

  return (
    <div>
      <h1 className="text-center text-5xl mb-10">Our Top Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map(assignment => (
          <HotAssignmentCard
            key={assignment._id}
            assignment={assignment}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default HotAssignments;

