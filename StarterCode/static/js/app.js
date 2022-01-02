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

    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // Filter sample array data for the selected ID
    const sampleID = data.samples.filter(item => parseInt(item.id) == selectedID);

    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext for the chart.
    // Slice top 10 samples
    var sampleValues = sampleID[0].sample_values.slice(0,10);
    sampleValues = sampleValues.reverse();
    var otuID = sampleID[0].otu_ids.slice(0,10);
    otuID = otuID.reverse();
    var otuLabels = sampleID[0].otu_labels
    otuLabels = otuLabels.reverse();

    // Define Y axis 
    const yaxis = otuID.map(item => 'OTU' + " " + item);

    // Define the layout and trace objects
    const trace = {
        y: yaxis,
        x: sampleValues,
        type: 'bar',
        orientation: 'h',
        text: otuLabels,
    },
    layout = {
        title: 'Top 10 Operational Taxonomic Units (OTUs)',
        yaxis: {title: 'OTU ID'},
        xaxis: {title: 'Samples Collected'}
    };
    // Plot chart using ploty
    Plotly.newPlot('bar', [trace], layout, {responsive: true});

    // Create a bubble chart that displays each sample
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.
    // Remove sample values and otuid from individual
    var sampleValues1 = sampleID[0].sample_values;
    var otuID1 = sampleID[0].otu_ids;

    // Define the layout and trace objects
    const trace1 = {
        x: otuID1,
        y: sampleValues1,
        mode: 'markers',
        marker: {
            color: otuID1,
            size: sampleValues1
        }
    },
    layout1 = {
        title: '<b>OTU Samples</b>',
        yaxis: {title: 'Samples Collected'},
        xaxis: {title: 'OTU ID'},
        showlegend: false,
        height: 500,
        width: 1200
        };
    // Plot chart using plotly
    Plotly.newPlot('bubble', [trace1], layout1);


});
     
//})
//}

// Initialize function
//init();