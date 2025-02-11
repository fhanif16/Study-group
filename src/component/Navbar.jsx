
import { Link, NavLink } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"


import { useContext, useState } from 'react';
import { AuthContext } from '../providers/Authprovider';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [mode , setMode] = useState('light')
  const handleToggle = () => {
    setMode (mode === 'light'? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme' , mode === 'light'? 'dark' : 'light')
  }


  const authInfo = useContext(AuthContext);
   // console.log(authInfo)

    const {name} = authInfo;
    const {signOutUser , user } = authInfo;
    //console.log(user);

    const handleSignOut = () => {
      signOutUser()
      .then(() => {
       
      }).catch((error) => {
     
      });
    }

    // const link = <>
    // <Link to='/'>Home</Link>
    // <Link to='/assignments'>Assignments</Link>
    // <Link to='/pending'>Pending Assignments</Link>
    // <Link to=''>Running Campaign</Link>
   
    
    
   
   
                
    
    // </>



    const navLinks = [
      { path: '/', label: 'Home' },
      { path: '/allAssignments', label: 'Assignments' },
      { path: '/pendingAssignments', label: 'Pending Assignments' },
      ,
    ];
  //  const link = navLinks.map(link => <Link to={link.path} key={link.path}>{link.label}</Link>);

  const linkElements = navLinks.map((link) => (
    <Link to={link.path} key={link.path}>
      {link.label}
    </Link>
  ));
    return (
   


      <div className="navbar bg-base-100 sticky top-0 z-50 w-full">
     
      <div className="navbar-start p-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {linkElements}
          </ul>
        </div>
        <img
          className="w-20 rounded-full"
          src="https://img.freepik.com/free-vector/charity-logo-hands-supporting-heart-icon-flat-design-vector-illustration_53876-136266.jpg?t=st=1733437552~exp=1733441152~hmac=8228213b82e6ae70fdbb4fe83974a913baaf42ff599070360a7660b9efb3c028&w=740"
          alt="Website Logo"
        />
        <h1 className="ml-2">Grow Together</h1>
      </div>

    
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">{linkElements}</ul>
      </div>

  
      <div className="navbar-end flex items-center gap-3">
        <input
          onClick={handleToggle}
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller"
        />

        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <img
                src={
                  user?.photoURL ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                tabIndex={0}
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user?.displayName || "No Name Found"}
              />
              <ul className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/createAssignments"> Create Assignments</Link>
                </li>
                <li>
                  <Link to="/attemptedAssignments"> My Attempted Assignments</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
              </ul>
              <ReactTooltip id="user-tooltip" place="bottom" />
            </div>
          </>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};




    


export default Navbar;