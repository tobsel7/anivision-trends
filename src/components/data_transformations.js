export class VideosAndSegments {
    constructor(videos, segments, d3) {
        this.videos = videos;
        this.segments = segments;
        this.cleanedUpVideos = cleanUpData(videos)
        //Count videos per year
        this.videosPerYear = d3.rollup(
            this.cleanedUpVideos,
            v => v.length,       // Count the number of videos
            d => d.year           // Group by year
        );

        // Convert the result into an array of counts only
        this.counts = Array.from(this.videosPerYear.values());
        this.dataArray = Array.from(this.videosPerYear, ([year, count]) => ({ year, count }));
        // Sort dataArray by year
        this.dataArray.sort((a, b) => d3.ascending(a.year, b.year));

        // Combine videos and segments by video_id
        this.videoMap = new Map(this.cleanedUpVideos.map(d => [d.video_id, d]));
        this.videoSegments = this.segments.map(segment => {
            const video = this.videoMap.get(segment.video_id) || {};
            return { ...segment, ...video };
        });
        
        //Calculate and add segment duration
        this.videoSegments = this.videoSegments.map(segment => ({
            ...segment,
            duration: segment.end_time - segment.start_time
        }));

        //Add Segment Type number
        this.videoSegments = this.videoSegments.map(segment => ({
            ...segment,
            segment_type_number: GetSegmentTypeNumber(segment.tiers, segment.annotations_label)
        }));
        /*
        // Clean the tier and annotation_lables fields by removing surrounding quotes or unwanted characters
        this.videoSegments = this.videoSegments.map(d => ({
            ...d,
            tiers: d.tiers
                .replace(/^["��]+|["��]+$/g, '') // Remove leading/trailing quotes
                .trim(),
            annotations_label: d.annotations_label
                .replace(/^["��]+|["��]+$/g, '') // Remove leading/trailing quotes
                .trim(),
        }));*/

        /*setPreference(key, value) {
            this.preferences[key] = value;
        }
    
        getPreference(key) {
            return this.preferences[key];
        }*/
    }
    GetVideoSegments(){
        return this.videoSegments;
    }
}

// Function to clean up the array of objects
 export function cleanUpData(dataArray) {
    return dataArray.map(obj => ({
        video_id: obj.video_id,
        title: obj.title,
        production_country: obj.production_country,
        archive: obj.archive,
        organizations: splitToArray(obj.organizations),
        organizations_location: obj.organizations_location,
        genres: splitToArray(obj.genres).map(g => g.replace(/"/g, "")), // Remove quotes from genres
        agents: splitToArray(obj.agents),
        year: getYear(obj) // Add year based on date_of_production or date_of_release
    }))
    .filter(item => item.year !== 0); // Remove items with year 0, i.e. which dont have a year;
}

// Function to split agents and organizations if they are strings
export function splitToArray(value) {
    return typeof value === "string" ? value.split(",").map(s => s.trim()) : value;
}

//function to slit and line break strings e.g. Organization names for better visualization
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


//gets the year from a video object
//prefers date of production, if that exists, then date of release and returns 0, if neither is provided
export function getYear(obj) {
    if (obj.date_of_production) {
        return new Date(obj.date_of_production).getFullYear(); // Get year from date_of_production
    } else if (obj.date_of_release) {
        return new Date(obj.date_of_release).getFullYear(); // Get year from date_of_release
    } else {
        return 0; // Return 0 if neither date exists
    }
}

//generates Organizations array for bubble chart
export function generateOrganizationsData(filteredVideos) {
    // Create a map to count organizations and their production_country
    const organizationMap = new Map();

    filteredVideos.forEach(video => {
        const productionCountry = parseInt(video.production_country, 10); // Parse production country as an integer

        video.organizations.forEach(org => {
            const organization = org.replace(/"/g, "").trim(); // Remove quotes and trim whitespace

            // If the organization is already in the map, update its count
            if (organizationMap.has(organization)) {
                const entry = organizationMap.get(organization);
                entry.count += 1;
                entry.production_country = productionCountry; // Update production_country (in case it varies)
            } else {
                // Otherwise, add a new entry
                organizationMap.set(organization, {
                    organization: organization,
                    count: 1,
                    production_country: productionCountry
                });
            }
        });
    });

    // Convert the map values to an array
    return Array.from(organizationMap.values());
}
// Define the segment type hierarchy as an object
export const hierarchy = {
    "Drawn Animation": {
        "1.1.1.1": "Limited Cel",
        "1.1.1.2": "Full Cel",
        "1.1.1.3": "Retracing",
        "1.1.1.4": "Slash and Tear",
        "1.1.1.5": "Uncertain"
    },
    "Modified Base": {
        "1.1.2.1": "Painted/Drawn on Glass/Cel",
        "1.1.2.2": "Painted/Drawn on Paper",
        "1.1.2.3": "Sand",
        "1.1.2.4": "Uncertain"
    },
    "Direct/Cameraless": {
        "1.1.3.1": "Drawn",
        "1.1.3.2": "Scratched",
        "1.1.3.3": "Glued/Taped",
        "1.1.3.4": "Uncertain"
    },
    "Computer Animation": {
        "1.1.4.1": "2D",
        "1.1.4.2": "3D",
        "1.1.4.3": "Uncertain"
    },
    "Miscellaneous Animation": {
        "1.1.5.1": "Pinscreen",
        "1.1.5.2": "Strata-Cut",
        "1.1.5.3": "Uncertain",
        "1.1.5.4": "without attributed value"
    },
    "Cutout": {
        "1.1.6.1": "Cutout",
        "1.1.6.2": "Silhouette",
        "1.1.6.3": "Uncertain"
    },
    "Stop-Motion": {
        "1.1.7.1": "Objects",
        "1.1.7.2": "Puppets",
        "1.1.7.3": "Clay",
        "1.1.7.4": "Pixilation",
        "1.1.7.5": "Uncertain"
    },
    "Time Manipulation": {
        "1.1.8.1": "Timelapse",
        "1.1.8.2": "Slow Motion",
        "1.1.8.3": "Reverse Playback",
        "1.1.8.4": "Bullet Time",
        "1.1.8.5": "Uncertain"
    },
    "Animation": {
        "1.1.1": "Drawn Animation",
        "1.1.2": "Modified Base",
        "1.1.3": "Direct/Cameraless",
        "1.1.4": "Computer Animation",
        "1.1.5": "Miscellaneous Animation",
        "1.1.6": "Cutout",
        "1.1.7": "Stop-Motion",
        "1.1.8": "Time Manipulation"
    },
    "Still Image": {
        "1.4.1": "Photographic",
        "1.4.2": "Graphic",
        "1.4.3": "Colour Matte",
        "1.4.4": "Hybrid",
        "1.4.5": "Uncertain"
    },
    "Image Type": {
        "1.1": "Animation",
        "1.2": "Hybrid Image",
        "1.3": "Live-Action",
        "1.4": "Still Image",
        "1.5": "Irrelevant",
        "1.6": "Uncertain"
    },
    
    "Transition": {
        "3.1": "Fade In",
        "3.2": "Dissolve",
        "3.3": "Stop Trick",
        "3.4": "Fade Out",
        "3.5": "Animated Transition"
    },
    
    "Miscellaneous Attribut": {
        "2.1": "Rotoscoped",
        "2.2": "scientific/technical image",
        "2.3": "dissolve animation"
    },
    "Root": {
        "1": "Image Type",
        "2": "Miscellaneous Attribut",
        "3": "Transition"
    }
};

//Get direct children types of certain parentId
export function getChildTypes(leafFirstArray, parentId) {
    const result = new Map();
    for (const entry of leafFirstArray) {
        const { id, name, parent } = entry;
        const parentIdFromCurrent = id.slice(0, -2);

        if (parentIdFromCurrent === parentId) {
                result.set(id, name);
        }
    }
    return result;
}

//returns the hierarchy as an array with the leafes first, so it can be used to create nodes 
export function createLeafFirstArray(hierarchy) {
    const result = [];

    function traverse(obj, parent = null) {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                // Leaf node
                result.push({ id: key, name: value, parent });
            } else {
                // Recursive traversal
                traverse(value, key);
                //result.push({ id: key, name: key, parent }); // Add parent after children
            }
        }
    }

    traverse(hierarchy);
    return result;
}

// Search function to find the number by tier and annotation label
export function GetSegmentTypeNumber(tier, annotation) {

    // Search function to find the number by tier and annotation label
    function findInHierarchy(tier, annotation) {
        const tierHierarchy = hierarchy[tier];
        if (!tierHierarchy) return null; // If the tier does not exist, return null

        for (const [number, label] of Object.entries(tierHierarchy)) {
            if (label === annotation) {
                return number; // Return the number if annotation label matches
            }
        }

        // If annotation is "Uncertain", return the tier's number
        for (const [number, label] of Object.entries(tierHierarchy)) {
            if (annotation === "Uncertain") {
                return number; // Return the first matching "Uncertain"
            }
        }

        return null; // Return null if nothing matches
    }

    // Call the search function to find the mapping
    const result = findInHierarchy(tier, annotation);
    return result || `No mapping found for tier: ${tier}, annotation: ${annotation}`;
}


// Function to retrieve the segment text by its number
export function GetSegmentTypeText(number) {
    if (!number) return "Invalid input"; // Handle empty or undefined input

    // Recursive search function
    function searchHierarchy(hierarchyObj, targetNumber, tierName = "") {
        for (const [key, value] of Object.entries(hierarchyObj)) {
            if (key === targetNumber) {
                return `${tierName} - ${value}`.trim(); // Return concatenated tier name and value
            }
            if (typeof value === "object") {
                const result = searchHierarchy(value, targetNumber, value ? tierName || key : tierName);
                if (result) return result;
            }
        }
        return null; // Return null if not found
    }

    // Perform the search
    const result = searchHierarchy(hierarchy, number);

    return result || `No segment text found for number: ${number}`;
}








//Group videos by year and create the table structure
/*const table = d3.rollup(
    cleanedUpVideos,
    videos => {
        // Count the total videos for the year
        const count = videos.length;

        //Create an array of organizations with their video counts
        const organizationCounts = d3.rollup(
            videos.flatMap(d => d.organizations), // Flatten the list of organizations
            orgs => orgs.length,
            org => org
        );

        // Convert organizationCounts to the required array of objects format
        const organizations = Array.from(organizationCounts, ([organization, orgCount]) => ({
            organization,
            count: orgCount
        }));

        //Create an array of agents with their video counts
        const agentCounts = d3.rollup(
            videos.flatMap(d => d.agents), // Flatten the list of agents
            ags => ags.length,
            ag => ag
        );

        // Convert agentCounts to the required array of objects format
        const agents = Array.from(agentCounts, ([agent, agentCount]) => ({
            agent,
            count: agentCount
        }));

        return { year: videos[0].year, count, organizations, agents };
    },
    d => d.year
);

// Convert the Map to an array of objects for a table-like structure
return Array.from(table, ([year, { count, organizations, agents }]) => ({
    year,
    count,
    organizations,
    agents
}));

}*/

