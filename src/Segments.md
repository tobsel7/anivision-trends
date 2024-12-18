---
theme: dashboard
title: Segments Test
toc: false
---

# Segments Test

```js
// Load the CSV data
const videos = FileAttachment("data/videos.csv").csv({typed: true});
const segments = FileAttachment("data/segments.csv").csv({typed: true});
```

```js

import { VideosAndSegments, GetSegmentTypeText } from './components/data_transformations.js';

var videosAndSegments = new VideosAndSegments(videos, segments, d3);
var videoSegments=videosAndSegments.GetVideoSegments();

// Group data by segment_type_number and count occurrences
const counts = {};
videoSegments.forEach(segment => {
  const number = segment.segment_type_number;
  if (!counts[number]) counts[number] = 0;
  counts[number]++;
});

// Convert grouped data into an array of objects
const graphData = Object.entries(counts).map(([number, count]) => ({
  label: `${number}: ${GetSegmentTypeText(number)}`,
  count
}));

// Set up D3.js line graph
const margin = { top: 20, right: 30, bottom: 1000, left: 100 },
  width = 800 - margin.left - margin.right,
  height = 500;// - margin.top - margin.bottom;

  const svg = d3.create("svg")
        .attr("width", width)
        .attr("height",  height + margin.top + margin.bottom)
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .attr("viewBox", [0, 0, width, height]);

// Scales
const xScale = d3.scalePoint()
  .domain(graphData.map(d => d.label))
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(graphData, d => d.count)])
  .range([height, 0]);

// Line generator
const line = d3.line()
  .x(d => xScale(d.label))
  .y(d => yScale(d.count));

// Draw the line
svg.append("path")
  .datum(graphData)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);

// X-axis
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale))
  .selectAll("text")
  .attr("transform", "rotate(-90)")
  .style("text-anchor", "end");

// Y-axis
svg.append("g")
  .call(d3.axisLeft(yScale));

// Add labels
svg.selectAll(".dot")
  .data(graphData)
  .enter().append("circle")
  .attr("class", "dot")
  .attr("cx", d => xScale(d.label))
  .attr("cy", d => yScale(d.count))
  .attr("r", 4)

const existingElement = document.getElementById("segments-test");
 existingElement.parentNode.insertBefore(svg.node(), existingElement.nextSibling);

```