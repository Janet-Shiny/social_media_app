import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../App';
import { auth } from '../../Auth';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import { makereq } from '../../axios.js';

const Comments = ({postid}) => {
  const { darkTheme } = useContext(ThemeContext);
  const { curruser } = useContext(auth);
   const queryClient = useQueryClient();
const [desc,setdesc]=useState("");
  const { isLoading, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      makereq.get('/comments?postid='+postid).then(res => res.data),
    retry: 2,
  });

    const mutation = useMutation({
        mutationFn: (newComment) => makereq.post("/comments", newComment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });

        },
    });

    const handleClick= async (e)=>{
      e.preventDefault();
        if (!desc.trim()) return;
      mutation.mutate({desc,postid})
      setdesc("");
    }
  
  return (
    <div className={`mt-4 p-4 flex flex-col transition-all 
      ${darkTheme ? 'text-gray-100' : 'text-gray-800'}`}>

      <h3 className="text-xl font-bold mb-4">Comments</h3>

      {/* Add Comment Box */}
      <div className={`flex items-start gap-3 mb-6 rounded-xl p-4 shadow-md transition-colors
        ${darkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>

        <img
          src={curruser?.profile_pic}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="flex flex-col flex-1">
          <input
            type="text"
            placeholder="Write a comment..."
            value={desc}
            onChange={e=>setdesc(e.target.value)}
            className={`w-full rounded-lg px-4 py-2 border outline-none text-sm
              ${darkTheme 
                ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
                : 'bg-gray-100 text-black border-gray-300 placeholder-gray-500'}`}
          />
        </div>

        <button className="px-4 py-2 text-sm rounded-lg font-semibold shadow-sm 
          transition hover:scale-105 active:scale-95
          bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleClick}>
          Send
        </button>
      </div>

      {/* Render All Comments */}
      {isLoading?"Loading....":data.map((comment) => (
        <div
          key={comment.id}
          className={`flex mb-4 rounded-xl shadow-md p-5 transition-colors
            ${darkTheme ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
        >
          <img
            src={comment.profile_pic}
            alt={comment.username}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="font-medium">
              {comment.name}{" "}
              <span className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                @{comment.username}
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
