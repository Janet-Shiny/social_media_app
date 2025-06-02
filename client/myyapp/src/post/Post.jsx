import React, { useState, useContext } from 'react';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Link } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import { ThemeContext } from '../App';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [comm, setComm] = useState(false);
  const [likeCount, setLikeCount] = useState(12);
  const { darkTheme } = useContext(ThemeContext);

  const handleLike = () => {
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    setLiked(!liked);
  };

  return (
    <div className={`rounded-xl p-4 mb-6 w-full max-w-2xl mx-auto shadow-md transition-all 
      ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>

      {/* Header - Responsive layout */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <img
            src={post.profile}
            alt="profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="font-semibold text-sm sm:text-base">{post.name}</p>
            <p className={`text-xs sm:text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              <Link to={`./Post/${post.userId}`}>
                <span>@{post.userId}</span>
              </Link>
            </p>
          </div>
        </div>
        <button className={`p-1 rounded-full ${darkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
          <MoreHorizOutlinedIcon className={`${darkTheme ? 'text-gray-300' : 'text-gray-700'}`} />
        </button>
      </div>

      {/* Description */}
      <p className={`mb-3 text-sm sm:text-base ${darkTheme ? 'text-gray-200' : 'text-gray-800'}`}>
        {post.desc}
      </p>

      {/* Post Image - Responsive sizing */}
      {post.postImage && (
        <img
          src={post.postImage}
          alt="post"
          className="w-full h-auto max-h-96 sm:max-h-[500px] object-cover rounded-lg mb-3"
        />
      )}

      {/* Actions - Responsive spacing and sizing */}
      <div className={`flex justify-between sm:justify-start sm:space-x-7 text-xs sm:text-sm ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
        <button 
          onClick={handleLike} 
          className="flex items-center cursor-pointer p-1 sm:p-0"
          aria-label={liked ? "Unlike post" : "Like post"}
        >
          {liked ? (
            <FavoriteOutlinedIcon className="text-red-500 text-lg sm:text-xl" />
          ) : (
            <FavoriteBorderOutlinedIcon className="text-lg sm:text-xl" />
          )}
          <span className="ml-1">{likeCount} Likes</span>
        </button>

        <button 
          onClick={() => setComm(!comm)} 
          className="flex items-center cursor-pointer p-1 sm:p-0"
          aria-label={comm ? "Hide comments" : "Show comments"}
        >
          <TextsmsOutlinedIcon className="text-lg sm:text-xl" />
          <span className="ml-1">10 comments</span>
        </button>

        <button className="flex items-center cursor-pointer p-1 sm:p-0" aria-label="Share post">
          <ShareOutlinedIcon className="text-lg sm:text-xl" />
          <span className="ml-1">Share</span>
        </button>
      </div>

      {/* Comments - Responsive behavior */}
      {comm && (
        <div className="mt-3">
          <Comments />
        </div>
      )}
    </div>
  );
};

export default Post;