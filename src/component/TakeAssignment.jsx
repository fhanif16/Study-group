import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Swal from 'sweetalert2';

const TakeAssignment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const submitAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const googleDoc = form.googleDoc.value;
    const text = form.text.value;

    const submittedApplication = {
      assignment_id: id,
      student_email: user.email,
      googleDoc: googleDoc,
      text: text,
      status: "pending",
    };

    fetch('https://group-study-online.vercel.app/allSubmittedAssignment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(submittedApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Assignment has been submitted",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/allAssignments');
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Submission failed, please try again",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "An error occurred",
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="flex justify-center items-center w-full bg-gray-100 min-h-screen">
      <div className="card bg-base-100 w-full md:w-1/3 lg:w-1/4 shadow-2xl rounded-lg p-8 animate__animated animate__fadeIn">
        <h1 className="text-2xl font-semibold text-center text-gray-700">Submit Your Assignment</h1>
        <form onSubmit={submitAssignment} className="card-body">
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-lg font-medium">Google Doc Link</span>
            </label>
            <input
              type="url"
              name="googleDoc"
              placeholder="Enter your Google Doc URL"
              className="input input-bordered w-full p-4 text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Quick Note</span>
            </label>
            <textarea
              name="text"
              placeholder="Add a quick note"
              className="textarea textarea-bordered text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="form-control">
            <button className="btn btn-primary p-2 mt-4 w-full text-lg rounded-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:scale-105">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TakeAssignment;
