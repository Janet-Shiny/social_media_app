import React, { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makereq } from '../../axios';
import { auth } from '../../Auth';
const Update = ({setopenupdate}) => {
    const { curruser } = useContext(auth);
    const [profile, setprofile] = useState(null);
    const [texts, settexts] = useState({
        username: curruser?.username || "",
        cit: curruser?.cit || "",
        website: curruser?.website || ""
    });
    
    const queryClient = useQueryClient();

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makereq.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        settexts((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const mutation = useMutation({
        mutationFn: (user) => makereq.put("/users", user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            setopenupdate(false);
        },
        onError: (error) => {
            console.error('Update failed:', error);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let profilePicUrl = curruser?.profile_pic || "";
        
        try {
            if (profile) {
                profilePicUrl = await upload(profile);
            }
            
            mutation.mutate({ 
                ...texts, 
                profile_pic: profilePicUrl
            });
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setprofile(selectedFile);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Update Profile</h2>
                    <button 
                        onClick={() => setopenupdate(false)} 
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Username
                        </label>
                        <input 
                            type="text" 
                            name='username'
                            value={texts.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            City
                        </label>
                        <input 
                            name='cit'
                            value={texts.cit}
                            onChange={handleChange}
                            type="text" 
                            placeholder="Enter city"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Website
                        </label>
                        <input 
                            name='website'
                            value={texts.website}
                            onChange={handleChange}
                            type="url" 
                            placeholder="Enter website URL"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Profile Picture
                        </label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                        <button 
                            type="submit"
                            disabled={mutation.isLoading}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md font-medium hover:opacity-90 transition-all disabled:opacity-50"
                        >
                            {mutation.isLoading ? 'Updating...' : 'Update Profile'}
                        </button>
                        <button 
                            type="button"
                            onClick={() => setopenupdate(false)}
                            className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;
