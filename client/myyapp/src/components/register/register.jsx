import React, { useState } from "react";
import { motion } from "framer-motion";
import img1 from '../../assets/one.jpg';
import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [err, seterr] = useState(null);
    const [inputs, setinputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        profile_pic: null,
        city: "",
        website: ""
    });

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.entries(inputs).forEach(([key, value]) => {
                formData.append(key, value);
            });

            await axios.post("http://localhost:8800/api/auth/register", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (err) {
            seterr(err.response?.data || "Something went wrong");
        }
    };

    const handlechange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profile_pic") {
            setinputs(prev => ({ ...prev, profile_pic: files[0] }));
        } else {
            setinputs(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <motion.div
                className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden border border-white/20"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
                <div
                    className="md:w-1/2 p-8 md:p-12 text-white flex flex-col justify-center bg-cover bg-center relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-900/80 before:to-purple-900/80 before:z-0"
                    style={{ backgroundImage: `url(${img1})` }}
                >
                    <motion.div
                        className="relative z-10"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white/95 leading-tight">
                            Join Us<span className="text-blue-300">!</span>
                        </h1>
                        <p className="mb-8 text-white/80 text-lg max-w-md">
                            Create your account to unlock exclusive features and start your journey with us.
                        </p>

                        <div className="flex flex-col space-y-4">
                            <span className="text-sm text-white/70">Already have an account?</span>
                            <Link to='/Login'>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-transparent border-2 border-white/30 text-white font-medium px-6 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 shadow-sm w-fit"
                                >
                                    Sign In
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-6 left-6 text-white/40 text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Photo by @unsplash
                    </motion.div>
                </div>

                <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-white">
                    <motion.form
                        className="w-full max-w-md"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                            <p className="text-gray-500 mt-2">Start your journey with us</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    name="username"
                                    placeholder="JohnDoe"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    onChange={handlechange}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    onChange={handlechange}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    onChange={handlechange}
                                />
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    name="name"
                                    placeholder="Your Full Name"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    onChange={handlechange}
                                />
                            </div>

                            <div>
                                <label htmlFor="profile_pic" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="file"
                                    accept="image/*"
                                    name="profile_pic"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    onChange={handlechange}
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    name="cit"
                                    placeholder="City"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    onChange={handlechange}
                                />
                            </div>

                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    name="website"
                                    placeholder="https://yourwebsite.com"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    onChange={handlechange}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-md transition-all duration-300"
                                onClick={handleClick}
                            >
                                Register
                            </motion.button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                Already have an account? <Link to='/Login' className="text-blue-600 hover:underline font-medium">Sign in</Link>
                            </p>
                        </div>

                        {err && (
                            <p className="text-red-500 text-sm mt-4 text-center">
                                {typeof err === "object"
                                    ? err.message || err.sqlMessage || JSON.stringify(err)
                                    : err}
                            </p>
                        )}
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
