import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Home from './pages/Books/Home'
import CreateBook from './pages/Books/CreateBook'
import ShowBook from './pages/Books/ShowBook'
import EditBook from './pages/Books/EditBook'
import DeleteBook from './pages/Books/DeleteBook'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />

      {/* Books CRUD routes */}
      <Route path='/books/home' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}

export default App