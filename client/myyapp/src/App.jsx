import React, { useState, createContext, useEffect, useContext } from 'react';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Profile from './components/profile/profile'
import Navbar from './components/Home/Navbar';
import Left from './components/Home/left';
import Right from './components/Home/Right';
import './Appstyle.scss'
import { auth } from './Auth';

// Create theme context
export const ThemeContext = createContext(null);

function App() {
  const {curruser} = useContext(auth);
const [darkTheme, setDarkTheme] = useState(
  JSON.parse(localStorage.getItem("darkMode")) || false
);

useEffect(() => {
  localStorage.setItem("darkMode", JSON.stringify(darkTheme));
}, [darkTheme]);


  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const Layout = () => {
    return(
      <div className={`theme ${darkTheme ? 'dark' : 'light'}`}>
        <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
          <Navbar/>
          <div className='flex pt-14'>
            <Left/>
            <div className="flex-1 mx-0 lg:mx-64">
              <Outlet/>
            </div>
            <Right/>
          </div>
        </ThemeContext.Provider>
      </div>
    )
  }

  const Protected = ({children}) => {
    if(!curruser){
      return <Navigate to="/Login"/>
    }
    return children;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>} >
           <Route path='/' element={<Home/>}/>
           <Route path='profile/:id' element={<Profile/>}/>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;