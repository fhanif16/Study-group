import React, { useEffect, useState } from 'react';
import HotAssignmentCard from './HotAssignmentCard';

const HotAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
   
    const queryParams = difficulty ? `?difficulty=${difficulty}` : '';

    fetch(`https://group-study-online.vercel.app/assignments${queryParams}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched assignments:", data);
        setAssignments(data);
      })
      .catch(err => console.error("Error fetching assignments:", err));
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
      .catch(err => console.error("Error deleting assignment:", err));
  };


  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <div>
      <h1 className="text-center text-5xl mb-10">Our Top Assignments</h1>

      <div className="mb-4">
        <select 
          value={difficulty} 
          onChange={handleDifficultyChange} 
          className="p-2"
        >
          <option value="">All Difficulty Levels</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

     
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



// import React, { useEffect, useState } from 'react';
// import HotAssignmentCard from './HotAssignmentCard';

// const HotAssignments = () => {
//   const [assignments, setAssignments] = useState([]);

//   useEffect(() => {
//     fetch('https://group-study-online.vercel.app/assignments')
//       .then(res => res.json())
//       .then(data => {
//         console.log("Fetched assignments:", data); // Debugging to ensure no duplicates
//         setAssignments(data);
//       })
//       .catch(err => console.error("Error fetching assignments:", err));
//   }, []);

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

//   return (
//     <div>
//       <h1 className="text-center text-5xl mb-10">Our Top Assignments</h1>
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
















// import React, { useEffect, useState } from 'react';
// import HotAssignmentCard from './HotAssignmentCard';

// const HotAssignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [difficulty, setDifficulty] = useState('');
//   const [search, setSearch] = useState('');

//   // Fetch assignments with filters
//   useEffect(() => {
//     const fetchAssignments = async () => {
//       const queryParams = new URLSearchParams();

//       if (difficulty) queryParams.append('difficulty', difficulty);
//       if (search) queryParams.append('search', search);

//       try {
//         const response = await fetch(`https://group-study-online.vercel.app/assignments?${queryParams.toString()}`);
//         const data = await response.json();
//         console.log("Fetched assignments:", data); // Debugging
//         setAssignments(data);
//       } catch (err) {
//         console.error("Error fetching assignments:", err);
//       }
//     };

//     fetchAssignments();
//   }, [difficulty, search]);

//   // Handle difficulty change
//   const handleDifficultyChange = (e) => {
//     setDifficulty(e.target.value);
//   };

//   // Handle search change
//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   return (
//     <div>
//       <h1 className="text-center text-5xl mb-10">Our Top Assignments</h1>

//       {/* Search Input */}
//       <input
//         type="text"
//         value={search}
//         onChange={handleSearchChange}
//         placeholder="Search by assignment title..."
//         className="mb-4 p-2"
//       />

//       {/* Difficulty Filter */}
//       <select value={difficulty} onChange={handleDifficultyChange} className="mb-4 p-2">
//         <option value="">Select Difficulty</option>
//         <option value="easy">Easy</option>
//         <option value="medium">Medium</option>
//         <option value="hard">Hard</option>
//       </select>

//       {/* Display assignments */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {assignments.map(assignment => (
//           <HotAssignmentCard
//             key={assignment._id}
//             assignment={assignment}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HotAssignments;
