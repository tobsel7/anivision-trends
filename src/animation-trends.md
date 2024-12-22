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
```

```js
const filteredVideos = videos.filter(v => v.genres.some(g => 
    selectedGenres.includes(g) &&
    1 == 1 // add filter conditions here
))
const groupedVideos = d3.group(filteredVideos, v => v.year)

const videoCounts = Array.from(groupedVideos, ([year, videos]) => ({year, count: videos.length}))
    .sort((a, b) => a.year - b.year)

const plot = view(Plot.plot({
        title: "Videos over the years",
        width,
        height: 300,
        x: {label: "Year", tickFormat: d3.format("d")},
        y: {label: "Count"},
        marks: [
            Plot.line(videoCounts, {x: "year", y: "count", stroke: "steelblue"}),
            Plot.dot(videoCounts, {x: "year", y: "count", fill: "steelblue"})
        ]
    }))
```

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

