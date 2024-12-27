import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // Store the uploaded file
  const [fileInfo, setFileInfo] = useState(""); // Store file info (optional)
  const [segments, setSegments] = useState(0); // Store number of segments

  const options = [
    { label: 'G-C Graph Viewer', path: '/gc' },
    { label: 'A-T Graph Viewer', path: '/at' },
    { label: 'A-G Graph Viewer', path: '/ag' },
    { label: 'T-C Graph Viewer', path: '/tc' },
    { label: 'T-G Graph Viewer', path: '/tg' },
    { label: 'A-C Graph Viewer', path: '/ac' },
  ];

  const onFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const lines = content.split('\n');
        setFileInfo(lines[0]); // the first line of the file
        const sequence = lines.slice(1).join("").trim().toUpperCase();
        const numSegments = Math.ceil(sequence.length / 100);
        setSegments(numSegments);
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleSubmit = (path, label) => {
    if (!file) {
      alert('Please upload a file first!');
      return;
    }
    navigate(`${path}`, { state: { file, segments, label,fileInfo } });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">ATGC Graph Calculator</h1>
      <input
        type="file"
        accept=".txt"
        onChange={onFileUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600 mb-6"
      />
      {/* {fileInfo && <p className="text-gray-300">File info: {fileInfo}</p>} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-3xl">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSubmit(option.path, option.label)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
