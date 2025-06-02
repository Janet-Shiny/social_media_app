import React, { useContext } from 'react';
import { ThemeContext } from '../../App';
import { auth } from '../../Auth';

const Comments = () => {
  const { darkTheme } = useContext(ThemeContext);
  const { curruser } = useContext(auth);

  const DummyComments = [
    {
      id: 1,
      desc: "Absolutely love this shot! The colors are amazing 🔥",
      name: "Nikita Sharma",
      userId: "nikki_snapz",
      profile: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 2,
      desc: "Wow, Mumbai looks beautiful at night. Great click!",
      name: "Ravi Patel",
      userId: "ravi_travels",
      profile: "https://randomuser.me/api/portraits/men/33.jpg"
    },
    {
      id: 3,
      desc: "This reminds me of my last trip. Thanks for the nostalgia! 😊",
      name: "Sana Khan",
      userId: "sana_journeys",
      profile: "https://randomuser.me/api/portraits/women/52.jpg"
    },
    {
      id: 4,
      desc: "Captured so well — definitely worth a wallpaper!",
      name: "Devansh Roy",
      userId: "dev.codes",
      profile: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
      id: 5,
      desc: "This photo has such a calming vibe. Great work!",
      name: "Ayesha Naik",
      userId: "ayesha.naik",
      profile: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  ];

  return (
    <div className={`mt-4 p-4 flex flex-col transition-all 
      ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>

      <h3 className="text-xl font-bold mb-4">Comments</h3>

      {/* Add Comment Box */}
      <div className={`flex items-start gap-3 mb-6 rounded-xl p-4 shadow-md transition-colors
        ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>

        <img
          src={curruser?.profile}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex flex-col flex-1">
          <input
            type="text"
            placeholder="Write a comment..."
            className={`w-full rounded-lg px-4 py-2 border outline-none text-sm
              ${darkTheme 
                ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                : 'bg-gray-100 text-black border-gray-300 placeholder-gray-500'}`}
          />
        </div>

        <button className="px-4 py-2 text-sm rounded-lg font-semibold shadow-sm 
          transition hover:scale-105 active:scale-95
          bg-blue-500 text-white hover:bg-blue-600">
          Send
        </button>
      </div>

      {/* Render All Comments */}
      {DummyComments.map((comment) => (
        <div
          key={comment.id}
          className={`flex mb-4 rounded-xl shadow-md p-5 transition-colors
            ${darkTheme ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
        >
          <img
            src={comment.profile}
            alt={comment.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="font-medium">
              {comment.name}{" "}
              <span className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                @{comment.userId}
              </span>
            </p>
            <p className={`text-sm ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
              {comment.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
