import React, { useContext } from 'react';
import Post from '../post/Post';
import { ThemeContext } from '../App';
import { useQuery } from '@tanstack/react-query';
import { makereq } from '../axios';

const Posts = () => {
  const { darkTheme } = useContext(ThemeContext); // get theme from context

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makereq.get('/posts').then(res => res.data),
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
        data.map(post => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posts;
