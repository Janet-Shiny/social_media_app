import { Link } from 'react-router-dom';
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

const Navbar = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const { curruser } = useContext(auth);

  const suggestionsList = ["Amber", "Anastashiya", "Albert", "Amala", "Adithya", "Abi"];
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);

  const filteredSuggestions = suggestionsList
    .filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = (s) => {
    setSearchTerm(s);
    setShowSuggestions(false);
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
            placeholder="Search here...🧐" 
            className={`border-none bg-transparent outline-none w-48 text-sm ${darkTheme ? 'text-white placeholder-gray-400' : 'text-gray-800'}`}
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
          />
          {/* Suggestions dropdown */}
          {showSuggestions && (
            <ul className={`absolute top-full left-0 w-full bg-white shadow-lg rounded mt-2 z-10 text-sm ${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelect(s)}
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {s}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400">No suggestions</li>
              )}
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