import React from 'react';
import Plot from 'react-plotly.js';

const GraphPlot = ({ noOfSegments, yValues, title }) => {
  console.log(title);
  const xValues = Array.from({ length: noOfSegments }, (_, i) => i + 1);

  return (
    <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md">
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
            title: '',
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
              title: 'Segment Number',
              color: 'white',
            },
            yaxis: {
              title: 'Skew Cumulative Values',
              color: 'white',
            },
          }}
          config={{
            scrollZoom: true,
            responsive: true,
            displayModeBar: true,
            modeBarButtonsToRemove: ['toImage'],
          }}
        />
      </div>
    </div>
  );
};

export default GraphPlot;
