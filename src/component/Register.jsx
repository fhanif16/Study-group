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
        <div className="hero bg-base-200 min-h-screen flex justify-center items-center">
            <div className="card bg-white shadow-xl rounded-lg w-full  p-2">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-gray-700">Register Now!</h1>
                </div>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label text-gray-600">Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            name="name"
                            required
                        />
                    </div>
                    {/* <div className="form-control">
                        <label className="label text-gray-600">Photo URL</label>
                        <input
                            type="url"
                            placeholder="Photo URL"
                            className="input input-bordered w-full"
                            name="photoURL"
                            required
                        />
                    </div> */}
                    <div className="form-control">
                        <label className="label text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full"
                            name="email"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="Your Password"
                            className="input input-bordered w-full"
                            name="password"
                            required
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary w-full">Register</button>
                    </div>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already registered?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
                <div className="text-center mt-6">
                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full border-gray-400 text-gray-700"
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
