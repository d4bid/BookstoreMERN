import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import InitialPage from './pages/InitialPage'
import BookList from './pages/Books/Booklist'
import CreateBook from './pages/Books/CreateBook'
import ShowBook from './pages/Books/ShowBook'
import EditBook from './pages/Books/EditBook'
import DeleteBook from './pages/Books/DeleteBook'
import PhotoBook from './pages/PhotoBooth/PBMainPage'


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


      {/* Books CRUD routes */}
      <Route path='/photobooth' element={<PhotoBook />} />

    </Routes>
  )
}

export default App