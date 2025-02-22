import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import { ToastContainer } from 'react-toastify';
const FileLoader = lazy(() => import('./FileLoader')); // Lazy load FileLoader


/*************  ✨ Codeium Command 🌟  *************/
function HomePage() {
  // The navigate hook from react-router-dom allows us to programmatically navigate to a different route
  const navigate = useNavigate();

  // State variables to store the uploaded file, file information, and the number of segments
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState("");
  const [segments, setSegments] = useState(0);

  // Define the options for the graph viewers
  const options = [
    { label: 'G-C Skew Viewer', path: '/gc' },
    { label: 'A-T Skew Viewer', path: '/at' },
    { label: 'A-G Skew Viewer', path: '/ag' },
    { label: 'T-C Skew Viewer', path: '/tc' },
    { label: 'T-G Skew Viewer', path: '/tg' },
    { label: 'A-C Skew Viewer', path: '/ac' },
  ];

  // When a file is selected, this function is called to process the file
  const onFileUpload = (event) => {
    // Get the uploaded file
    const uploadedFile = event.target.files[0];

    // If no file was selected, display an error message
    if (!uploadedFile) {
      handleError("Please select a file.");
      return;
    }

    // Set the file state to the uploaded file
    setFile(uploadedFile);

    // Create a FileReader to read the file
    const reader = new FileReader();
    reader.onload = () => {
      try {
       
        
        // Read the file contents and normalize the line endings
        // Split the file into lines
        const content = reader.result.replace(/\r\n|\r/g, '\n');  // Normalize line endings
        const lines = content.split('\n');

        // If the file has less than two lines, it's invalid
        if (lines.length < 2) {
          throw new Error("File format is invalid. Missing sequence data.");
        }

        // Set the file information state to the first line of the file
        setFileInfo(lines[0]);

        // Extract the sequence data from the file
        const sequence = lines.slice(1).join("").trim().toUpperCase();

        // Validate the sequence data
        if (!sequence.match(/^[ACGT]+$/)) {
          throw new Error("Sequence contains invalid characters.");
        }

        // Calculate the number of segments and set the state
        const numSegments = Math.ceil(sequence.length / 100);
        setSegments(numSegments);
      } catch (err) {
        // Display an error message if there's a problem with the file
        alert(err.message);
        setFile(null);
      }
    };
    reader.readAsText(uploadedFile);
  };

  // When a button is clicked, navigate to the corresponding route
  const handleSubmit = (path, label) => {
    // If no file was uploaded, display an error message
    if (!file) {
      handleError('Please upload a file first!');
      return;
    }

    // Navigate to the graph viewer route with the file and other state variables as parameters
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
/******  f7e33f54-5a11-4d25-bb05-e812254ebd48  *******/

export default HomePage;