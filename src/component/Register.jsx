import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { AuthContext } from '../providers/Authprovider';
import { auth } from '../firebase/firebase.init';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const googleProvider = new GoogleAuthProvider();

   
    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoURL = e.target.photoURL.value;

        
        const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordCriteria.test(password)) {
            setPasswordError(
                'Password must be at least 6 characters long and include both uppercase and lowercase letters.'
            );
            return;
        }
        setPasswordError(''); 
        createUser(email, password)
            .then((result) => {
              //  console.log(result.user);
                Swal.fire({
                    title: 'Registration Successful',
                    text: 'Welcome to the platform!',
                    icon: 'success',
                });
                navigate('/login');
            })
            .catch((error) => {
                console.error(error);
            });
    };

  
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
              //  console.log(result.user);
                Swal.fire({
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    icon: 'success',
                });
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered"
                                name="name"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="url"
                                placeholder="Photo URL"
                                className="input input-bordered"
                                name="photoURL"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered"
                                name="email"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered"
                                name="password"
                                required
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className="text-center mt-4">
                        Already registered?{' '}
                        <Link to="/login" className="btn btn-link">
                            Login
                        </Link>
                    </p>
                    <div className="text-center mt-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-primary w-full"
                        >
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
