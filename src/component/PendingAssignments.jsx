import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'; 
import useAuth from './hooks/useAuth';

const PendingAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
   
    fetch('https://group-study-online.vercel.app/submission-assignments2')
      .then((res) => res.json())
      .then((data) => {
        const pendingAssignments = data.filter(
          (assignment) => assignment.status === 'pending'
        );
        setSubmissions(pendingAssignments);
      })
      .catch((error) => console.error("Error fetching pending submissions:", error));
  }, []);

  const handleGiveMarks = (assignment) => {
    setSelectedAssignment(assignment);
  };




  // const handleSubmitMarks = () => {
  //   // Update local state without making an API request to change backend data
  //   setSubmissions(submissions.map(submission =>
  //     submission.assignment_id === selectedAssignment.assignment_id
  //       ? { ...submission, obtained_marks: marks, status: 'completed' }
  //       : submission
  //   ));
    
  //   // Reset the modal and input fields
  //   setSelectedAssignment(null); 
  //   setMarks('');
  //   setFeedback('');
    
  //   // Show confirmation modal
  //   setIsConfirmationVisible(true);
  // };
  


  const handleSubmitMarks = () => {
   
    const updatedSubmission = {
      ...selectedAssignment,
      obtained_marks: marks,
      status: 'completed',
    };
  
    // Update the local state
    setSubmissions(submissions.map(submission =>
      submission.assignment_id === selectedAssignment.assignment_id
        ? updatedSubmission
        : submission
    ));
    
 
    fetch(`https://group-study-online.vercel.app/submission-assignments2/${selectedAssignment.assignment_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        obtained_marks: marks,
        feedback: feedback,
        status: 'completed',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Marks updated successfully in DB:', data);
      })
      .catch((error) => {
        console.error('Error updating marks:', error);
      });
  
   
    setSelectedAssignment(null); 
    setMarks('');
    setFeedback('');
    
  
    setIsConfirmationVisible(true);
  };
  
  return (
    <div>
      <h2 className="text-3xl">Pending Assignments: {submissions.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Assignment Title</th>
              <th>Description</th>
              <th>Student Email</th>
              <th>Marks</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(submission => (
              <tr key={submission.assignment_id}>
                <td>{submission.title}</td>
                <td>{submission.description}</td>
                <td>{submission.student_email}</td>
                <td>{submission.obtained_marks || 'Not Graded'}</td>
                <td>{submission.status}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleGiveMarks(submission)}
                    disabled={submission.student_email === user.email}
                  >
                    Give Marks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      {selectedAssignment && (
        <Modal isOpen={true} onRequestClose={() => setSelectedAssignment(null)}>
          <h3>Give Marks for Assignment: {selectedAssignment.title}</h3>
          <p>
            <strong>Google Docs Link: </strong>
            <a href={selectedAssignment.googleDoc} target="_blank" rel="noopener noreferrer">
              View Docs
            </a>
          </p>
          <p>
            <strong>Notes Submitted: </strong>
            {selectedAssignment.text || 'No notes available'}
          </p>
          
          <div>
            <label>Marks:</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label>Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <button onClick={handleSubmitMarks} className="btn btn-primary">
              Submit Marks
            </button>
            <button onClick={() => setSelectedAssignment(null)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </Modal>
      )}

      
      <Modal
        isOpen={isConfirmationVisible}
        onRequestClose={() => setIsConfirmationVisible(false)}
      >
        <h3>Marks Updated Successfully</h3>
        <button onClick={() => setIsConfirmationVisible(false)} className="btn btn-primary">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PendingAssignments;




// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal'; 
// import useAuth from './hooks/useAuth';

// const PendingAssignments = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [marks, setMarks] = useState('');
//   const [feedback, setFeedback] = useState('');
//   const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
    
//     fetch('https://group-study-online.vercel.app/pendding')
//       .then((res) => res.json())
//       .then((data) => {
//         const pendingAssignments = data.filter(
//           (assignment) => assignment.status === 'pending'
//         );
//         setSubmissions(pendingAssignments);
//       })
//       .catch((error) => console.error("Error fetching pending submissions:", error));
//   }, []);

//   const handleGiveMarks = (assignment) => {
//     setSelectedAssignment(assignment);
//   };

//   const handleSubmitMarks = () => {
//     fetch(`https://group-study-online.vercel.app/assignments/${selectedAssignment.assignment_id}`, {
//       method: 'PATCH',
//       body: JSON.stringify({
//         marks: marks,
//         feedback: feedback,
//         status: 'completed',
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => res.json())
//       .then(() => {
//         // Update local state to reflect the changes
//         // setSubmissions(submissions.filter(
//         //   (submission) => submission.assignment_id !== selectedAssignment.assignment_id

//         setSubmissions(submissions.map(submission =>
//             submission.assignment_id === selectedAssignment.assignment_id
//               ? { ...submission, obtained_marks: marks, status: 'completed' }
//               : submission
//         ));
//         setSelectedAssignment(null); 
//         setMarks('');
//         setFeedback('');
//         setIsConfirmationVisible(true); 
//       })
//       .catch((error) => console.error("Error submitting marks:", error));
//   };

//   return (
//     <div>
//       <h2 className="text-3xl">Pending Assignments: {submissions.length}</h2>
//       <div className="overflow-x-auto">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Assignment Title</th>
//               <th>Student Email</th>
//               <th>Marks</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map(submission => (
//               <tr key={submission.assignment_id}>
//                 <td>{submission.title}</td>
//                 <td>{submission.student_email}</td>
//                 <td>{submission.obtained_marks}</td>
//                 <td>{submission.status}</td>
//                 <td>
//                   <button
//                     className="btn"
//                     onClick={() => handleGiveMarks(submission)}
//                     disabled={submission.student_email === user.email}
//                   >
//                     Give Mark
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for giving marks */}
//       {selectedAssignment && (
//         <Modal isOpen={true} onRequestClose={() => setSelectedAssignment(null)}>
//           <h3>Give Marks for Assignment: {selectedAssignment.title}</h3>
//           <p><strong>Google Docs Link:{selectedAssignment.
// googleDoc}</strong> <a href={selectedAssignment.google_docs_link} target="_blank" rel="noopener noreferrer">View Docs</a></p>
//           <p><strong>Notes Submitted:{selectedAssignment.
// text}</strong> {selectedAssignment.notes}</p>
          
//           <div>
//             <label>Marks:</label>
//             <input
//               type="number"
//               value={marks}
//               onChange={(e) => setMarks(e.target.value)}
//             />
//           </div>
          
//           <div className='mb-4'>
//             <label>Feedback:</label>
//             <textarea
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//             />
//           </div>
          
//           <div className='flex gap-4'>
//           <button onClick={handleSubmitMarks} className='btn btn-primary'>Submit Marks</button>
          
//           <button onClick={() => setSelectedAssignment(null)} className='btn btn-primary'>Cancel</button>
//           </div>
//         </Modal>
//       )}

//       {/* Confirmation Modal */}
//       <Modal
//         isOpen={isConfirmationVisible}
//         onRequestClose={() => setIsConfirmationVisible(false)}
//       >
//         <h3>Marks Updated</h3>
//         <button onClick={() => setIsConfirmationVisible(false)}>Close</button>
//       </Modal>
//     </div>
//   );
// };

// export default PendingAssignments;














































