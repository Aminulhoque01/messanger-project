import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SingUpPage from './pages/SingUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingPage from './pages/SettingPage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'

function App() {

  const {authUser,checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'></Loader>
    </div>
  )
  return (
    <div>
      <Navbar></Navbar>

      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to="/login"/>}></Route>
        <Route path='/sign-up' element={!authUser?<SingUpPage/>:<Navigate to="/"/>}></Route>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}></Route>
        <Route path='/setting' element={<SettingPage/>}></Route>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>}></Route>
      </Routes>
    </div>
  )
}

export default App
