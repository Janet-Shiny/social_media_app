import React, { useState, useContext } from 'react';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Link } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import { ThemeContext } from '../App';
import { auth } from '../Auth';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makereq } from '../axios.js';

const Post = ({ post }) => {
  const [comm, setComm] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const { curruser } = useContext(auth);

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () =>
      makereq.get('/likes/?postid=' + post.id).then(res => res.data),
    retry: 2,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) {
        return makereq.delete('/likes', { params: { postid: post.id } });
      }
      return makereq.post('/likes', { postid: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', post.id] });
    },
  });

  const handleLike = () => {
    mutation.mutate(data.includes(curruser.id));
  };

  return (
    <div className={`rounded-xl p-4 mb-6 w-full max-w-2xl mx-auto shadow-md transition-all 
      ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <img
            src={post.profile_pic}
            alt="profile"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="font-semibold text-sm sm:text-base">{post.username}</p>
            <p className={`text-xs sm:text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              <Link to={`./Post/${post.userid}`}>
                <span>@ user_id -{post.userid} | Date created -{post.created_at ? post.created_at.slice(0, 10) : 'Unknown'}</span>
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

      {/* Post Image */}
      {post.img && (
        <img
          src={"/upload/" + post.img}
          alt="post"
          className="w-full h-auto max-h-96 sm:max-h-[500px] object-cover rounded-lg mb-3"
        />
      )}

      {/* Actions */}
      <div className={`flex justify-between sm:justify-start sm:space-x-7 text-xs sm:text-sm ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
        <button
          onClick={handleLike}
          className="flex items-center cursor-pointer p-1 sm:p-0"
          aria-label={data.includes(curruser.id) ? "Unlike post" : "Like post"}
        >
          {isLoading ? (
            "Loading..."
          ) : data.includes(curruser.id) ? (
            <FavoriteOutlinedIcon className="text-red-500 text-lg sm:text-xl" />
          ) : (
            <FavoriteBorderOutlinedIcon className="text-lg sm:text-xl" />
          )}
          <span className="ml-1">{data.length} Likes</span>
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

      {/* Comments */}
      {comm && (
        <div className="mt-3">
          <Comments postid={post.id} />
        </div>
      )}
    </div>
  );
};

export default Post;
