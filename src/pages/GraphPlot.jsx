import React, { useRef } from 'react';
import Plot from 'react-plotly.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GraphPlot = ({ noOfSegments, yValues, title }) => {
  const graphRef = useRef(null);

  if (!yValues.length) {
    return <p className="text-center text-gray-300">No data available to plot.</p>;
  }

  const xValues = Array.from({ length: noOfSegments }, (_, i) => i + 1);

  const downloadGraphAsPDF = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Slight delay for rendering
  
      // Capture the graph as an image with optimized settings
      const canvas = await html2canvas(graphRef.current, {
        scale: 1, // Reduce scale for better performance
        useCORS: true,
        logging: false, // Disable logs for performance
        allowTaint: true, // Allow tainted canvas
        width: graphRef.current.offsetWidth,
        height: graphRef.current.offsetHeight,
      });
      
      
      // Convert the canvas to JPEG instead of PNG (smaller file size)
      const imgData = canvas.toDataURL('image/jpeg', 0.75); // 0.75 quality reduces size
  
      // Create a PDF in landscape format
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
  
      // Calculate the image size proportionally to fit inside A4 dimensions
      const imgWidth = 280; // mm for A4 landscape
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${title.replace(/\s+/g, '_')}_graph.pdf`);
    } catch (error) {
      console.error('Error downloading graph:', error);
    }
  };
  

  return (
    <div ref={graphRef} className="w-full p-4 bg-gray-800 rounded-lg shadow-md relative">
      <h2 className="text-xl font-semibold mb-4 text-white text-center">{title}</h2>
      <div className="w-full" style={{ height: '400px' }}>
        <Plot
          data={[
            {
              x: xValues,
              y: yValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'rgb(158,202,225)' },
              line: { color: 'rgb(8,48,107)', width: 2 },
            },
          ]}
          layout={{
            autosize: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
              title: {
                  text: 'Segment Number',
                  font: {
                      size: 16,
                      color: 'white',
                  },
                  standoff: 5, // Reduce this value to bring the title closer inside the plot
              },
              color: 'white',
              automargin: true
          }
          ,
            yaxis: { title: 'Skew Cumulative Values', color: 'white' },
          }}
          config={{
            scrollZoom: true,
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['toImage'],
          }}
        />
      </div>
      <button
        onClick={downloadGraphAsPDF}
        className="absolute top-2 right-2 bg-gray-500-500 hover:bg-sky-600 text-white font-bold py-1 px-2 rounded text-xs"
      >
        ⬇
      </button>
    </div>
  );
};

export default GraphPlot;
