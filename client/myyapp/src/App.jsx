import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Profile from './components/profile/profile'
import Navbar from './components/Home/Navbar';
import Left from './components/Home/left';
import Right from './components/Home/Right';
import { Children } from 'react';


function App() {
  const curr=true;
  const Layout=()=>{
    return(
      <div>
        <Navbar/>
        <div className='flex'>
          <Left/>
          <Outlet/>
          <Right/>
        </div>
      </div>
    )
  }
  const Protected=({children})=>{
    if(!curr){
      return <Navigate to="/Login"/>
    }
    return children
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Protected><Layout/> </Protected>} >
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
