// Function that would create a dynamic dropdown menu
function optionChanged(selectedID){
    // Verify if object is selected in dropdown
    console.log(selectedID);}

    // Read sample json file for the data
    d3.json("samples.json").then((data) => {
        console.log(data);

    // Clear dropdown as necessary
    d3.select("#selDataset").html("");

    // Select metadata array and for each item append item id and add ids to the dropdown
    data.metadata.forEach(item => {
        d3.select ("#selDataset")
          .append('option')
          .attr('value', item.id)
          .text(item.id);
        });
    selectedID = d3.select("#selDataset").node().value;

    // Filter metadata for selected id from dropdown
    const metadataID = data.metadata.filter(item => (item.id == selectedID));
        //Verify that metadata loaded
        console.log(metadataID);
    const panelDisplay = d3.select("sample-metadata");
    panelDisplay.html("");
    Object.entries(metadataID[0]).forEach(item => {
        panelDisplay.append("p").text('${item[0]}: ${item[1]}')
    });

    // Bar chart
    // Filter sample array data for the selected ID
    const sampleID = data.samples.filter(item => parseInt(item.id) == selectedID);
})
     
//})
//}

// Initialize function
//init();