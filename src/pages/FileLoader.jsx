// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { freqCalculate } from '../functions/freqCalculate';
// import { CalculateSkew, calculateCumulative } from '../functions/cumulativeValues';
// import GraphPlot from './GraphPlot';
// import { findMaxAndMinSegments } from '../functions/Extremas';

// function FileLoader() {
//   const location = useLocation();
//   console.log(location);
//   const { file, segments, label ,fileInfo } = location.state; // Retrieve data from state
//   const [cumulativeArray, setCumulativeArray] = useState([]);
//   const [extremes, setExtremes] = useState({
//     maxSegment: null,
//     maxValue: null,
//     minSegment: null,
//     minValue: null,
//   });

//   const divideIntoSegments = (content) => {
//     const lines = content.split('\n');
//     const sequence = lines.slice(1).join("").trim().toUpperCase();
//     const segments = [];
//     for (let i = 0; i + 100 <= sequence.length; i += 100) {
//       segments.push(sequence.slice(i, i + 100));
//     }
//     return segments;
//   };

//   const calculateCumulativeData = (segments) => {
//     const skewArray = segments.map((segment) => {
//       const result = freqCalculate(segment);
//       switch (label) {
//         case "G-C Graph Viewer":
//           return CalculateSkew(result.gCnt, result.cCnt);
//         case "A-T Graph Viewer":
//           return CalculateSkew(result.aCnt, result.tCnt);
//         case "A-G Graph Viewer":
//           return CalculateSkew(result.aCnt, result.gCnt);
//         case "T-C Graph Viewer":
//           return CalculateSkew(result.tCnt, result.cCnt);
//         case "T-G Graph Viewer":
//           return CalculateSkew(result.tCnt, result.gCnt);
//         case "A-C Graph Viewer":
//           return CalculateSkew(result.aCnt, result.cCnt);
//         default:
//           return 0;
//       }
//     });
//     return calculateCumulative(skewArray);
//   };

//   useEffect(() => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target.result;
//         const segments = divideIntoSegments(content);
//         // This local variable segments is an array of strings which are 100 characters long contain all divided segment of file
//         if (segments.length > 0) {
//           const cumulativeData = calculateCumulativeData(segments);
//           //cumulativeData have the cumulative sum of the required data
//           //console.log("cumulative data checking",cumulativeData);
//           const { maxSegment, maxValue, minSegment, minValue } = findMaxAndMinSegments(cumulativeData);
//           setCumulativeArray(cumulativeData);
//           setExtremes({maxSegment,maxValue,minSegment, minValue});
//         }
//       };
//       reader.readAsText(file);
//     }
//   }, [file]);
  
//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
//       <h1 className="text-2xl font-bold mb-4">{label}</h1>
//       <div className="w-full max-w-3xl">
//         <GraphPlot
//           noOfSegments={segments}
//           yValues={cumulativeArray}
//           title={fileInfo}
//         />
//         <div className="w-full max-w-3xl mt-6 text-center text-lg">
//   <p>
//     <strong>Max Segment:</strong> {extremes.maxSegment} with Cumulative Value {extremes.maxValue}
//   </p>
//   <p>
//     <strong>Min Segment:</strong> {extremes.minSegment} with Cumulative Value {extremes.minValue}
//   </p>
// </div>

//       </div>
//       <div className="w-full max-w-3xl mt-6 text-center text-lg">
//       <span className="font-semibold">Total Segments:</span> {segments}
//     </div>
//     </div>
//   );
// }

// export default FileLoader;
//------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { freqCalculate } from '../functions/freqCalculate';
import { CalculateSkew, calculateCumulative } from '../functions/cumulativeValues';
import { findMaxAndMinSegments } from '../functions/Extremas';
import GraphPlot from './GraphPlot';
import Navbar from './Navbar';

function FileLoader() {
  const location = useLocation();
  const { file, segments, label, fileInfo } = location.state;
  const [selectedOption, setSelectedOption] = useState({ label, path: '' });
  const [cumulativeArray, setCumulativeArray] = useState([]);
  const [extremes, setExtremes] = useState({
    maxSegment: null,
    maxValue: null,
    minSegment: null,
    minValue: null,
  });

  const options = [
    { label: 'G-C Graph Viewer', key: 'gc' },
    { label: 'A-T Graph Viewer', key: 'at' },
    { label: 'A-G Graph Viewer', key: 'ag' },
    { label: 'T-C Graph Viewer', key: 'tc' },
    { label: 'T-G Graph Viewer', key: 'tg' },
    { label: 'A-C Graph Viewer', key: 'ac' },
  ];

  const divideIntoSegments = (content) => {
    const lines = content.split('\n');
    const sequence = lines.slice(1).join('').trim().toUpperCase();
    const segments = [];
    for (let i = 0; i + 100 <= sequence.length; i += 100) {
      segments.push(sequence.slice(i, i + 100));
    }
    return segments;
  };

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

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const segments = divideIntoSegments(content);
        if (segments.length > 0) {
          const cumulativeData = calculateCumulativeData(segments, selectedOption.label);
          const { maxSegment, maxValue, minSegment, minValue } = findMaxAndMinSegments(cumulativeData);
          setCumulativeArray(cumulativeData);
          setExtremes({ maxSegment, maxValue, minSegment, minValue });
        }
      };
      reader.readAsText(file);
    }
  }, [file, selectedOption]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar
        options={options}
        onOptionSelect={(option) => setSelectedOption(option)}
      />
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">{selectedOption.label}</h1>
        <div className="w-full max-w-3xl">
          <GraphPlot
            noOfSegments={segments}
            yValues={cumulativeArray}
            title={fileInfo}
          />
          <div className="w-full max-w-3xl mt-6 text-center text-lg">
            <p>
              <strong>Max Segment:</strong> {extremes.maxSegment} with Cumulative Value {extremes.maxValue}
            </p>
            <p>
              <strong>Min Segment:</strong> {extremes.minSegment} with Cumulative Value {extremes.minValue}
            </p>
          </div>
        </div>
        <div className="w-full max-w-3xl mt-6 text-center text-lg">
          <span className="font-semibold">Total Segments:</span> {segments}
        </div>
      </div>
    </div>
  );
}

export default FileLoader;
