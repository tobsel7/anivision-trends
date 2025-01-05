---
theme: dashboard
title: Animation Trends
toc: false
---

```js
import { createLeafFirstArray, cleanUpData, VideosAndSegments, GetSegmentTypeText, getChildTypes,splitAndLineBreak, generateOrganizationsData, hierarchy } from "./components/data_transformations.js"
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
// Create the dropdown element
const genresDropdown = Inputs.select(
    genres,
    {
        multiple: true,
        label: "Selected Genres",
        value: genres
    }
);
const selectedGenres = view(genresDropdown);
// Move the dropdown into a specific container
document.getElementById("filtersContainer").appendChild(genresDropdown);


const productionCountryDropdown=Inputs.select(
    productionCountries,
    {
        multiple: true,
        label: "Selected Production Countries",
        value: productionCountries.values()
    }
);
const selectedProductionCountries = view(productionCountryDropdown);
document.getElementById("filtersContainer").appendChild(productionCountryDropdown);
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

const videosYearGroup = d3.group(filteredVideos, (v) => v.year);
const videoYearlyCounts = Array.from(videosYearGroup, ([year, items]) => ({year, count: items.length})).sort(
    (a, b) => a.year - b.year
);
```

```js
function updateLineChart(data) {
    const lineChart = Plot.plot({
        width: 800,
        height: 300,
        x: {label: "Year", tickFormat: d3.format("d"), grid: true},
        y: {label: "Count", grid: true},
        marks: [
            Plot.line(data, {x: "year", y: "count", stroke: "#56B4E9", strokeWidth: 2}),
            Plot.dot(data, {x: "year", y: "count", fill: "#D55E00"}),
        ],
        style: {
            background: "#121212",
            color: "#fff",
            fontFamily: "Arial, sans-serif",
        },
    });
    const chartContainer = document.getElementById("line-chart-container");
    if (chartContainer.firstChild) {
        chartContainer.replaceChild(lineChart, chartContainer.firstChild);
    } else {
        chartContainer.appendChild(lineChart);
    }
}

updateLineChart(videoYearlyCounts);
```

```js
function buildTree(data, hierarchy) {
    let idCounter = 1;
    const nodeMap = new Map(); // Map to store id-to-node mapping

    const leafFirstArray = createLeafFirstArray(hierarchy);
    function createNode(name, id, children = []) {
        const countChildrenNodes = (children || []).reduce((sum, child) => sum + child.count, 0);
       return {
            id,
            name,
            count:(data.get(name) || 0)+countChildrenNodes,
            selfCount: (data.get(name) || 0),
            children: (children || []).filter(child => child.count > 0)
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
        if (newNode.count > 0) {
            nodeMap.set(id, newNode);
        }
    }
    return nodeMap.get("1");
}
```

```js
function updateTreeView(data) {
    const filteredVideEffects = buildTree(data, hierarchy);
    const videoEffectsTree = document.getElementById("videoEffectsTree");
    new uv.Treeview(videoEffectsTree, filteredVideEffects, {
        width: videoEffectsTree.clientWidth,
        height: videoEffectsTree.clientHeight,
        animationDuration: 0
    });
}
const segmentCounts = new Map(segmentTypes.values().map(type => [type, segmentsForFilteredVideos.get(type)?.length || 0]));
updateTreeView(segmentCounts)
```

```js
function updateBubbleChart(filteredVideos)
{
    function drawChart(filteredVideos)
    {
        const organizationsData = generateOrganizationsData(filteredVideos);

          // Specify the dimensions of the chart.
          const width = 800;
          const height = 800;
          const marginStroke = 1; // to avoid clipping the root circle stroke
          const name = d => d.organization; // "Strings" of "flare.util.Strings"
          const group = d => d.production_country; // "util" of "flare.util.Strings"
           const count = d => d.count;
          //const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"


          // Specify the number format for values.
          const format = d3.format(",d");

          // Create a categorical color scale.
          //const color = d3.scaleOrdinal(d3.schemeTableau10);
          // Define a custom categorical color scale for our three countries
          const color = d3.scaleOrdinal()
            .domain([1, 2, 3]) // The domain represents the input values
            .range(["#6495ED", "#66C2A5", "#FC8D62"]); 
            //Blue (#6495ED): Cornflower Blue - Clear and distinguishable.
            //Green (#66C2A5): Aqua Green - Friendly to deuteranopia and protanopia.
            //Red/Orange (#FC8D62): Light Orange-Red - Distinct from green and blue.

          // Create the pack layout.
          const pack = d3.pack()
              .size([width - marginStroke * 2, height - marginStroke * 2])
              .padding(3);

          // Compute the hierarchy from the (flat) data; expose the values
          // for each node; lastly apply the pack layout.
          const root = pack(d3.hierarchy({children: organizationsData})
              .sum(d => d.count));

        const svg = d3.create("svg")
          .attr("width", width)
          .attr("height", height);


          // Place each (leaf) node according to the layout’s x and y values.
          const node = svg.append("g")
            .selectAll()
            .data(root.leaves())
            .join("g")
              .attr("transform", d => `translate(${d.x},${d.y})`);

          // Add a title.
          //node.append("title")
              //.text(d => `${d.data.organization}\n${format(d.count)}`);


  
          // Add a filled circle.
          node.append("circle")
              .attr("fill-opacity", 0.7)
              .attr("fill", d => color(group(d.data)))
              .attr("r", d => d.r);

          // Add a title inside the circle with line breaks
          node.append("text")
            .selectAll("tspan")
            .data(d => {
                const organizationLines = splitAndLineBreak(d.data.organization); // Apply line-breaking logic
                return [...organizationLines]; // Combine organization lines with the count
            })
             .join("tspan")
              .text((text, i) => text) // Add each line
              .attr("x", 0) // Center text horizontally
              .attr("text-anchor", "middle") // Center text
              .attr("fill", "black") // Text color
              .style("font-size", function (text, i, nodes) {
                  // Calculate font size based on radius
                  const parentData = d3.select(nodes[i].parentNode).datum(); // Access parent data
                  const fontSize = Math.min(parentData.r / 6, 80); // Scale dynamically with max size 80px
                  return `${Math.max(fontSize, 6)}px`; // Minimum font size is 6px
              })
              .attr("y", function (text, i, nodes) {
                  // Dynamically adjust line spacing based on font size
                  const fontSize = parseFloat(d3.select(this).style("font-size")); // Get current font size in pixels
                  return i * (fontSize + 2) - ((nodes.length - 1) * (fontSize / 2)); // Center text vertically
              });

          // Add a label.
          const text = node.append("text")
              .attr("clip-path", d => `circle(${d.r})`);

 

          return Object.assign(svg.node(), {scales: {color}});
        
    }
    const bubbleChart= drawChart(filteredVideos);
    const bubbleChartContainer = document.getElementById("bubblechart-container");
    if (bubbleChartContainer.firstChild) {
        bubbleChartContainer.replaceChild(bubbleChart, bubbleChartContainer.firstChild);
    } else {
        bubbleChartContainer.appendChild(bubbleChart);
    }
}
    updateBubbleChart(filteredVideos)
```
```js
function updateVideoTable(filteredVideos) {
    const table = Inputs.table(filteredVideos.map(v => {
        return {
            "Title": v.title,
            "Year": v.year.toString(),
            "Genres": v.genres.join(", "),
            "Production Country": Array.from(productionCountries.keys()).find(k => productionCountries.get(k) === v.production_country)
        }
    }));
    const tableContainer = document.getElementById("filteredVideosTable");
    if (tableContainer.firstChild) {
        tableContainer.replaceChild(table, tableContainer.firstChild);
    } else {
        tableContainer.appendChild(table);
    }
}

updateVideoTable(filteredVideos);
```

```js
const barPlot = Plot.plot({
    width: 800,
    height: 100,
    x: {
        label: "Year",
        tickFormat: d3.format("d"),
        grid: false,
        ticks: d3.ticks(d3.min(videoYearlyCounts, d => d.year), d3.max(videoYearlyCounts, d => d.year), 10)
    },
    y: { label: "Count", grid: true },
    marks: [
        Plot.barY(videoYearlyCounts, { x: "year", y: "count", fill: "#56B4E9" }),
    ],
    style: {
        background: "#121212",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
    },
});

const brush = d3.brushX()
    .extent([[0, 0], [800, 100]])
    .on("brush end", ({ selection }) => {
        if (selection) {
            const [x0, x1] = selection.map(d3.scaleLinear()
                .domain(d3.extent(videoYearlyCounts, d => d.year))
                .range([0, 800])
                .invert);
            const filteredCounts = videoYearlyCounts.filter(d => d.year >= x0 && d.year <= x1);
            updateLineChart(filteredCounts);
            const filteredVideoIds = new Set(filteredCounts.flatMap(d => videosYearGroup.get(d.year).map(v => v.video_id)));
            const filteredSegments = segments.filter(s => filteredVideoIds.has(s.video_id));
            const newSegmentCounts = new Map(segmentTypes.values().map(type => [type, filteredSegments.filter(s => s.annotations_label === type).length]));

            updateTreeView(newSegmentCounts);
            updateBubbleChart(filteredVideos.filter(v => filteredVideoIds.has(v.video_id)));
            updateVideoTable(filteredVideos.filter(v => filteredVideoIds.has(v.video_id)));
        }
    });

d3.select(barPlot)
    .append("g")
    .attr("class", "brush")
    .call(brush);

const brushChartContainer = document.getElementById("brush-chart");
if (brushChartContainer.firstChild) {
    brushChartContainer.replaceChild(barPlot, brushChartContainer.firstChild);
} else {
    brushChartContainer.appendChild(barPlot);
}
```


<body>
  <!-- TOP ROW: Left = Bar Chart, Right = Filters -->
  <div class="row" id="top-row">
    <div class="column chart-container" id="barChartColumn">
      <!-- "Videos over the Years" -->
      <h1>Videos over the Years</h1>
      <div id="line-chart-container"></div>
      <svg id="brush-chart" width="800" height="100"></svg>
      <div id="additional-plot-container"></div>
    </div>

<div class="column" id="filtersColumn">
      <!-- Filters -->
      <div id="filtersContainer">
        <h3>Filters</h3>
        <div id="genresDropdown"></div>
        <div id="countriesDropdown"></div>
      </div>
    </div>
  </div>

  <!-- SECOND (MIDDLE) ROW: Tree Plot (Left) + Bubble Chart (Right) -->
  <div class="row" id="middle-row">
    <div class="column" id="videoEffectsTreeColumn">
      <h2>Used Video Effects</h2>
      <div id="videoEffectsTreeContainer">
        <div id="videoEffectsTree"></div>
      </div>
    </div>

<div class="column" id="bubbleChartColumn">
      <h2>Creating Organizations</h2>
      <div id="bubblechart-container">
        <svg id="bubblechart"></svg>
      </div>
    </div>
  </div>

  <!-- BOTTOM ROW: Found Videos (Centered) -->
  <div class="row" id="bottom-row">
    <div class="column" id="filteredVideosTableColumn">
      <h2>Found Videos</h2>
      <div id="filteredVideosTableContainer">
        <div id="filteredVideosTable"></div>
      </div>
    </div>
  </div>
</body>

<style>
/* Same styling, with flex rows & columns to get the left/right layout */

body {
  font-family: Arial, sans-serif;
  background: #121212;
  color: #fff;
  margin: 0;
  padding: 20px;
}

/* Add a subtle border, padding, and rounding around each .row */
.row {
  display: flex;                  /* Horizontal layout for top/middle/bottom rows */
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;            /* Spacing between rows */

  border: 1px solid #444;         /* Subtle border for each row */
  border-radius: 6px;             /* Slight rounding of corners */
  padding: 15px;                  /* Space inside each row */
  background: #1a1a1a;            /* Slightly lighter background for row sections */
}

.column {
  flex: 1;                        /* Each column takes up equal space */
  margin: 0 10px;                 /* Small horizontal gap */

  border: 1px solid #333;         /* Subtle border around each column */
  border-radius: 4px;
  padding: 10px;                  /* Space inside each column */
}

/* Center the final row's content horizontally */
#bottom-row {
  justify-content: center;
}

/* Adjust column proportions */
#barChartColumn {
  flex: 3; /* Larger space for the plots column */
  margin-right: 10px; /* Space between bar chart and filters */
}

#line-chart-container {
  margin-bottom: 20px; /* Add space below the line chart */
}

#brush-chart {
  margin-top: 10px; /* Add space above the bar chart (brush chart) */
}


#filtersColumn {
  flex: 1; /* Smaller space for the filters column */
  margin-left: 10px; /* Space on the left side of filters */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align filters at the top */
  align-items: center;
  padding: 10px;
  border: 1px solid #333; /* Subtle border for the filters column */
  border-radius: 4px;
  background: #1a1a1a; /* Match the row background */
}

/* Adjust filter dropdowns */
#filtersContainer {
  width: 100%; /* Fit within the filters column */
}

#genresDropdown,
#countriesDropdown {
  width: 90%; /* Adjust dropdown width to fit smaller column */
  margin-bottom: 15px; /* Space between dropdowns */
}

/* Center the final row's content horizontally */
#bottom-row {
  justify-content: center;
}

/* Chart container styles */
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#videoEffectsTreeContainer {
  display: flex; /* Flexbox for centering */
  justify-content: center; /* Horizontal centering */
  align-items: center; /* Vertical centering */
  width: 100%; /* Full width of the column */
  height: 95%; /* Full height of the column */
  border: 1px dashed #444; /* Dashed border for visibility */
  border-radius: 4px; /* Rounded corners */
  background: #fff; /* White background for contrast */
  position: relative; /* Position relative for contained elements */
  padding: 0; /* Remove excess padding */
  overflow: hidden; /* Ensure content does not overflow the container */
  box-sizing: border-box; /* Include padding in width and height calculations */
}

#videoEffectsTree {
  display: block; /* Ensure the tree plot is treated as a block element */
  margin: 0; /* Reset margins to prevent overflow */
  max-width: 150%; /* Increase maximum width to make it bigger */
  max-height: 150%; /* Increase maximum height to make it bigger */
  width: 90%; /* Slightly increase the width */
  height: auto; /* Maintain aspect ratio */
}

/* If unipept's uv-treeview-node needs white text, keep this: */
.uv-treeview-node {
  color: #fff;
}

/* Found Videos table container */
#filteredVideosTableContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  /* optional: add a border if you want this area to stand out too
     border: 1px dashed #444; 
     border-radius: 4px; 
  */
}

#filteredVideosTable {
  width: 100%;
  /* optional: border around the table itself */
  /* border: 1px solid #666; 
     border-radius: 4px; 
     padding: 10px; 
  */
}
</style>
