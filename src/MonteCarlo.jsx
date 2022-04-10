import React from 'react';
import Plot from 'react-plotly.js';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%% Monte Carlo Method for Pi in JavaScript %%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Accepts one parameter as input: the LIMIT for the number of iterations
// Logs the value of pi within a while loop
// The convergence is very slow, reaching a 4 digit approximation after 10M iterations
// convergence might be optimized if we didn't use Math.random
function monteCarloPi(limit) {
    // Calculate area in a circle.

    // Initialize circle radius to 1
    let radius = 1;
    // Initialize counter for total points generated
    let points_total = 0;
    // Initialize counter for number of points inside the circle
    let points_inside = 0;

    // Generate LIMIT number of points
    while (points_total < limit) {
        // Increment the total
        points_total++;

        // Create random x,y variables
        let x = Math.random() * radius;
        let y = Math.random() * radius;

        // Whenever this x,y point is inside the circle, increment the counter for points inside
        if (Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(radius, 2)) {
          points_inside++;
        }
    }

    // Return the value of pi, formula originates from:
    // pi/4 = integral from 0 to 1 of sqrt(1-x^2) dx
    // which is the area under the curve of 1/4 of a circle
    // and this area is approximated by (points_inside / points_total)
    // multiplying by 4 gives us the full value for pi
    return ( (4 * points_inside) / points_total );
}

// UI Component Returned from Histogram
function CreateHistogram() {
    // Declare Array to Store Iterations
    let values = [];
    // Set Number of Iterations
    let iterations = 1000;
    // Set Point Resolution
    let pointIterations = 100000;

    // Add Random Iterations to Array
    for (let i = 0; i < iterations; i++) {
        values[i] = monteCarloPi(pointIterations);
    }

    // Initialize Trace for Plotly Graph
    let trace = {
        x: values,
        type: 'histogram'
    };

    // Store Trace inside of an array
    let graphData = [trace];

    // Get Histogram Sum and Average
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = (sum / values.length) || 0;

    return (
      <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Plot
        data = {graphData}
        layout={ {
          autosize: true,
          title: `Histogram of Monte Carlo Pi Estimate with ${iterations} Iterations`,
          }
        }
        useResizeHandler = {true}
        style={{width: "100%", height: "100%"}}
      />
      <div>
        <p>The Total Average Value is {avg} </p>
        <p>The Total Number of Iterations is {iterations} </p>
        <p>The Resolution of Every Point is {pointIterations} </p>
      </div>
      </div>
    );
}

function MonteCarlo() {
  return (
    <div>
      <CreateHistogram />
    </div>
  )
};

export default MonteCarlo;
