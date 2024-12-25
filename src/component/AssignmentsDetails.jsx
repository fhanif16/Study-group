import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AssignmentsDetails = () => {
    const { _id, title,description,marks,thumbnail,difficulty,dueDate } = useLoaderData();

    return (
        <div className='m-10 border-2 p-4'>
            <h2 className='text-3xl'>Assignment details for {title}</h2>
            <p>description: {description}</p>
            <p>deadline: {dueDate}</p>
            <Link to={`/takeAssignment/${_id}`}>
                <button className='btn btn-primary'>Take Assignment</button>
            </Link>
        </div>
    );
};

export default AssignmentsDetails;
