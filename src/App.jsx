import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/Home";
import FileLoader from "./pages/FileLoader";

function App() {
  return (
    <Router>
      <div>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
        {/* File Loader for different graph viewers */}
        <Route path="/gc" element={<FileLoader />} />
        <Route path="/at" element={<FileLoader />} />
        <Route path="/ag" element={<FileLoader />} />
        <Route path="/tc" element={<FileLoader />} />
        <Route path="/tg" element={<FileLoader />} />
        <Route path="/ac" element={<FileLoader />} />
        {/* Add a fallback route */}
        <Route path="*" element={<h1 className='text-center text-4xl font-bold:700'>404 - Page Not Found</h1>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
