import React from 'react'
import Home from './pages/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SingleJob from './components/SingleJob'
import  JobPost  from './components/JobPost'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:jobId" element={<SingleJob />} />
          <Route path="/admin/jobpost" element={<JobPost />} />
        </Routes>
    </Router>
  )
}

export default App