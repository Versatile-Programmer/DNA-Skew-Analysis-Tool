import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { freqCalculate } from '../functions/freqCalculate';
import { CalculateSkew, calculateCumulative } from '../functions/cumulativeValues';
import { findMaxAndMinSegments } from '../functions/Extremas';

// Lazy load the components
const GraphPlot = lazy(() => import('./GraphPlot'));
const Navbar = lazy(() => import('./Navbar'));

function FileLoader() {
  const location = useLocation();
  const { file, fileInfo } = location.state;

  const [segments, setSegments] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ label: 'G-C Graph Viewer', path: '' });
  const [cumulativeArray, setCumulativeArray] = useState([]);
  const [extremes, setExtremes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const options = [
    { label: 'G-C Graph Viewer', key: 'gc' },
    { label: 'A-T Graph Viewer', key: 'at' },
    { label: 'A-G Graph Viewer', key: 'ag' },
    { label: 'T-C Graph Viewer', key: 'tc' },
    { label: 'T-G Graph Viewer', key: 'tg' },
    { label: 'A-C Graph Viewer', key: 'ac' },
  ];

  // Divide content into segments of 100 characters
  const divideIntoSegments = (content) => {
    const lines = content.split('\n');
    const sequence = lines.slice(1).join('').trim().toUpperCase();
    const segments = [];
    for (let i = 0; i + 100 <= sequence.length; i += 100) {
      segments.push(sequence.slice(i, i + 100));
    }
    return segments;
  };

  // Calculate cumulative data based on skew and selected graph type
  const calculateCumulativeData = (segments, label) => {
    const skewArray = segments.map((segment) => {
      const result = freqCalculate(segment);
      switch (label) {
        case 'G-C Graph Viewer':
          return CalculateSkew(result.gCnt, result.cCnt);
        case 'A-T Graph Viewer':
          return CalculateSkew(result.aCnt, result.tCnt);
        case 'A-G Graph Viewer':
          return CalculateSkew(result.aCnt, result.gCnt);
        case 'T-C Graph Viewer':
          return CalculateSkew(result.tCnt, result.cCnt);
        case 'T-G Graph Viewer':
          return CalculateSkew(result.tCnt, result.gCnt);
        case 'A-C Graph Viewer':
          return CalculateSkew(result.aCnt, result.cCnt);
        default:
          return 0;
      }
    });
    return calculateCumulative(skewArray);
  };

  // Process file and calculate data
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result.replace(/\r\n|\r/g, '\n');
        const fileSegments = divideIntoSegments(content);
        setSegments(fileSegments);
      };
      reader.readAsText(file);
    }
  }, [file]);

  // Update cumulative data and extremes when segments or selected option changes
  useEffect(() => {
    if (segments.length > 0) {
      setIsLoading(true); // Start loading
      const cumulativeData = calculateCumulativeData(segments, selectedOption.label);
      const { maxSegment, maxValue, minSegment, minValue } = findMaxAndMinSegments(cumulativeData);
      setCumulativeArray(cumulativeData);
      setExtremes({ maxSegment, maxValue, minSegment, minValue });
      setIsLoading(false); // Stop loading
    }
  }, [segments, selectedOption]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar options={options} onOptionSelect={handleOptionChange} />
      </Suspense>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">{selectedOption.label}</h1>
        <div className="w-full max-w-3xl">
          {isLoading ? (
            <p className="text-center text-gray-300">Loading data...</p>
          ) : (
            <>
              <Suspense fallback={<div>Loading Graph...</div>}>
                <GraphPlot noOfSegments={segments.length} yValues={cumulativeArray} title={fileInfo} ytitle ={selectedOption.label.split(" ")[0]}/>
              </Suspense>
              <div className="w-full max-w-3xl mt-6 text-center text-lg">
                <p><strong>Max Segment:</strong> {extremes.maxSegment} with Cumulative Value {extremes.maxValue}</p>
                <p><strong>Min Segment:</strong> {extremes.minSegment} with Cumulative Value {extremes.minValue}</p>
              </div>
            </>
          )}
        </div>
        <div className="w-full max-w-3xl mt-6 text-center text-lg">
          <span className="font-semibold">Total Segments:</span> {segments.length}
        </div>
      </div>
    </div>
  );
}

export default FileLoader;
