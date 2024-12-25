// import React, { useEffect, useState } from 'react';
// import HotAssignments from './HotAssignments';
// import { Link } from 'react-router-dom';

// const Assignments = () => {


//     const [lastestAssignment , setLastestAssignment] = useState([]);


    

//      useEffect(()=> {
//             fetch('https://group-study-server-side-three.vercel.app/hotAssignments')
//             .then(response => response.json())
              
//             .then(data => setLastestAssignment(data))
            
    
//           }, [])

//           const handleDelete = (id) => {
//         // Ensure the user is authorized to delete the assignment
//         fetch(`https://group-study-server-side-three.vercel.app/assignments/${id}`, { method: 'DELETE' })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     alert('Assignment deleted successfully');
//                     // Refresh the assignments list
//                     setLatestAssignment(latestAssignment.filter(item => item._id !== id));
//                 } else {
//                     alert('Failed to delete the assignment');
//                 }
//             })
//             .catch(error => console.error('Error deleting assignment:', error));
//     };
    
//     return (
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
//            {lastestAssignment.map((item) => (


// <div className="card bg-base-100 w-96  h-96 placeholder:shadow-xl">
//   <figure>
//     <img
//       src={item.thumbnail}
//        />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">
//      {item.title}
//       <div className="badge">Due Date:{item.dueDate}</div>
//     </h2>
//     <p>{item.description}</p>
//     <div className="card-actions justify-center">
//       <div className="badge badge-outline">Mark:{item.marks}</div>
//       <div className="badge badge-outline">{item.difficulty}</div>
//     </div>

//     <div className='flex gap-2'>
//         <Link to = {`/assignments/${item._id}`}>

//         <button className='btn badge badge-outline'>View Assignment</button>
        
        
        
//         </Link>

//         <Link to = {`/assignments/${item._id}`}>

//         <button className='btn badge badge-outline'>Delete</button>
        
        
        
//         </Link>

//         <Link to = {`/assignments/${item._id}`}>

//         <button className='btn badge badge-outline'>Update</button>
        
        
        
//         </Link>
//     </div>
//   </div>
// </div>

//  ))}
           
            
//         </div>
//     );
// };

// export default Assignments;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './hooks/useAuth';


const Assignments = () => {
    const [lastestAssignment, setLastestAssignment] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch('https://group-study-server-side-three.vercel.app/hotAssignments')
            .then(response => response.json())
            .then(data => setLastestAssignment(data));
    }, []);

    // const handleDelete = (id) => {
    //     fetch(`https://group-study-server-side-three.vercel.app/assignments/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ email: user.email }) // Pass the user's email
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.deletedCount>0) {
    //                 alert('Assignment deleted successfully');
    //                 setLastestAssignment(prevItems=>prevItems.filter(item => item._id !== id));
    //             } else {
    //                 alert('Failed to delete the assignment');
    //             }
    //         })
    //         .catch(error => console.error('Error deleting assignment:', error));
    // };

    const handleUpdate = (id) => {
        // You can navigate to the update page or show a modal to update the assignment
        // Pass the assignment ID to the update form
    };


    const handleDelete = (_id) => {
        //console.log(_id)
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
            //   swalWithBootstrapButtons.fire({
            //     title: "Deleted!",
            //     text: "Your file has been deleted.",
            //     icon: "success"
            //   });
    
    
            fetch(`https://group-study-server-side-three.vercel.app/assignments/${_id}`, {
                
                method:'DELETE'
            })
            .then(res => res.json())
            .then(data => {
               // console.log(data)
                if(data.deletedCount >0){
                    swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                             text: "Your file has been deleted.",
                            icon: "success"
                          });
    
    
                          const remaining = donations.filter(don=>don._id!==_id)
       setDonations(remaining)
    
    
                          
    
                }
            })
    
            
    
           
    
    
            
    
    
           
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
              });
            }
          });
      
      }
      

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {lastestAssignment.map((item) => (
                <div key={item._id} className="card bg-base-100 w-96 h-96 placeholder:shadow-xl">
                    <figure>
                        <img src={item.thumbnail} alt={item.title} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {item.title}
                            <div className="badge">Due Date: {item.dueDate}</div>
                        </h2>
                        <p>{item.description}</p>
                        <div className="card-actions justify-center">
                            <div className="badge badge-outline">Mark: {item.marks}</div>
                            <div className="badge badge-outline">{item.difficulty}</div>
                        </div>

                        <div className='flex gap-2'>
                            <Link to={`/assignments/${item._id}`}>
                                <button className='btn badge badge-outline'>View Assignment</button>
                            </Link>

                            {user && item.createdBy === user.email && (
                                <>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className='btn badge badge-outline'>
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(item._id)}
                                        className='btn badge badge-outline'>
                                        Update
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Assignments;
