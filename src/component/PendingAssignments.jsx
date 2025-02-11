import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import useAuth from "./hooks/useAuth";

const PendingAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isCardView, setIsCardView] = useState(false); 
  const { user } = useAuth();

  useEffect(() => {
    fetch("https://group-study-online.vercel.app/submission-assignments2")
      .then((res) => res.json())
      .then((data) => {
        const pendingAssignments = data.filter(
          (assignment) => assignment.status === "pending"
        );
        setSubmissions(pendingAssignments);
      })
      .catch((error) =>
        console.error("Error fetching pending submissions:", error)
      );
  }, []);

  const handleGiveMarks = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleSubmitMarks = () => {
    const updatedSubmission = {
      ...selectedAssignment,
      obtained_marks: marks,
      status: "completed",
    };

    setSubmissions(
      submissions.map((submission) =>
        submission.assignment_id === selectedAssignment.assignment_id
          ? updatedSubmission
          : submission
      )
    );

    fetch(
      `https://group-study-online.vercel.app/submission-assignments2/${selectedAssignment.assignment_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          obtained_marks: marks,
          feedback: feedback,
          status: "completed",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Marks updated successfully in DB:", data);
      })
      .catch((error) => {
        console.error("Error updating marks:", error);
      });

    setSelectedAssignment(null);
    setMarks("");
    setFeedback("");

    setIsConfirmationVisible(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Pending Assignments: {submissions.length}
      </h2>
      <div className="mb-4 text-center">
        <button
          className="btn btn-primary"
          onClick={() => setIsCardView(!isCardView)}
        >
          Toggle {isCardView ? "Table View" : "Card View"}
        </button>
      </div>
      {isCardView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {submissions.map((submission) => (
            <div
              key={submission.assignment_id}
              className="bg-white shadow-lg rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold">{submission.title}</h3>
              <p className="text-gray-600">{submission.description}</p>
              <p>
                <strong>Student Email:</strong> {submission.student_email}
              </p>
              <p>
                <strong>Marks:</strong>{" "}
                {submission.obtained_marks || "Not Graded"}
              </p>
              <p>
                <strong>Status:</strong> {submission.status}
              </p>
              <button
                className="btn btn-primary mt-2"
                onClick={() => handleGiveMarks(submission)}
                disabled={submission.student_email === user.email}
              >
                Give Marks
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Assignment Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Student Email</th>
                <th className="px-4 py-2">Marks</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.assignment_id}>
                  <td className="border px-4 py-2">{submission.title}</td>
                  <td className="border px-4 py-2">{submission.description}</td>
                  <td className="border px-4 py-2">
                    {submission.student_email}
                  </td>
                  <td className="border px-4 py-2">
                    {submission.obtained_marks || "Not Graded"}
                  </td>
                  <td className="border px-4 py-2">{submission.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="btn btn-primary"
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
      )}

      {selectedAssignment && (
        <Modal isOpen={true} onRequestClose={() => setSelectedAssignment(null)}>
          <h3>Give Marks for Assignment: {selectedAssignment.title}</h3>
          <p>
            <strong>Google Docs Link: </strong>
            <a
              href={selectedAssignment.googleDoc}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Docs
            </a>
          </p>
          <p>
            <strong>Notes Submitted: </strong>
            {selectedAssignment.text || "No notes available"}
          </p>

          <div>
            <label>Marks:</label>
            <input
              type="number"
              className="w-full border px-2 py-1"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Feedback:</label>
            <textarea
              className="w-full border px-2 py-1"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button onClick={handleSubmitMarks} className="btn btn-primary">
              Submit Marks
            </button>
            <button
              onClick={() => setSelectedAssignment(null)}
              className="btn btn-secondary"
            >
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
        <button
          onClick={() => setIsConfirmationVisible(false)}
          className="btn btn-primary"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PendingAssignments;
