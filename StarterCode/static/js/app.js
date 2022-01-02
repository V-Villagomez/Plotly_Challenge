// Function that would create a dynamic dropdown menu
function optionChanged(selectedID){
    // Verify if object is selected in dropdown
    console.log(selectedID);
}

// Read sample json file for the data
d3.json("samples.json").then ((data) => {
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



})

// Initialize function
//init();