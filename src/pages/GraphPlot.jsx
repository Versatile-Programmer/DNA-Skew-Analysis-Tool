import React from 'react';
import Plot from 'react-plotly.js';

const GraphPlot = ({ noOfSegments, yValues, title }) => {
    const xValues = [];
    for (let i = 0; i < noOfSegments; i++) {
        xValues.push(i);
    }

    return (
        <div className="w-full p-4 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-white text-center">{title}</h2>
            <div className="w-full" style={{ height: '400px' }}>
                <Plot
                    data={[
                        {
                            x: xValues,
                            y: yValues,
                            mode: "delta",
                            marker: {
                              color: 'rgb(158,202,225)',
                              opacity:0.6,
                              line: {
                                color: 'rgb(8,48,107)',
                                width: 1.5
                              }
                            }
                        },
                    ]}
                    layout={{
                        autosize: true,
                        title: '',
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        xaxis: {
                          title: "Segment number",
                          color: 'white'
                        },
                        yaxis: {
                            title: 'Cumulative Values',
                            color: 'white'
                        },
                    }}
                    config={{
                      scrollZoom: true,  // Enable zoom using the scroll wheel
                      responsive: true,  // Makes the chart responsive to container size
                      displayModeBar: true, // Display the mode bar
                      modeBarButtonsToRemove: ['toImage']
                      }}
                />
            </div>  
        </div>
    );
};

export default GraphPlot;