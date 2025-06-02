import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { ThemeContext } from '../App';
import { auth } from '../Auth';

const dummyStories = [
  { id: 1, name: "Alice", image: "https://randomuser.me/api/portraits/women/1.jpg" },
  { id: 2, name: "Bob", image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { id: 3, name: "Catherine", image: "https://randomuser.me/api/portraits/women/3.jpg" },
  { id: 4, name: "David", image: "https://randomuser.me/api/portraits/men/4.jpg" },
  { id: 5, name: "Eva", image: "https://randomuser.me/api/portraits/women/5.jpg" },
  { id: 6, name: "Frank", image: "https://randomuser.me/api/portraits/men/6.jpg" },
  { id: 7, name: "Grace", image: "https://randomuser.me/api/portraits/women/7.jpg" },
  { id: 8, name: "Henry", image: "https://randomuser.me/api/portraits/men/8.jpg" },
  { id: 9, name: "Isabella", image: "https://randomuser.me/api/portraits/women/9.jpg" },
  { id: 10, name: "Jack", image: "https://randomuser.me/api/portraits/men/10.jpg" }
];

const Stories = () => {
  const { darkTheme } = useContext(ThemeContext);
  const { curruser } = useContext(auth);

  return (
    <div className={`relative   ${darkTheme ? 'bg-gray-800' : 'bg-white'} rounded-lg scroll-smooth`}>
      <div className="flex space-x-4 p-4 overflow-x-auto scroll-smooth whitespace-nowrap pb-2 scrollbar-hide">
        {/* Your Story Card */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className={`relative h-16 w-16 rounded-full p-0.5 ${darkTheme ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <img
              src={curruser.profile}
              alt="Your story"
              className="h-full w-full rounded-full object-cover border-2 border-white"
            />
            <div className="absolute bottom-0 right-0 bg-blue-400 rounded-full  border-2 border-white">
              <AddIcon className="text-white text-xs" />
            </div>
          </div>
          <span className={`text-xs ${darkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Your Story</span>
        </div>

        {/* User Stories */}
        {dummyStories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 p-0.5">
              <img
                src={story.image}
                alt={story.name}
                className="h-full w-full rounded-full object-cover border-2 border-white"
              />
            </div>
            <span className={`text-xs truncate w-16 text-center ${darkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
              {story.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;