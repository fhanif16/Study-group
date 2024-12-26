

// import React, { useEffect, useState } from 'react';
// import useAuth from './hooks/useAuth';

// const MyAttemptedAssignments = () => {
//     const { user } = useAuth();
//     const [submissions, setSubmissions] = useState([]);

//     useEffect(() => {
//         if (user?.email) {
//             fetch(`https://group-study-online.vercel.app/submission-assignments2${user.email}`)
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
//                             <th>Assignment Title</th>
//                             <th>Description</th>
//                             <th>Difficulty</th>
//                             <th>Due Date</th>
//                             <th>Thumbnail</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {submissions.map(submission => (
//                             <tr key={submission.assignment_id}>
//                                 <td>{submission.title}</td>
//                                 <td>{submission.status}</td>
//                                 <td>{submission.obtained_marks}</td>
//                                 <td>{submission.feedback}</td>
                                
//                                 <td>{submission.student_email}</td>
//                                 <td>{submission.description}</td>
//                                 <td>{submission.difficulty}</td>
//                                 <td>{submission.dueDate}</td>
//                                 <td>
//                                     {submission.thumbnail ? (
//                                         <img src={submission.thumbnail} alt="Thumbnail" className="w-20" />
//                                     ) : (
//                                         'No thumbnail'
//                                     )}
//                                 </td>
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
            // Fetch assignments where student_email matches user.email
            fetch(`https://group-study-online.vercel.app/submission-assignments2?email=${encodeURIComponent(user.email)}`)
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
                        {submissions.map((submission) => (
                            <tr key={submission.assignment_id}>
                                <td>{submission.title}</td>
                                <td>{submission.status}</td>
                                <td>{submission.marks}</td> {/* Assuming `marks` field contains the marks */}
                                <td>{submission.feedback || 'No Feedback'}</td>
                                <td>{submission.title}</td> {/* You may want to change this to assignment title */}
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
