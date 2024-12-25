


import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Swal from 'sweetalert2';

const TakeAssignment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate(); // Updated for navigation after submission

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

    fetch('http://localhost:5000/allSubmittedAssignment', {
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
          navigate('/assignments'); 
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
    <div className="card bg-base-100 w-full shadow-2xl">
      <h1 className="text-5xl font-bold text-center">Submit Your Assignment</h1>
      <form onSubmit={submitAssignment} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Google Doc Link</span>
          </label>
          <input
            type="url"
            name="googleDoc"
            placeholder="Google doc"
            className="input input-bordered"
            required
          />
        </div>


        

        <div className="form-control">
          <label className="label">
            <span className="label-text">Quick Note</span>
          </label>
          <textarea
            name="text"
            placeholder="Add a quick note"
            className="textarea textarea-bordered"
            required
          ></textarea>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TakeAssignment;

