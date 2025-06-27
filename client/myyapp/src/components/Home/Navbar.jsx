import { Link, useNavigate } from 'react-router-dom';
import AddHomeIcon from '@mui/icons-material/AddHome';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from '../../App';
import { auth } from '../../Auth';
import { makereq } from '../../axios';

const Navbar = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const { curruser, logout } = useContext(auth);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate(`/profile/${curruser.id}`);
    setShowProfileMenu(false);
  };

  const handleMessagesClick = () => {
    // TODO: Implement messages functionality
    console.log('Messages clicked');
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  const searchUsers = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await makereq.get(`/users/search?q=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
    
    // Debounce search
    if (value.trim()) {
      await searchUsers(value);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectUser = (user) => {
    setSearchTerm('');
    setShowSuggestions(false);
    setSearchResults([]);
    navigate(`/profile/${user.id}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`flex items-center justify-between p-3 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-sm fixed top-0 left-0 w-full z-50 h-14`}>
      {/* Left side */}
      <div className="flex items-center gap-5 relative">
        <Link to="/" className={`no-underline font-bold text-xl ${darkTheme ? 'text-blue-400' : 'text-blue-500'} mr-2`}>
          lemesocial
        </Link>
        <AddHomeIcon 
          onClick={handleHomeClick}
          className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} 
        />
        {darkTheme ? (
          <LightModeIcon 
            onClick={toggleTheme}
            className={`text-yellow-300 cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} 
          />
        ) : (
          <DarkModeIcon 
            onClick={toggleTheme}
            className={`text-gray-600 cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} 
          />
        )}
        <GridViewIcon className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} />

        {/* Search bar */}
        <div ref={searchRef} className={`relative flex items-center ${darkTheme ? 'bg-gray-700' : 'bg-gray-100'} px-3 py-2 rounded-full ml-2`}>
          <SearchIcon className={`${darkTheme ? 'text-gray-300' : 'text-gray-500'} mr-2`} />
          <input 
            type="text" 
            placeholder="Search users...🧐" 
            className={`border-none bg-transparent outline-none w-48 text-sm ${darkTheme ? 'text-white placeholder-gray-400' : 'text-gray-800'}`}
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
          />
          {/* Search results dropdown */}
          {showSuggestions && (
            <ul className={`absolute top-full left-0 w-full shadow-lg rounded mt-2 z-10 text-sm max-h-60 overflow-y-auto ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              {isSearching ? (
                <li className="px-4 py-2 text-gray-400">Searching...</li>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <img 
                      src={user.profile_pic || '/default-profile.png'} 
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{user.username}</span>
                  </li>
                ))
              ) : searchTerm.trim() && !isSearching ? (
                <li className="px-4 py-2 text-gray-400">No users found</li>
              ) : null}
            </ul>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <PersonIcon 
          onClick={handleProfileClick}
          className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} 
        />
        <EmailIcon 
          onClick={handleMessagesClick}
          className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} 
        />
        
        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <NotificationsIcon 
            onClick={handleNotificationsClick}
            className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} 
          />
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
          
          {/* Notifications dropdown */}
          {showNotifications && (
            <div className={`absolute top-full right-0 w-80 shadow-lg rounded mt-2 z-10 max-h-96 overflow-y-auto ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg">Notifications</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className={`p-4 cursor-pointer ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <img src="/default-profile.png" alt="User" className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm"><strong>John Doe</strong> liked your post</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className={`p-4 cursor-pointer ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <img src="/default-profile.png" alt="User" className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm"><strong>Jane Smith</strong> started following you</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
                <div className={`p-4 cursor-pointer ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <img src="/default-profile.png" alt="User" className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm"><strong>Mike Johnson</strong> commented on your post</p>
                      <p className="text-xs text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User profile */}
        <div ref={profileRef} className="flex items-center gap-2 relative">
          {curruser ? (
            <>
              <div 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img 
                  src={curruser.profile_pic || '/default-profile.png'} 
                  alt="profile" 
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className={`text-sm font-medium hidden md:inline ${darkTheme ? 'text-white' : 'text-gray-800'}`}>
                  {curruser.username}
                </span>
              </div>
              
              {/* Profile dropdown */}
              {showProfileMenu && (
                <div className={`absolute top-full right-0 w-48 shadow-lg rounded mt-2 z-10 ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                  <div className="py-2">
                    <button 
                      onClick={handleProfileClick}
                      className={`w-full text-left px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => setShowProfileMenu(false)}
                      className={`w-full text-left px-4 py-2 text-sm ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      Settings
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button 
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm text-red-500 ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center gap-2`}
                    >
                      <LogoutIcon fontSize="small" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <span>Guest</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;