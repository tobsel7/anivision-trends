---
theme: dashboard
title: Timeline with Bubble Chart Demo
toc: false
---

# Timeline with Bubble Chart Demo

```js
import { cleanUpData } from './components/data_transformations.js';
import { createLineChart, createBubbleChart} from './components/draw_charts.js';

// Load the CSV data
const videos = await FileAttachment("./data/videos.csv").csv()
const segments = await FileAttachment("./data/segments.csv").csv
var cleanedUpVideos = cleanUpData(videos)
//Count videos per year
var videosPerYear = d3.rollup(
    cleanedUpVideos,
    v => v.length,       // Count the number of videos
    d => d.year           // Group by year
);

// Convert the result into an array of counts only
var counts = Array.from(videosPerYear.values());

var dataArray = Array.from(videosPerYear, ([year, count]) => ({ year, count }));

// Sort dataArray by year
dataArray.sort((a, b) => d3.ascending(a.year, b.year));


//Dummy data for bubble chart
var organizationsData = [
  { organization: "Johannes Gutenberg-Universität Mainz", count: 1, production_country: 1},
  { organization: "Henkel", count: 1, production_country: 1 },
  { organization: "Institut für Geophysikalische Wissenschaften", count: 4, production_country: 1 },
  { organization: "Fernsehen der DDR", count: 1, production_country: 3 },
  { organization: "Institut für den wissenschaftlichen Film (IWF)", count: 2, production_country: 2 },
  { organization: "VE Kombinat Braunkohlekraftwerke", count: 2, production_country: 3 }
];

//console.log("Data cleanedUpVideos:", data.cleanedUpVideos);
console.log("Data counts:",counts);

// Define the chart dimensions
var chartDimensions = {
  margin: { top: 30, right: 30, bottom: 20, left: 40 },
  width: 800, // Width of the chart
  height: 300 // Height of the chart
};

 const existingElement = document.getElementById("timeline-with-bubble-chart-demo");

 

// Call the line chart function
var chart = createLineChart(dataArray, counts, chartDimensions,d3);
// Insert the new element after the existing element
  existingElement.parentNode.insertBefore(chart, existingElement.nextSibling);

// Append the chart to the DOM
//document.body.appendChild(chart);

var bubbleChartDimensions = {
    width: 800,
    height: 400,
    marginStroke: 1 // To avoid clipping the stroke
};
const bubbleChart = createBubbleChart(organizationsData, bubbleChartDimensions, d3);
 existingElement.parentNode.insertBefore(bubbleChart, existingElement.nextSibling);
// Append to the DOM
//document.body.appendChild(bubbleChart);

  
```