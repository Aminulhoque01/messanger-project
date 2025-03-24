import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SingUpPage from './pages/SingUpPage';  // Fixed spelling here
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import { Loader } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'sonner';


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();  // Added `isCheckingAuth` state

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser})

  if (isCheckingAuth && !authUser) {  // Added condition to check if `isCheckingAuth` is true
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" size={50} /> {/* Adjusted the size */}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/sing-up" element={!authUser ? <SingUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
