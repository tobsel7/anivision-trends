export function createLineChart(dataArray, counts, chartDimensions, d3) {
    // Destructure margin, width, and height from chartDimensions
    const { margin, width, height } = chartDimensions;

    // Create the SVG container
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

    // Create the horizontal axis scale (x-axis)
    const x = d3.scaleUtc()
        .domain(d3.extent(dataArray, d => d.year))
        .range([margin.left, width - margin.right]);

    // Create the vertical axis scale (y-axis)
    const y = d3.scaleLinear()
        .domain(d3.extent(counts))
        .rangeRound([height - margin.bottom, margin.top]);

    // Append the horizontal (x-axis)
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .selectAll("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(0)");

    // Append the vertical (y-axis)
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y)
            .tickValues(d3.ticks(...y.domain(), 10)));

    // Create a line generator function
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.count));

    // Append the line path to the SVG
    svg.append("path")
        .datum(dataArray)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);

    return svg.node();
}

export function createBubbleChart(organizationsData, chartDimensions, d3) {
    // Destructure the chart dimensions
    const { width, height, marginStroke } = chartDimensions;
   
    const name = d => d.organization; // "Strings" of "flare.util.Strings"
    const group = d => d.production_country; // "util" of "flare.util.Strings"
    //const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"

    // Specify the number format for values.
    const format = d3.format(",d");

    // Create a categorical color scale.
    //const color = d3.scaleOrdinal(d3.schemeTableau10);
    // Define a custom categorical color scale for our three countries
    const color = d3.scaleOrdinal()
        .domain([1, 2, 3]) // The domain represents the input values
        .range(["#aec6cf", "#b2d8b2", "#f4c2c2"]); // Pastel blue, pastel green, pastel red
    //.range(["blue", "green", "red"]); // The range represents the corresponding colors

    // Create the pack layout.
    const pack = d3.pack()
        .size([width - marginStroke * 2, height - marginStroke * 2])
        .padding(3);

    // Compute the hierarchy from the (flat) data; expose the values
    // for each node; lastly apply the pack layout.
    const root = pack(d3.hierarchy({ children: organizationsData })
        .sum(d => d.count));

     // Create the SVG container
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .style("display", "block");

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
        .attr("y", (text, i) => i * 15 - 10) // Adjust vertical positioning for each line
        .attr("text-anchor", "middle") // Center text
        .attr("fill", "black") // Text color
        //.style("font-size", d => `${Math.min(d.r / 100.0, 3)}px`); // Dynamic font size
        .style("font-size", function (text, i, nodes) {

            const fontSize = Math.min((d3.select(nodes[i].parentNode).datum().r / 5), 9);

            console.log(`Calculated Font Size: ${fontSize}px`);

            return `${Math.max(fontSize, 12)}px`; // Constrain font size to a minimum of 10px
        });

    // Add a label.
    const text = node.append("text")
        .attr("clip-path", d => `circle(${d.r})`);

    return Object.assign(svg.node(), { scales: { color } });
    
}

//Function to split strings and add a line break between the objects
export function splitAndLineBreak(orgString) {
    const minChars = 5; // Minimum characters before considering a split
    const maxChars = 15; // Maximum characters before forcing a split
    let result = [];
    let currentLine = "";

    orgString.split(" ").forEach(word => {
        // Check if adding the word exceeds the maximum character limit
        if (currentLine.length + word.length + 1 > maxChars) { // +1 accounts for the space
            if (currentLine.length >= minChars) {
                // Push the current line to the result if it meets minChars
                result.push(currentLine.trim());
                currentLine = word + " "; // Start a new line
            } else {
                // Force split if the current line is too short
                currentLine += word + " ";
            }
        } else {
            // Add the word to the current line
            currentLine += word + " ";
        }
    });

    // Push the last line if it's not empty
    if (currentLine.trim()) {
        result.push(currentLine.trim());
    }

    return result; // Return as an array of lines
}