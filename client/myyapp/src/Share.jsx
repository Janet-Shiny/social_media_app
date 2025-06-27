import React, { useState, useContext } from 'react';
import { FaImage, FaMapMarkerAlt, FaUserTag, FaSmile, FaTimes } from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';
import { ThemeContext } from './App.jsx';
import { auth } from './Auth.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makereq } from './axios.js';

const Share = () => {
    const { darkTheme } = useContext(ThemeContext);
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState('');
    const [preview, setPreview] = useState(null);
    const { curruser } = useContext(auth);
    const queryClient = useQueryClient();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makereq.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const mutation = useMutation({
        mutationFn: (newpost) => makereq.post("/posts", newpost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            setDesc('');
            setFile(null);
            setPreview(null);
        },
    });

    const handleShare = async (e) => {
        e.preventDefault();
        let imgurl = "";
        if (file) {
            imgurl = await upload();
        }
        mutation.mutate({ desc, img: imgurl });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const removeImage = () => {
        setFile(null);
        setPreview(null);
    };

    return (
        <div className={`shadow-lg rounded-xl p-4 mb-6 w-full max-w-2xl mx-auto transition-colors duration-300 ${
            darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
        }`}>
            <div className="flex items-start space-x-3">
                <img
                    src={`/upload/${curruser.profile_pic}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1 border-2 border-blue-500"
                />
                <div className="flex-1">
                    <textarea
                        value={desc}
                        placeholder={`What's on your mind, ${curruser.name}?`}
                        className="w-full bg-transparent border-none outline-none p-3 rounded-xl text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all resize-none min-h-[50px]"
                        onChange={(e) => setDesc(e.target.value)}
                        rows="2"
                    />
                </div>
            </div>

            {preview && (
                <div className="relative mt-3 rounded-lg overflow-hidden">
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full max-h-80 object-contain rounded-lg"
                    />
                    <button 
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-100 transition-all"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm mb-3 sm:mb-0">
                    <label 
                        htmlFor="file" 
                        className={`flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                            darkTheme ? 'hover:text-blue-400' : 'hover:text-blue-600'
                        }`}
                    >
                        <FaImage className="text-lg mr-1" />
                        <span>Photo</span>
                        <input 
                            type="file" 
                            id="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                    
                    <button className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <FaUserTag className="text-lg mr-1" />
                        <span>Tag</span>
                    </button>
                    
                    <button className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <FaMapMarkerAlt className="text-lg mr-1" />
                        <span>Location</span>
                    </button>
                    
                    <button className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <FaSmile className="text-lg mr-1" />
                        <span>Feeling</span>
                    </button>
                </div>

                <button
                    onClick={handleShare}
                    disabled={!desc.trim() && !file}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                        (!desc.trim() && !file) 
                            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    <RiSendPlaneFill className="mr-2" />
                    Share
                </button>
            </div>
        </div>
    );
};

export default Share;
