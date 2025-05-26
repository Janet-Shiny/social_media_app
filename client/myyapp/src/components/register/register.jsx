import React from "react";
import { motion } from "framer-motion";
import img1 from '../../assets/one.jpg';
import { Link } from "react-router-dom";

const Register = () => {
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
                            Join Us<span className="text-blue-300">!</span>
                        </h1>
                        <p className="mb-8 text-white/80 text-lg max-w-md">
                            Create your account to unlock exclusive features and start your journey with us.
                        </p>
                        
                        <div className="flex flex-col space-y-4">
                            <span className="text-sm text-white/70">Already have an account?</span>
                          <Link to='/Login'> <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-transparent border-2 border-white/30 text-white font-medium px-6 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 shadow-sm w-fit"
                            >
                                Sign In
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
                            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                            <p className="text-gray-500 mt-2">Start your journey with us</p>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        type="text"
                                        id="firstName"
                                        placeholder="John"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <motion.input
                                        whileFocus={{ scale: 1.01 }}
                                        type="text"
                                        id="lastName"
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="password"
                                    id="password"
                                    placeholder="password"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                />
                                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                            </div>
                            
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                />
                            </div>
                            
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input 
                                        type="checkbox" 
                                        id="terms"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                </div>
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
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
                            >
                                Register
                            </motion.button>
                        </div>
                        
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                Already have an account? <a href="#" className="text-blue-600 hover:underline font-medium">Sign in</a>
                            </p>
                        </div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;