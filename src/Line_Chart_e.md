---
theme: deep-space
title: Line Chart
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
  // Group videos by year and calculate counts
  const groupedVideos = d3.group(videos, d => new Date(d.date_of_release).getFullYear());
  const videoCounts = Array.from(groupedVideos, ([year, values]) => ({ year, count: values.length }))
    .sort((a, b) => a.year - b.year);

  // Create the main line chart
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

  // Add event listener to redirect to facet.md with the selected decade
  chart.addEventListener("click", event => {
    const { left } = chart.getBoundingClientRect();
    const x = event.clientX - left;
    const xScale = chart.scale("x");
    const clickedYear = Math.round(xScale.invert(x));
    const decadeStart = Math.floor(clickedYear / 10) * 10;

    // Redirect to facet.md with the decade as a query parameter
    const url = `facet?decade=${decadeStart}`;
    console.log(`Navigating to ${url}`);
    window.location.href = url;
  });

  return chart;
}
```


<div>
  <div id="lineChart">${resize((width) => renderLineChart(videos, { width }))}</div>
</div>

