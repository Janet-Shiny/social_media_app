import React, { useContext } from 'react';
import Post from '../post/Post';
import { ThemeContext } from '../App'; // assuming ThemeContext is declared in App

const Posts = () => {
  const { darkTheme } = useContext(ThemeContext); // get theme from context

  const postData = [
    {
      id: 1,
      name: "Isha Verma",
      userId: "isha_artsy",
      profile: "https://randomuser.me/api/portraits/women/45.jpg",
      desc: "Sunday sketch session 🎨✏️",
      postImage: "https://images.unsplash.com/photo-1716367366931-6159fd726b01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2tldGNoJTIwc2Vzc2lvbnxlbnwwfHwwfHx8MA%3D%3D",
      createdAt: "2025-05-25T10:45:00Z",
      location: "Pune, India"
    },
    {
      id: 2,
      name: "Aarav Mehta",
      userId: "aarav_23",
      profile: "https://randomuser.me/api/portraits/men/23.jpg",
      desc: "Exploring the streets of Mumbai. The vibe here is unmatched! 🌆",
      postImage: "https://images.unsplash.com/photo-1709060705637-e09faf11b4cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RyZWV0cyUyMG9mJTIwbXVtYmFpfGVufDB8fDB8fHww",
      createdAt: "2025-05-27T14:23:00Z",
      location: "Mumbai, India"
    },
    {
      id: 3,
      name: "Karan Malhotra",
      userId: "karan.codes",
      profile: "https://randomuser.me/api/portraits/men/12.jpg",
      desc: "Just launched my new project 🚀 Check it out on GitHub!",
      postImage: "https://plus.unsplash.com/premium_photo-1706191097438-a86238a40cfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3JTIwcHJvamVjdHxlbnwwfHwwfHx8MA%3D%3D",
      createdAt: "2025-05-28T07:00:00Z",
      location: "Bangalore, India"
    }
  ];

  return (
    <div className={`${darkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} min-h-screen py-8`}>
      {postData.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
