import React, { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";

const MyAttemptedAssignments = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://group-study-online.vercel.app/submission-assignments2?email=${encodeURIComponent(
          user.email
        )}`
      )
        .then((res) => res.json())
        .then((data) => setSubmissions(data))
        .catch((error) => console.error("Error fetching submissions:", error));
    }
  }, [user?.email]);

  const toggleView = () => {
    setIsCardView((prev) => !prev);
  };

  return (
    <div className="m-4 md:mx-8">
      <h2 className="text-3xl mb-4">My Submissions: {submissions.length}</h2>
      <button
        onClick={toggleView}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toggle to {isCardView ? "Table" : "Card"} View
      </button>
      {isCardView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {submissions.map((submission) => (
            <div
              key={submission.assignment_id}
              className="card bg-base-100 w-full lg:w-[350px] xl:w-[380px] h-[450px] shadow-xl"
            >
              <figure className="px-6 pt-6">
                {submission.thumbnail ? (
                  <img
                    src={submission.thumbnail}
                    alt="Thumbnail"
                    className="rounded-xl w-full h-40 object-cover"
                  />
                ) : (
                  <p className="text-gray-500 text-center">No Thumbnail</p>
                )}
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-xl">{submission.title}</h2>
                <p>Status: {submission.status}</p>
                <p>Marks: {submission.marks}</p>
                <p>Feedback: {submission.feedback || "No Feedback"}</p>
                <p>Difficulty: {submission.difficulty}</p>
                <p>Due Date: {submission.dueDate}</p>
                <div className="card-actions mt-4">
                  {/* <button className="btn btn-primary">View Details</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Marks</th>
                <th className="border px-4 py-2">Feedback</th>
                <th className="border px-4 py-2">Difficulty</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">Thumbnail</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.assignment_id}>
                  <td className="border px-4 py-2">{submission.title}</td>
                  <td className="border px-4 py-2">{submission.status}</td>
                  <td className="border px-4 py-2">{submission.marks}</td>
                  <td className="border px-4 py-2">
                    {submission.feedback || "No Feedback"}
                  </td>
                  <td className="border px-4 py-2">{submission.difficulty}</td>
                  <td className="border px-4 py-2">{submission.dueDate}</td>
                  <td className="border px-4 py-2">
                    {submission.thumbnail ? (
                      <img
                        src={submission.thumbnail}
                        alt="Thumbnail"
                        className="w-20"
                      />
                    ) : (
                      "No thumbnail"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAttemptedAssignments;
