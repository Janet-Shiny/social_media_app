import { Link } from 'react-router-dom';
import AddHomeIcon from '@mui/icons-material/AddHome';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import one from '../../assets/one.jpg';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-3 bg-white shadow-sm sticky top-0 z-50 h-14">
      {/* Left side */}
      <div className="flex items-center gap-5">
        <Link to="/" className="no-underline font-bold text-xl text-blue-500 mr-2">
          lemesocial
        </Link>
        <AddHomeIcon className="text-gray-600 cursor-pointer text-[22px] hover:text-blue-500 transition-colors" />
        <DarkModeIcon className="text-gray-600 cursor-pointer text-[22px] hover:text-blue-500 transition-colors" />
        <GridViewIcon className="text-gray-600 cursor-pointer text-[22px] hover:text-blue-500 transition-colors" />
        
        {/* Search bar */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full ml-2">
          <SearchIcon className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search here...🧐" 
            className="border-none bg-transparent outline-none w-48 text-sm"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <PersonIcon className="text-gray-600 cursor-pointer text-[22px] hover:text-blue-500 transition-colors" />
        <EmailIcon className="text-gray-600 cursor-pointer text-[22px] hover:text-blue-500 transition-colors" />
        <NotificationsIcon className="text-gray-600 cursor-pointer text-[22px] hover:text-blue-500 transition-colors" />
        
        {/* User profile */}
        <div className="flex items-center gap-2">
          <img 
            src={one} 
            alt="profile" 
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-sm font-medium hidden md:inline">Username</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;