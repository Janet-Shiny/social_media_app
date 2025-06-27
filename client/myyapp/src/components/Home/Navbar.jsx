import { Link, useNavigate } from 'react-router-dom';
import AddHomeIcon from '@mui/icons-material/AddHome';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from '../../App';
import { auth } from '../../Auth';
import { makereq } from '../../axios';

const Navbar = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const { curruser } = useContext(auth);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchRef = useRef(null);

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
        <AddHomeIcon className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} />
        <DarkModeIcon 
          onClick={toggleTheme}
          className={`${darkTheme ? 'text-yellow-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} 
        />
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
        <PersonIcon className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} />
        <EmailIcon className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} />
        <NotificationsIcon className={`${darkTheme ? 'text-gray-300' : 'text-gray-600'} cursor-pointer text-[22px] hover:text-blue-500 transition-colors`} />

        {/* User profile */}
        <div className="flex items-center gap-2">
          {curruser ? (
            <>
            <Link to='../profile/profile'>
              <img 
                src={curruser.profile_pic} 
                alt="profile" 
                className="w-7 h-7 rounded-full object-cover"
              /></Link>
              <span className={`text-sm font-medium hidden md:inline ${darkTheme ? 'text-white' : 'text-gray-800'}`}>
                {curruser.name}
              </span>
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