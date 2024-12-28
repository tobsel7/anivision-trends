---
theme: dashboard
title: Animation Trends
toc: false
---

```js
import { cleanUpData, VideosAndSegments, GetSegmentTypeText, hierarchy } from "./components/data_transformations.js"
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
        value: productionCountries
    }
))
```

```js
const filteredVideos = videos
    .filter((v) => v.genres.some((g) => selectedGenres.includes(g)))
    .filter(v => selectedProductionCountries.includes(v.production_country))
```

```js
const segmentsForFilteredVideos =
    filteredVideos.map(
        v => segments.filter(s => s.video_id === v.video_id)
    ).filter(
        segments => segments.length > 0
    )
console.log(segmentsForFilteredVideos)
// TODO build tree of segment counts for tree visualization
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
        renderAdditionalBarPlot(filteredData); // Update bar plot
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
      renderAdditionalBarPlot(filteredData); // Update the additional bar plot
      renderBrush(); // Refresh the brush with unfiltered data
    }
  };

  return updatePlots; // Return a function to trigger updates dynamically
}




// Function for the additional bar plot
function renderAdditionalBarPlot(filteredData) {
  const barPlot = Plot.plot({
    height: 300,
    width: 800,
    x: {
      label: "Year",
      tickFormat: (d, i, values) => {
        const interval = Math.ceil(values.length / 10); // Show approximately 10 ticks
        return i % interval === 0 ? d.toString() : ""; 
      },
      grid: true,
    },
    y: { label: "Count", grid: true },
    marks: [
      Plot.barY(filteredData, { x: "year", y: "count", fill: "#D55E00" }), // Orange bars
    ],
    style: {
      background: "#121212", // Black background
      color: "#fff", // White text
    },
  });

  const additionalContainer = document.getElementById("additional-plot-container");
  additionalContainer.innerHTML = ""; // Clear previous plot
  additionalContainer.appendChild(barPlot);
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
const filteredVideEffects = {
    "id": 1,
    "name":"Image Type",
    "count": 130,
    "selfCount": 0,
    "children": [
        {
            "id": 2,
            "name":"Animation",
            "count": 120,
            "selfCount": 0,
            "children": [
                {
                    "id": 3,
                    "name":"Drawn Animation",
                    "count": 30,
                    "selfCount": 30,
                    "children": []
                },
                {
                    "id": 4,
                    "name":"Modified Base",
                    "count": 50,
                    "selfCount": 50,
                    "children": []
                },
                {
                    "id": 5,
                    "name":"Direct/Cameraless",
                    "count": 13,
                    "selfCount": 13,
                    "children": []
                },
                {
                    "id": 6,
                    "name":"Computer Animation",
                    "count": 45,
                    "selfCount": 45,
                    "children": []
                },
                {
                    "id": 7,
                    "name":"Miscellaneous Animation",
                    "count": 23,
                    "selfCount": 23,
                    "children": []
                },
                {
                    "id": 8,
                    "name":"Cutout",
                    "count": 1,
                    "selfCount": 1,
                    "children": []
                },
                {
                    "id": 9,
                    "name":"Stop-Motion",
                    "count": 4,
                    "selfCount": 4,
                    "children": []
                },
                {
                    "id": 10,
                    "name":"Time Manipulation",
                    "count": 8,
                    "selfCount": 8,
                    "children": []
                }
            ]
        },
        {
            "id": 11,
            "name":"Hybrid Image",
            "count": 3,
            "selfCount": 3,
            "children": []
        },
        {
            "id": 12,
            "name":"Live-Action",
            "count": 17,
            "selfCount": 17,
            "children": []
        },
        {
            "id": 13,
            "name":"Still Image",
            "count": 55,
            "selfCount": 4,
            "children": [
                {
                    "id": 14,
                    "name":"Photographic",
                    "count": 5,
                    "selfCount": 5,
                    "children": []
                },
                {
                    "id": 15,
                    "name":"Graphic",
                    "count": 8,
                    "selfCount": 8,
                    "children": []
                },
                {
                    "id": 16,
                    "name":"Colour Matte",
                    "count": 13,
                    "selfCount": 13,
                    "children": []
                },
                {
                    "id": 17,
                    "name":"Hybrid",
                    "count": 22,
                    "selfCount": 22,
                    "children": []
                },
                {
                    "id": 18,
                    "name":"Uncertain",
                    "count": 3,
                    "selfCount": 3,
                    "children": []
                }
            ]
        },
        {
            "id": 19,
            "name":"Irrelevant",
            "count": 5,
            "selfCount": 5,
            "children": []
        },
        {
            "id": 20,
            "name":"Uncertain",
            "count": 22,
            "selfCount": 22,
            "children": []
        }
    ]
}
```

```js
const videoEffectsTree = document.getElementById("videoEffectsTree");
new uv.Treeview(videoEffectsTree, filteredVideEffects);
```

