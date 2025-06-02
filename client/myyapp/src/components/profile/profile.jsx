import React, { useContext } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import Posts from '../../posts/Posts';
import { ThemeContext } from '../../App'; // Adjust path as needed

const Profile = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`max-w-2xl mx-auto rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg 
      ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>

      {/* Background image */}
      <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-500 relative">
        {/* Profile picture */}
        <div className="absolute -bottom-16 left-6">
          <div className={`h-32 w-32 rounded-full border-4 ${darkTheme ? 'border-gray-800' : 'border-white'} overflow-hidden shadow-lg`}>
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div className="pt-20 px-6 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Middle section - Info */}
          <div className="flex-1">
            <h1 className={`text-2xl font-bold ${darkTheme ? 'text-white' : 'text-gray-800'}`}>
              Janet Shiny V
            </h1>
            <div className={`flex flex-wrap items-center gap-4 mt-2 ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex items-center">
                <PlaceIcon className={`mr-1 ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`} fontSize="small" />
                <span>San Francisco, USA</span>
              </div>
              <div className="flex items-center">
                <LanguageIcon className={`mr-1 ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`} fontSize="small" />
                <a href="#" className={`${darkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'} hover:underline`}>
                  jan.dev
                </a>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg">
                Follow
              </button>
              <button className={`px-6 py-2 rounded-full font-medium transition-all 
                ${darkTheme ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                Message
              </button>
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex gap-3">
            <button className={`p-3 rounded-full transition-colors
              ${darkTheme ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
              <EmailIcon />
            </button>
            <button className={`p-3 rounded-full transition-colors
              ${darkTheme ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
              <MoreHorizIcon />
            </button>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-6 flex gap-4">
          <a href="#" className={`p-3 rounded-full transition-colors
            ${darkTheme ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}>
            <FacebookIcon />
          </a>
          <a href="#" className={`p-3 rounded-full transition-colors
            ${darkTheme ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
            <LinkedInIcon />
          </a>
          <a href="#" className={`p-3 rounded-full transition-colors
            ${darkTheme ? 'bg-gray-700 text-pink-400 hover:bg-gray-600' : 'bg-pink-100 text-pink-600 hover:bg-pink-200'}`}>
            <InstagramIcon />
          </a>
        </div>
      </div>
      
      {/* Posts section */}
      <div className={`${darkTheme ? 'bg-gray-900' : 'bg-gray-50'} pt-4`}>
        <Posts />
      </div>
    </div>
  );
}

export default Profile;