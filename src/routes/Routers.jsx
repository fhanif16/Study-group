import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "../component/Login";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Register from "../component/Register";
import PendingAssignments from "../component/PendingAssignments";
import PrivateRoutes from "./privateRoutes";
import CreatedAssignments from "../component/CreatedAssignments";
import MyAttemptedAssignments from "../component/MyAttemptedAssignments";
import Assignments from "../component/Assignments";
import AssignmentsDetails from "../component/AssignmentsDetails";
import TakeAssignment from "../component/TakeAssignment";
import HotAssignments from "../component/HotAssignments";
import UpdateAssignment from "../component/UpdateAssignment";


const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeLayout></HomeLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    
    children:[{
      path:'/',
      element: <Home></Home>
      
      
      
    }, 
 
,
 
{
  path:'/login',
  element:<Login></Login>
},
{
  path:'/register',
  element:<Register></Register>
}, 

{
  path:'/allAssignments',
  element:<HotAssignments></HotAssignments>
}, 

{
  path:'/updateAssignment/:id',
  element:<UpdateAssignment></UpdateAssignment>,
  loader: ({params}) => fetch(`http://localhost:5000/assignments/${params.id}`)
},





{
  path:'/assignments',
  element:<Assignments></Assignments>
}, 


{
  path:'/assignments/:id',
  element:<AssignmentsDetails></AssignmentsDetails>,
  loader: ({params}) => fetch(`http://localhost:5000/assignments/${params.id}`)

},

{
  path:'/takeAssignment/:id',
  element:<PrivateRoutes><TakeAssignment></TakeAssignment></PrivateRoutes>

},




{
  path:'/pendingAssignments',
  element:<PrivateRoutes><PendingAssignments></PendingAssignments></PrivateRoutes>
}, 

{
  path:'/createAssignments',
  element:<PrivateRoutes> <CreatedAssignments></CreatedAssignments> </PrivateRoutes>
},
{
  path:'/attemptedAssignments',
  element:<PrivateRoutes><MyAttemptedAssignments></MyAttemptedAssignments></PrivateRoutes>
  
},



  



]
  },
]);

export default router;