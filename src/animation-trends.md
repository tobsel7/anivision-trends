---
theme: dashboard
title: Animation Trends
toc: false
---

```js
import { createLeafFirstArray, cleanUpData, VideosAndSegments, GetSegmentTypeText, getChildTypes, hierarchy } from "./components/data_transformations.js"
import uv from "unipept-visualizations";
```
<script src="https://cdn.jsdelivr.net/npm/unipept-visualizations@latest/dist/unipept-visualizations.js"></script>

```js
const videosCsv = await FileAttachment("data/videos.csv").csv({typed: true})
const segmentsCsv = await FileAttachment("data/segments.csv").csv({typed: true})
```

```js
const videosAndSegments = new VideosAndSegments(videosCsv, segmentsCsv, d3)

const videos = videosAndSegments.cleanedUpVideos
const segments = videosAndSegments.videoSegments
```

```js
const genres = new Set(videos.flatMap(v => v.genres))
const productionCountries = new Map([
    ["Western Germany", 1], 
    ["Eastern Germany", 3],
    ["Austria", 2]
])
```

```js
const segmentTypes = new Set([
    "Still Image",
    "Animation",
    "Live-Action",
    "Hybrid Image",
    "Graphic",
    "Photographic",
    "Cutout",
    "Fade In",
    "Fade Out",
    "Slow Motion",
    "Irrelevant",
    "Uncertain",
    "Limited Cel",
    "scientific/technical image",
    "dissolve animation",
    "3D",
    "Colour Matte",
    "Puppets",
    "2D",
    "Hybrid",
    "Timelapse",
    "Full Cel",
    "Dissolve",
    "Animated Transition",
    "Immobile Objects",
    "Stop Trick",
    "Cutout visible",
    "Text",
    "Clay"
])
```

# Animation Trends 🎥

```js
const selectedGenres = view(Inputs.select(
    genres,
    {
        multiple: true,
        label: "Selected Genres",
        value: genres
    }
))
const selectedProductionCountries = view(Inputs.select(
    productionCountries,
    {
        multiple: true,
        label: "Selected Production Countries",
        value: productionCountries.values()
    }
))
```

```js
const filteredVideos = videos
    .filter((v) => v.genres.some((g) => selectedGenres.includes(g)))
    .filter(v => selectedProductionCountries.includes(v.production_country))
```

```js
const filteredVideoIds = new Set(filteredVideos.map(v => v.video_id))
const segmentsForFilteredVideos =
    d3.group(
        segments.filter(
            s => s.video_id && filteredVideoIds.has(s.video_id)
        ),
        s => s.annotations_label //TODO should be segment_type_number
    )
```

```js
function createSlidingWindowPlot(videos, getSelectedGenres, getSelectedProductionCountries, containerId, brushContainerId, width = 800, height = 300) {
  // Compute grouped video counts
  const computeVideoCounts = (data) => {
    const groupedVideos = d3.group(data, (v) => v.year);
    return Array.from(groupedVideos, ([year, items]) => ({ year, count: items.length })).sort(
      (a, b) => a.year - b.year
    );
  };

  // Initial data for the brush chart (always unfiltered)
  const allVideoCounts = computeVideoCounts(videos);

  // Filter videos based on selections
  const filterVideosBySelection = (genres, productionCountries) => {
    return videos
        .filter((v) => v.genres.some((g) => genres.includes(g)))
        .filter(v => productionCountries.includes(v.production_country))
  };

  // Store the previous selection of genres
  let previousGenres = [...getSelectedGenres];
  let previousProductionCountries = [...getSelectedProductionCountries];
  
    // Initial filtering for main chart
  let videoCounts = computeVideoCounts(filteredVideos); // Filtered counts for the main chart
  let filteredData = [...videoCounts]; // Data to render on the main chart

  // Render the main line and dot plot
  const renderPlot = (data) => {
    const plot = Plot.plot({
      width,
      height,
      x: { label: "Year", tickFormat: d3.format("d"), grid: true },
      y: { label: "Count", grid: true },
      marks: [
        Plot.line(data, { x: "year", y: "count", stroke: "#56B4E9", strokeWidth: 2 }),
        Plot.dot(data, { x: "year", y: "count", fill: "#D55E00" }),
      ],
      style: {
        background: "#121212", // Black background
        color: "#fff", // White text
        fontFamily: "Arial, sans-serif",
      },
    });

    const chartContainer = document.getElementById(containerId);
    chartContainer.innerHTML = ""; // Clear previous chart
    chartContainer.appendChild(plot);
  };

  renderPlot(videoCounts); // Initial render with filtered data

  const brushSvg = d3.select(`#${brushContainerId}`);
  const margin = { top: 10, right: 20, bottom: 20, left: 20 };
  const brushWidth = +brushSvg.attr("width") - margin.left - margin.right;
  const brushHeight = +brushSvg.attr("height") - margin.top - margin.bottom;

  const xBrushScale = d3
    .scaleLinear()
    .domain(d3.extent(allVideoCounts, (d) => d.year)) // Always unfiltered data
    .range([0, brushWidth]);

  const yBrushScale = d3
    .scaleLinear()
    .domain([0, d3.max(allVideoCounts, (d) => d.count)]) // Always unfiltered data
    .range([brushHeight, 0]);

  const brush = d3.brushX()
    .extent([
      [0, 0],
      [brushWidth, brushHeight],
    ])
    .on("brush end", ({ selection }) => {
      if (selection) {
        const [x0, x1] = selection.map(xBrushScale.invert);
        filteredData = videoCounts.filter((d) => d.year >= x0 && d.year <= x1); // Filter main chart data
        renderPlot(filteredData); // Update the main plot
      }
    });

  const g = brushSvg
    .append("g")
    .attr("class", "brush") // Add a class to identify the brush element
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const renderBrush = () => {
    g.selectAll("*").remove(); // Clear previous brush content

    g.selectAll("rect")
      .data(allVideoCounts) // Always unfiltered data
      .join("rect")
      .attr("x", (d) => xBrushScale(d.year))
      .attr("y", (d) => yBrushScale(d.count))
      .attr("width", brushWidth / allVideoCounts.length)
      .attr("height", (d) => brushHeight - yBrushScale(d.count))
      .attr("fill", "#56B4E9");

    g.append("g")
      .attr("transform", `translate(0,${brushHeight})`)
      .call(d3.axisBottom(xBrushScale).ticks(10).tickFormat(d3.format("d")))
      .selectAll("text")
      .style("fill", "#fff");

    g.append("g").call(d3.axisLeft(yBrushScale).ticks(5)).selectAll("text").style("fill", "#fff");

    g.append("g").call(brush); // Append brush behavior
  };

  renderBrush(); // Render the brush initially
    
  // Update plots when selections change
  const updatePlots = () => {
    const currentGenres = [...getSelectedGenres];
    const currentProductionCountries = [...getSelectedProductionCountries];

      if (JSON.stringify(currentGenres) !== JSON.stringify(previousGenres)) {
      // Check if the selection has changed
      previousGenres = [...currentGenres]; // Update the stored genres
      g.call(brush.move, null); // Reset the brush selection
      videoCounts = computeVideoCounts(filteredVideos); // Recompute video counts
      filteredData = [...videoCounts]; // Reset filtered data
      renderPlot(filteredData); // Update the main plot
      renderBrush(); // Refresh the brush with unfiltered data
    }
  };

  return updatePlots; // Return a function to trigger updates dynamically
}

// Pass the dynamic function for genre selection
createSlidingWindowPlot(videos, selectedGenres, selectedProductionCountries, "line-chart-container", "brush-chart");

```
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #121212;
      color: #fff;
      margin: 0;
      padding: 20px;
    }

    .chart-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  </style>
<body>
  <div class="chart-container">
    <h1>Videos over the Years</h1>
    <div id="line-chart-container"></div>
    <svg id="brush-chart" width="800" height="100"></svg>
    <div id="additional-plot-container"></div>
  </div>
<div id="videoEffectsTree"></div>

```js
const segmentCounts = new Map(segmentTypes.values().map(type => [type, segmentsForFilteredVideos.get(type)?.length || 0]));

function buildTree(hierarchy) {
    let idCounter = 1;
    const nodeMap = new Map(); // Map to store id-to-node mapping

    const leafFirstArray = createLeafFirstArray(hierarchy);
    function createNode(name, id, children = []) {
        const countChildrenNodes = children.reduce((sum, child) => sum + child.count, 0);
       return {
            id,
            name,
            count:(segmentCounts.get(name) || 0)+countChildrenNodes,
            selfCount: (segmentCounts.get(name) || 0),
            children
        };
    }

    function getAllChildNodes(childMap, nodeMap) {
        const childNodes = [];
        for (const key of childMap.keys()) {
            const id = key;
            if (nodeMap.has(id)) {
                childNodes.push(nodeMap.get(id)); // Add node to result array
            }
        }
        return childNodes;
    }

    for (const entry of leafFirstArray) {
        const { id, name, parent } = entry;
        const currentChildMap = getChildTypes(leafFirstArray, id);
        const childNodes = getAllChildNodes(currentChildMap, nodeMap);
        const newNode = createNode(name, id, childNodes);
        nodeMap.set(id, newNode);
    }
    return nodeMap.get("1");
}
```

```js

    // Build the tree
    const filteredVideEffects = buildTree(hierarchy);
    //console.error("Created node tree:", filteredVideEffects);
    // Render the tree in the DOM
    const videoEffectsTree = document.getElementById("videoEffectsTree");
    new uv.Treeview(videoEffectsTree, filteredVideEffects);

```

