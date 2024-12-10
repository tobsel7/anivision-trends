---
theme: dashboard
title: Collapsable Tree Menu Demo
toc: false
---

# Collapsable Tree Menu 

```js
const data = FileAttachment("./data/image-types.json").json()
```

```js
import { createTreeChart } from './components/collapsable_tree.js';

// Create the chart
var chartNode = createTreeChart(d3, data);


 const existingElement = document.getElementById("collapsable-tree-menu");

 // Insert the new element after the existing element
  existingElement.parentNode.insertBefore(chartNode, existingElement.nextSibling);

  //document.body.appendChild(chartNode);



```



