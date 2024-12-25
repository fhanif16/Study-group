// import React, { useEffect, useState } from 'react';
// import useAuth from './hooks/useAuth';

// const MyAttemptedAssignments = () => {
//     const {user} = useAuth();
//     const [submissions , setSubmissions] = useState([]);

//     useEffect(() => {
//         fetch(`http://localhost:5000/submission-assignments?email=${user.email}`)
//         .then(res => res.json())
//         .then(data =>setSubmissions(data))

//     }, [user.email])
//     return (
//         <div>
//             <h2 className="text-3xl">My Applications: {submissions.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>
//                                 <label>
//                                     <input type="checkbox" className="checkbox" />
//                                 </label>
//                             </th>
//                             <th>Title</th>
//                             <th>Description</th>
                            
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* row 1 */}
//                         {
//                             submissions.map(submission => <tr key={submission._id}>
//                                 <th>
//                                     <label>
//                                         <input type="checkbox" className="checkbox" />
//                                     </label>
//                                 </th>
//                                 <td>
//                                     <div className="flex items-center gap-3">
                                        
//                                         <div>
//                                             <div className="font-bold">{submission.title}</div>
//                                             <div className="text-sm opacity-50">{submission.text}</div>
//                                         </div>
//                                     </div>
//                                 </td>
                               
//                                 <th>
//                                     <button className="btn btn-ghost btn-xs">X</button>
//                                 </th>
//                             </tr>)
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };


// export default MyAttemptedAssignments;




// import React, { useEffect, useState } from 'react';
// import useAuth from './hooks/useAuth';

// const MyAttemptedAssignments = () => {
//     const { user } = useAuth();
//     const [submissions, setSubmissions] = useState([]);

//     useEffect(() => {
//         if (user?.email) {
//             fetch(`http://localhost:5000/submission-assignments?email=${user.email}`)
//                 .then(res => res.json())
//                 .then(data => setSubmissions(data))
//                 .catch(error => console.error("Error fetching submissions:", error));
//         }
//     }, [user?.email]);

//     return (
//         <div>
//             <h2 className="text-3xl">My Submissions: {submissions.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Title</th>
//                             <th>Status</th>
//                             <th>Marks</th>
//                             <th>Feedback</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {submissions.map(submission => (
//                             <tr key={submission.assignment_id
//                             }>
//                                 <td>{submission.student_email}</td>
//                                 <td>{submission.status}</td>
//                                 <td>{submission.obtained_marks}</td>
//                                 <td>{submission.feedback}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default MyAttemptedAssignments;


import React, { useEffect, useState } from 'react';
import useAuth from './hooks/useAuth';

const MyAttemptedAssignments = () => {
    const { user } = useAuth();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/submission-assignments?email=${user.email}`)
                .then(res => res.json())
                .then(data => setSubmissions(data))
                .catch(error => console.error("Error fetching submissions:", error));
        }
    }, [user?.email]);

    return (
        <div>
            <h2 className="text-3xl">My Submissions: {submissions.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Marks</th>
                            <th>Feedback</th>
                            <th>Assignment Title</th>
                            <th>Description</th>
                            <th>Difficulty</th>
                            <th>Due Date</th>
                            <th>Thumbnail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map(submission => (
                            <tr key={submission.assignment_id}>
                                <td>{submission.title}</td>
                                <td>{submission.status}</td>
                                <td>{submission.obtained_marks}</td>
                                <td>{submission.feedback}</td>
                                
                                <td>{submission.student_email}</td>
                                <td>{submission.description}</td>
                                <td>{submission.difficulty}</td>
                                <td>{submission.dueDate}</td>
                                <td>
                                    {submission.thumbnail ? (
                                        <img src={submission.thumbnail} alt="Thumbnail" className="w-20" />
                                    ) : (
                                        'No thumbnail'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAttemptedAssignments;
