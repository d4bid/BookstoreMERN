import React from 'react'
import {Routes, Route} from 'react-router-dom'
// import { IdleTimerProvider } from './IdleTimerContext';
import LandingPage from './pages/LandingPage'
import InitialPage from './pages/InitialPage'
import BookList from './pages/Books/Booklist'
import CreateBook from './pages/Books/CreateBook'
import ShowBook from './pages/Books/ShowBook'
import EditBook from './pages/Books/EditBook'
import DeleteBook from './pages/Books/DeleteBook'
import PhotoBook from './pages/PhotoBooth/PBMainPage'
import FrameList from './pages/Frames/Framelist'
import AddFrame from './pages/Frames/AddFrameModal'
import EditFrame from './pages/Frames/EditFrameModal'
import AdminPage from './pages/Admin/AdminPage'
import PartnersPage from './pages/Partners/PartnerList'
import AddPartner from './pages/Partners/AddPartnerModal'
  

const App = () => {
  return (
    <Routes>
      {/* Home routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<InitialPage />} />


      {/* Books CRUD routes */}
      <Route path='/books' element={<BookList />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />


      {/* Photo booth routes */}
      <Route path='/photobooth' element={<PhotoBook />} />


      {/* ADMIN CRUD routes */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/frames" element={<FrameList />} />
      <Route path='/admin/frames/add' element={<AddFrame />} />
      <Route path='/admin/frames/edit/:id' element={<EditFrame />} />

      <Route path="/admin/partners" element={<PartnersPage />} />
      <Route path='/admin/partners/add' element={<AddPartner />} />
      {/* <Route path="/admin/clients" element={<ClientsPage />} /> */}


      {/* Frames CRUD routes */}
      {/* <Route path='/frames' element={<FrameList />} /> */}
      {/* <Route path='/frames/view/:id' element={<ViewFrame />} /> */}
      {/* <Route path='/frames/delete/:id' element={<DeleteFrame />} /> */}

    </Routes>
  )
}

export default App