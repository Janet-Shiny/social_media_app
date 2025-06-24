import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import img1 from '../../assets/one.jpg';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Auth";

const Login = () => {
    const [err, seterr] = useState(null);
    const [inputs, setinputs] = useState({
        username: "",
        password: ""
    });
    const navigate=useNavigate();

    const handlechange = (e) => {
        setinputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const { login } = useContext(auth);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/")
        }
        catch (err) {
            seterr(err.response.data)
        }

    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <motion.div
                className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden border border-white/20"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1
                }}
            >
                {/* Left Section with background image and dim overlay */}
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
                            Welcome Back<span className="text-blue-300">!</span>
                        </h1>
                        <p className="mb-8 text-white/80 text-lg max-w-md">
                            We're thrilled to see you again. Log in to explore your personalized dashboard and continue your journey.
                        </p>

                        <div className="flex flex-col space-y-4">
                            <span className="text-sm text-white/70">New to our platform?</span>
                            <Link to='/Register'><motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-transparent border-2 border-white/30 text-white font-medium px-6 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 shadow-sm w-fit"
                            >
                                Create Account
                            </motion.button></Link>
                        </div>
                    </motion.div>

                    {/* Decorative elements */}
                    <motion.div
                        className="absolute bottom-6 left-6 text-white/40 text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        Photo by @unsplash
                    </motion.div>
                </div>

                {/* Right Section */}
                <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-white">
                    <motion.form
                        className="w-full max-w-md"
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
                            <p className="text-gray-500 mt-2">Access your account</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    id="username"
                                    placeholder="Enter your username"
                                    name="username"
                                    onChange={handlechange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
                                </div>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="password"
                                    id="password"
                                    placeholder="password"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    name="password"
                                    onChange={handlechange}
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-md transition-all duration-300"
                                onClick={handleLogin}
                            >
                                {err && err}
                                Login
                            </motion.button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500">
                                By signing in, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                            </p>
                        </div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;