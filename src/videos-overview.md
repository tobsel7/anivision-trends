---
theme: dashboard
title: AniVision Data Overview
toc: false
---

# Video Data Overview

```js
const videos = FileAttachment("data/videos.csv").csv({typed: true});
```

## Production Countries

There are 3 production countries in the dataset: Western Germany, Austria, and Eastern Germany.

<div class="grid grid-cols-4">
  <div class="card">
    <h2>Western Germany</h2>
    <span class="big">${videos.filter((v) => v.production_country === 1).length.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Austria</h2>
    <span class="big">${videos.filter((v) => v.production_country === 2).length.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Eastern Germany</h2>
    <span class="big">${videos.filter((v) => v.production_country === 3).length.toLocaleString("en-US")}</span>
  </div>
</div>

## Raw Table

```js
Inputs.table(videos)
```