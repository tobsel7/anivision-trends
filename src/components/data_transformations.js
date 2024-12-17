// Function to clean up the array of objects
 export function cleanUpData(dataArray) {
    return dataArray.map(obj => ({
        video_id: obj.video_id,
        title: obj.title,
        production_country: obj.production_country,
        archive: obj.archive,
        organizations: splitToArray(obj.organizations),
        organizations_location: obj.organizations_location,
        genres: obj.genres,
        agents: splitToArray(obj.agents),
        year: getYear(obj) // Add year based on date_of_production or date_of_release
    }))
    .filter(item => item.year !== 0); // Remove items with year 0, i.e. which dont have a year;
}

// Function to split agents and organizations if they are strings
export function splitToArray(value) {
    return typeof value === "string" ? value.split(",").map(s => s.trim()) : value;
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


//create tables











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

