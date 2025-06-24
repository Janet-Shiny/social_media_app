import React, { useContext } from 'react';
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
import { ThemeContext } from '../../App';
import { auth } from '../../Auth';
import { Link } from 'react-router-dom';

const Left = () => {
    const { darkTheme } = useContext(ThemeContext);
    const { curruser } = useContext(auth);

    return (
        <div 
            className={`hidden md:flex flex-col w-64 px-4 py-8 ${
                darkTheme ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-900'
            } border-r fixed left-0 top-14 h-[calc(100vh-56px)] overflow-y-auto scrollbar-hide`}
        >
            <div className="flex flex-col space-y-6 mt-4">
                {/* Friends Section */}
                <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Friends</h3>
                    <Link to='../profile/profile'><SidebarItem icon={curruser.profile_pic} text={curruser.name} darkTheme={darkTheme} isImage={true} /></Link>
                    <SidebarItem icon={<PersonAddOutlinedIcon />} text="Friends" darkTheme={darkTheme} />
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