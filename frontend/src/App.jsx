import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InitialPage from './pages/InitialPage';
import BookList from './pages/Books/Booklist';
import CreateBook from './pages/Books/CreateBook';
import ShowBook from './pages/Books/ShowBook';
import EditBook from './pages/Books/EditBook';
import DeleteBook from './pages/Books/DeleteBook';
import PhotoBook from './pages/PhotoBooth/PBMainPage';
import FrameList from './pages/Admin/Frames/Framelist';
import AddFrame from './pages/Admin/Frames/AddFrameModal';
import EditFrame from './pages/Admin/Frames/EditFrameModal';
import AdminPage from './pages/Admin/AdminPage';
import PartnersPage from './pages/Admin/Partners/PartnerList';
import AddPartner from './pages/Admin/Partners/AddPartnerModal';
import Slideshow from './pages/Admin/Slideshow/ImageList';
import Partners from './pages/PartnersPage';
import Devs from './pages/Developers';

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
      }, 240000); // 30 seconds if 30000
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

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('touchstart', onActivity);
      window.removeEventListener('touchend', onActivity);
    };
  }, [isActive, navigate]);

  return (
    <Routes>
      {/* Home routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<InitialPage />} />

      {/* Dev route */}
      <Route path='/devs' element={<Devs />} />

      {/* Books CRUD routes */}
      <Route path='/books' element={<BookList />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />

      {/* Photo booth routes */}
      <Route path='/photobooth' element={<PhotoBook />} />

      {/* Partners routes */}
      <Route path='/partners' element={<Partners />} />

      {/* ADMIN CRUD routes */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/frames" element={<FrameList />} />
      <Route path='/admin/frames/add' element={<AddFrame />} />
      <Route path='/admin/frames/edit/:id' element={<EditFrame />} />
      <Route path="/admin/partners" element={<PartnersPage />} />
      <Route path='/admin/partners/add' element={<AddPartner />} />
      <Route path='/admin/slideshow' element={<Slideshow />} />
    </Routes>
  );
};

export default App;
