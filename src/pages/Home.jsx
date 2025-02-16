import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import { ToastContainer } from 'react-toastify';
const FileLoader = lazy(() => import('./FileLoader')); // Lazy load FileLoader

function HomePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState("");
  const [segments, setSegments] = useState(0);

  const options = [
    { label: 'G-C Skew Viewer', path: '/gc' },
    { label: 'A-T Skew Viewer', path: '/at' },
    { label: 'A-G Skew Viewer', path: '/ag' },
    { label: 'T-C Skew Viewer', path: '/tc' },
    { label: 'T-G Skew Viewer', path: '/tg' },
    { label: 'A-C Skew Viewer', path: '/ac' },
  ];

  const onFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) {
      handleError("Please select a file.");
      return;
    }
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = reader.result.replace(/\r\n|\r/g, '\n');  // Normalize line endings
        const lines = content.split('\n');
        if (lines.length < 2) {
          throw new Error("File format is invalid. Missing sequence data.");
        }
        setFileInfo(lines[0]);
        const sequence = lines.slice(1).join("").trim().toUpperCase();
        if (!sequence.match(/^[ACGT]+$/)) {
          throw new Error("Sequence contains invalid characters.");
        }
        const numSegments = Math.ceil(sequence.length / 100);
        setSegments(numSegments);
      } catch (err) {
        alert(err.message);
        setFile(null);
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleSubmit = (path, label) => {
    if (!file) {
      handleError('Please upload a file first!');
      return;
    }
    navigate(`${path}`, { state: { file, segments, label, fileInfo } });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-extrabold text-center mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          DNA Skew Analysis Tool
        </h1>

        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-8 rounded-xl shadow-lg mb-12">
          <p className="text-gray-300 mb-6 text-lg">
            This tool allows you to visualize the skew between nucleotide pairs in a DNA sequence. Upload a sequence file and choose a skew type to generate a graph.
          </p>
          <p className="text-gray-300 mb-4">
            DNA is made up of sequences of four nucleotides: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). Understanding the distribution of these nucleotides within a sequence is crucial for identifying patterns such as gene density, GC-content, and other biological phenomena.
          </p>
          <p className="text-gray-300">
            Using this tool, you can upload a DNA sequence file, segment it, and visualize the nucleotide pair skew through various graph viewers. These graphs are useful in bioinformatics research and can provide insights into genomic structure and function.
          </p>
        </div>

        <div className="relative flex justify-center mb-8">
          <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md shadow-md">
            Upload DNA Sequence
            <input
              id="file-upload"
              type="file"
              onChange={onFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSubmit(option.path, option.label)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default HomePage;