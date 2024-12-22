---
theme: dashboard
title: Facet Chart
toc: false
---

```js
const videos = FileAttachment("data/videos.csv").csv({typed: true});
const segments = FileAttachment("data/segments.csv").csv({typed: true});
```

```js
// Combine videos and segments by video_id
const videoMap = new Map(videos.map(d => [d.video_id, d]));

const combinedData = segments.map(segment => {
  const video = videoMap.get(segment.video_id) || {};
  return { ...segment, ...video };
});

// Initialize filteredData as a global variable
let filteredData = combinedData;
```

```js
const genres = Array.from(new Set(videos.flatMap(d => 
    d.genres.split(",")
        .map(g => g.trim()
        .replace(/"/g, ""))
    )));
```
```js
function renderLineChart(videos) {
  // Gruppiere die Videos nach Jahr
  const groupedVideos = d3.group(videos, d => new Date(d.date_of_release).getFullYear());
  const videoCounts = Array.from(groupedVideos, ([year, values]) => ({ year, count: values.length }))
    .sort((a, b) => a.year - b.year);

  // Erstelle das Plot-Diagramm
  const chart = Plot.plot({
    title: "Videos over the Years",
    width: 800,
    height: 300,
    x: { label: "Year", tickFormat: d3.format("d") },
    y: { label: "Count" },
    marks: [
      Plot.line(videoCounts, { x: "year", y: "count", stroke: "steelblue" }),
      Plot.dot(videoCounts, { x: "year", y: "count", fill: "steelblue" })
    ]
  });

  // Event-Listener: Filtere die Daten nach Jahrzehnt und aktualisiere das Faceted Chart
  chart.addEventListener("click", event => {
    const { left } = chart.getBoundingClientRect();
    const x = event.clientX - left;
    const xScale = chart.scale("x");
    const clickedYear = Math.round(xScale.invert(x));
    const decadeStart = Math.floor(clickedYear / 10) * 10;
    const decadeEnd = decadeStart + 10;

    // Filtere die globalen Daten
    let filteredData = combinedData.filter(d => {
      const yr = new Date(d.date_of_release).getFullYear();
      return yr >= decadeStart && yr < decadeEnd;
    });

    console.log(`Filtered Data for Decade: ${decadeStart} - ${decadeEnd}`);

    // Aktualisiere das Faceted Chart
    const facetedContainer = document.getElementById("facetedChart");
    facetedContainer.innerHTML = ""; // Lösche altes Diagramm
    facetedContainer.appendChild(renderFacetedChart(filteredData));
  });

  return chart;
}
```

```js
function renderFacetedChart(data) {
  // Clean the genres field by removing surrounding quotes or unwanted characters
  const cleanedData = data.map(d => ({
    ...d,
    genres: d.genres
      .replace(/^["“”]+|["“”]+$/g, '') // Remove leading/trailing quotes
      .trim()
  }));

  // Sort the cleaned data by genres
  const sortedData = cleanedData.sort((a, b) => d3.ascending(a.genres, b.genres));

  return Plot.plot({
    title: "Distribution of Video Genres Over the Years",
    subtitle: "Each facet represents a genre, with points indicating the release year.",
    facet: {
      data: sortedData,
      y: "genres",
      marginLeft: 150,
      marginTop: 40,
      marginBottom: 60, // Give space at the bottom
      marginRight: 20
    },
    marks: [
      Plot.frame({ stroke: "#aaa", strokeWidth: 0.5 }),
      Plot.dot(sortedData, {
        x: d => new Date(d.date_of_release).getFullYear(),
        y: "genres",
        fill: "genres",
        r: 6,                 // Increase dot size
        stroke: "#333",
        strokeWidth: 0.5,
        fillOpacity: 0.8,
        // Tooltip functionality
        title: d => `Title: ${d.title}
Organizations: ${d.organizations}
Agents: ${d.agents}`
      })
    ],
    width: 900,
    height: 800,
    x: {
      grid: true,
      label: "Year of Release",
      labelOffset: 55,  
      tickSize: 5,
      tickPadding: 10
    },
    y: {
      axis: null,       
      label: "Genres"
    },
    color: {
      legend: true,
      scheme: "set3"
    }
  });
}
```

<div>
  <!-- Line Chart Container -->
  <div id="lineChart">${resize((width) => renderLineChart(videos, { width }))}</div>
  
  <!-- Faceted Chart Container -->
  <div id="facetedChart">${resize((width) => renderFacetedChart(filteredData, { width }))}</div>
</div>


