import React, { useState } from 'react';
import { freqCalculate } from '../functions/freqCalculate';
import { CalculateSkew, calculateCumulative } from '../functions/cumulativeValues';
import GraphPlot from './GraphPlot';

function FileLoader() {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState("");
  const [segments, setSegments] = useState(0);
  const [GCCumulativeArray, setGCCumulativeArray] = useState([]);
  const [ATCumulativeArray, setATCumulativeArray] = useState([]);

  const onFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const divideIntoSegments = (content) => {
    console.log("file successfully read");
    const lines = content.split('\n');
    setFileInfo(lines[0]);
    if (lines.length < 2) {
      alert('file must contain more than two lines');
      return [];
    }

    const sequence = lines.slice(1).join("").trim().toUpperCase();
    const segments = [];
    for (let i = 0; i + 100 < sequence.length; i += 100) {
      segments.push(sequence.slice(i, i + 100));
    }
    setSegments(segments.length);
    return segments;
  };

  const segmentToCumulativeMap = (segments) => {
    if (!segments || segments.length === 0) {
      return { GCCumulativeArray: [], ATCumulativeArray: [] };
    }
    const GCskewArray = [];
    const ATskewArray = [];
    segments.forEach((segment) => {
      const result = freqCalculate(segment);
      GCskewArray.push(CalculateSkew(result.gCnt, result.cCnt));
      ATskewArray.push(CalculateSkew(result.aCnt, result.tCnt));
    });

    const GCCumulativeArray = calculateCumulative(GCskewArray);
    const ATCumulativeArray = calculateCumulative(ATskewArray);
    return { GCCumulativeArray, ATCumulativeArray };
  };

  const handleSubmit = () => {
    if (!file) {
      alert('file not found!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const segments = divideIntoSegments(content);
      if (segments.length > 0) {
        const Yvalues = segmentToCumulativeMap(segments);
        setGCCumulativeArray(Yvalues.GCCumulativeArray);
        setATCumulativeArray(Yvalues.ATCumulativeArray);
      }

    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ATGC GRAPH VIEWER</h1>
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <input
          type="file"
          accept=".txt"
          onChange={onFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
      <div className="mt-8 w-full max-w-3xl space-y-8">
        <GraphPlot noOfSegments={segments} yValues={GCCumulativeArray} title ={"G-C cumulative values v/s No.Of Segments"} />
        <GraphPlot noOfSegments={segments} yValues={ATCumulativeArray} title={"A-T cumulative values v/s No.Of Segments"} />
        <h1 className="text-center text-xl text-gray-300">Total Segments: {segments}</h1>
      </div>
    </div>
  );
}

export default FileLoader;