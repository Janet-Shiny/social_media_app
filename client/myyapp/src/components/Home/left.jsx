import React, { useContext, useState, useEffect } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import QueuePlayNextOutlinedIcon from '@mui/icons-material/QueuePlayNextOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import PhotoCameraBackOutlinedIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import PeopleIcon from '@mui/icons-material/People';
import { ThemeContext } from '../../App';
import { auth } from '../../Auth';
import { Link, useNavigate } from 'react-router-dom';
import { makereq } from '../../axios';
import { useQuery } from '@tanstack/react-query';

const Left = () => {
    const { darkTheme } = useContext(ThemeContext);
    const { curruser } = useContext(auth);
    const navigate = useNavigate();

    // Fetch followed users
    const { data: followedUsers = [] } = useQuery({
        queryKey: ['followedUsers', curruser?.id],
        queryFn: async () => {
            const res = await makereq.get(`/relationships?follower_userid=${curruser.id}`);
            // Get user details for followed users
            const userPromises = res.data.map(userId => 
                makereq.get(`/users/find/${userId}`).then(response => response.data)
            );
            return Promise.all(userPromises);
        },
        enabled: !!curruser?.id,
    });

    const handleNavigateToProfile = (userId) => {
        navigate(`/profile/${userId}`);
    };

    return (
        <div 
            className={`hidden md:flex flex-col w-64 px-4 py-8 ${
                darkTheme ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-900'
            } border-r fixed left-0 top-14 h-[calc(100vh-56px)] overflow-y-auto scrollbar-hide`}
        >
            <div className="flex flex-col space-y-6 mt-4">
                {/* Profile Section */}
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Profile</h3>
                    <div 
                        onClick={() => handleNavigateToProfile(curruser.id)}
                        className="cursor-pointer"
                    >
                        <SidebarItem 
                            icon={curruser?.profile_pic || '/default-profile.png'} 
                            text={curruser?.username || 'My Profile'} 
                            darkTheme={darkTheme} 
                            isImage={true} 
                        />
                    </div>
                </div>

                {/* Friends Section */}
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Following</h3>
                    {followedUsers.length > 0 ? (
                        followedUsers.slice(0, 5).map((user) => (
                            <div 
                                key={user.id}
                                onClick={() => handleNavigateToProfile(user.id)}
                                className="cursor-pointer"
                            >
                                <SidebarItem 
                                    icon={user.profile_pic || '/default-profile.png'} 
                                    text={user.username} 
                                    darkTheme={darkTheme} 
                                    isImage={true} 
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No friends yet</p>
                    )}
                    <SidebarItem icon={<PersonAddOutlinedIcon />} text="Find Friends" darkTheme={darkTheme} />
                    <SidebarItem icon={<Diversity3OutlinedIcon />} text="Groups" darkTheme={darkTheme} />
                </div>

                {/* Discover Section */}
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Discover</h3>
                    <SidebarItem icon={<StoreOutlinedIcon />} text="Marketplace" darkTheme={darkTheme}/>
                    <SidebarItem icon={<QueuePlayNextOutlinedIcon />} text="Watch" darkTheme={darkTheme} />
                    <SidebarItem icon={<VideogameAssetOutlinedIcon />} text="Gaming" darkTheme={darkTheme} />
                </div>

                {/* Your Shortcuts Section */}
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Your Shortcuts</h3>
                    <SidebarItem icon={<TimerOutlinedIcon />} text="Memories" darkTheme={darkTheme} />
                    <SidebarItem icon={<DateRangeOutlinedIcon />} text="Events" darkTheme={darkTheme} />
                </div>

                {/* Create Section */}
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Create</h3>
                    <SidebarItem icon={<PhotoCameraBackOutlinedIcon />} text="Photo" darkTheme={darkTheme} />
                    <SidebarItem icon={<VideoCameraFrontOutlinedIcon />} text="Video" darkTheme={darkTheme} />
                    <SidebarItem icon={<LocalPostOfficeOutlinedIcon />} text="Post" darkTheme={darkTheme} />
                </div>
            </div>
        </div>
    );
};

const SidebarItem = ({ icon, text, darkTheme, isImage = false }) => {
    return (
        <div
            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                darkTheme ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
            }`}
        >
            <div className="text-blue-500 mr-3">
                {isImage ? (
                    <img src={icon} alt="profile" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                    React.cloneElement(icon, { className: "text-xl" })
                )}
            </div>
            <span className="text-sm">{text}</span>
        </div>
    );
};

export default Left;