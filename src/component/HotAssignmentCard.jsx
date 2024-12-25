


import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./hooks/useAuth";

const HotAssignmentCard = ({ assignment, handleDelete }) => {
  const { user } = useAuth(); // Assuming useAuth is used for user data

  const isCreator = user?.email === assignment.email;

  const confirmDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(assignment._id);
        swalWithBootstrapButtons.fire(
          "Deleted!",
          "Your assignment has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your assignment is safe :)",
          "error"
        );
      }
    });
  };

  return (
    <div className="assignment-card  border border-2 mb-10 p-4">

<figure>
  <img src={assignment.thumbnail} alt={assignment.title} />
    </figure>

      <h3>Title:{assignment.title}</h3>
      <p>Description{assignment.description}</p>
      <div className="details mb-2">
        <span>Marks: {assignment.marks}</span>
       
       
      </div>

      <div>
      <span>Due Date: {assignment.dueDate}</span>
      </div>
      <div>
      <span>Difficulty: {assignment.difficulty}</span>
      </div>
      <div className="actions mr-4 flex gap-4">
        <Link to={`/assignments/${assignment._id}`}>
          <button className="btn badge badge-outline">View Assignment</button>
        </Link>
        {isCreator && (
          <>
            <button
              className="btn badge badge-outline"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <Link to={`/updateAssignment/${assignment._id}`}>
              <button className="btn badge badge-outline">Update</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HotAssignmentCard;
