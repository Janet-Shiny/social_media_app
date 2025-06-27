import React, { useContext } from 'react';
import Post from '../post/Post';
import { ThemeContext } from '../App';
import { useQuery } from '@tanstack/react-query';
import { makereq } from '../axios.js';

const Posts = ({userid}) => {
  const { darkTheme } = useContext(ThemeContext); // get theme from context

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makereq.get('/posts?userid='+userid).then(res => res.data),
    retry: 2,
  });


  return (
    <div
      className={`${
        darkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      } min-h-screen py-8`}
    >
      {error ? (
        <p>Something went wrong</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : data && data.length > 0 ? (
        // Filter out duplicates based on post ID and map to Post components
        data
          .filter((post, index, self) => index === self.findIndex(p => p.id === post.id))
          .map(post => <Post key={`post-${post.id}`} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;
