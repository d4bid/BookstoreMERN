// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import LandingPage from './pages/LandingPage';
import InitialPage from './pages/InitialPage';
import PhotoBooth from './pages/PhotoBooth/PBMainPage';
import FrameList from './pages/Admin/Frames/Framelist';
import AddFrame from './pages/Admin/Frames/AddFrameModal';
import EditFrame from './pages/Admin/Frames/EditFrameModal';
import AdminPage from './pages/Admin/AdminPage';
import PartnersPage from './pages/Admin/Partners/PartnerList';
import AddPartner from './pages/Admin/Partners/AddPartnerModal';
import Slideshow from './pages/Admin/Slideshow/ImageList';
import Gallery from './pages/Admin/Gallery/ImageGallery';
import Visitors from './pages/Admin/VisitorLog';
import Partners from './pages/PartnersPage';
import Devs from './pages/Developers';
import UserGallery from './pages/UserGallery';

const App = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsActive(false);
        navigate('/');
        console.log('Navigated to home page');
      }, 250000); // 4 minutes (   milliseconds)
      //console.log('Timer reset');
    };

    const onActivity = () => {
      // console.log('User activity detected');
      if (!isActive) {
        setIsActive(true);
        resetTimer();
      } else {
        // Reset the timer
        resetTimer();
      }
    };

    // Set up touch event listeners for user activity
    window.addEventListener('touchstart', onActivity);
    window.addEventListener('touchend', onActivity);

    // Initial timer setup
    resetTimer();

    // Generate session ID when LandingPage (idle page) loads
    if (window.location.pathname === '/') {
      generateSessionId();
    }

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('touchstart', onActivity);
      window.removeEventListener('touchend', onActivity);
    };
  }, [isActive, navigate]);

  // Function to generate session ID
  const generateSessionId = async () => {
    try {
      const response = await axios.post('http://localhost:5555/session/startSession');
      const sessionId = response.data.sessionId;
      
      // Store the session ID in local storage
      localStorage.setItem('sessionId', sessionId);
      console.log('Session ID generated:', sessionId);
    } catch (error) {
      console.error('Error generating session ID:', error);
    }
  };

  return (
    <Routes>
      {/* Home routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<InitialPage />} />

      {/* Dev route */}
      <Route path='/devs' element={<Devs />} />

      {/* Photo booth routes */}
      <Route path='/photobooth' element={<PhotoBooth />} />

      {/* Partners routes */}
      <Route path='/partners' element={<Partners />} />

      {/* Gallery routes */}
      <Route path='/gallery' element={<UserGallery />} />

      {/* ADMIN CRUD routes */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/frames" element={<FrameList />} />
      <Route path='/admin/frames/add' element={<AddFrame />} />
      <Route path='/admin/frames/edit/:id' element={<EditFrame />} />
      <Route path="/admin/partners" element={<PartnersPage />} />
      <Route path='/admin/partners/add' element={<AddPartner />} />
      <Route path='/admin/slideshow' element={<Slideshow />} />
      <Route path='/admin/gallery' element={<Gallery />} />
      <Route path='/admin/visitors' element={<Visitors />} />

    </Routes>
  );
};

export default App;
