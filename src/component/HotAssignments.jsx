// import React, { useEffect, useState } from 'react';
// import HotAssignmentCard from './HotAssignmentCard';

// const HotAssignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [difficulty, setDifficulty] = useState('');

//   useEffect(() => {
   
//     const queryParams = difficulty ? `?difficulty=${difficulty}` : '';

//     fetch(`https://group-study-online.vercel.app/assignments${queryParams}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("Fetched assignments:", data);
//         setAssignments(data);
//       })
//       .catch(err => console.error("Error fetching assignments:", err));
//   }, [difficulty]); 

//   const handleDelete = (_id) => {
//     fetch(`https://group-study-online.vercel.app/assignments/${_id}`, {
//       method: 'DELETE',
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.deletedCount > 0) {
//           setAssignments(prevAssignments =>
//             prevAssignments.filter(assignment => assignment._id !== _id)
//           );
//         }
//       })
//       .catch(err => console.error("Error deleting assignment:", err));
//   };


//   const handleDifficultyChange = (e) => {
//     setDifficulty(e.target.value);
//   };

//   return (
//     <div>
//       <h1 className="text-center text-5xl mb-10">Our Top Assignments</h1>

//       <div className="mb-4">
//         <select 
//           value={difficulty} 
//           onChange={handleDifficultyChange} 
//           className="p-2"
//         >
//           <option value="">All Difficulty Levels</option>
//           <option value="easy">Easy</option>
//           <option value="medium">Medium</option>
//           <option value="hard">Hard</option>
//         </select>
//       </div>

     
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {assignments.map(assignment => (
//           <HotAssignmentCard
//             key={assignment._id}
//             assignment={assignment}
//             handleDelete={handleDelete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HotAssignments;



import React, { useEffect, useState } from 'react';
import HotAssignmentCard from './HotAssignmentCard';

const HotAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const queryParams = difficulty ? `?difficulty=${difficulty}` : '';
    fetch(`https://group-study-online.vercel.app/assignments${queryParams}`)
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error('Error fetching assignments:', err));
  }, [difficulty]);

  const handleDelete = (_id) => {
    fetch(`https://group-study-online.vercel.app/assignments/${_id}`, {
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
      .catch(err => console.error('Error deleting assignment:', err));
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-5xl font-bold mb-10">Our Top Assignments</h1>
      <div className="mb-6 flex justify-center">
        <select
          value={difficulty}
          onChange={handleDifficultyChange}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Difficulty Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
