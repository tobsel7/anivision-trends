---
theme: dashboard
title: Animation Trends
toc: false
---

```js
const videos = FileAttachment("data/videos.csv").csv({typed: true});
```

```js
const genres = Array.from(new Set(videos.flatMap(d => 
    d.genres.split(",")
        .map(g => g.trim()
        .replace(/"/g, ""))
    )));
```

# Animation Trends 🎥

```js
function lineChart(videos, {width} = {}) {
    const groupedVideos = d3.group(videos, d => new Date(d.date_of_release).getFullYear())

    const videoCounts = Array.from(groupedVideos, ([year, values]) => ({year, count: values.length}))
        .sort((a, b) => a.year - b.year);
    
    return Plot.plot({
        title: "Videos over the years", 
        width, 
        height: 300,
        x: {label: "Year", tickFormat: d3.format("d")},
        y: {label: "Count"}, 
        marks: [
            Plot.line(videoCounts, {x: "year", y: "count", stroke: "steelblue"}), 
            Plot.dot(videoCounts, {x: "year", y: "count", fill: "steelblue"})
        ]
    });
}
```

<div>
    ${resize((width) => lineChart(videos, {width}))}
</div>
