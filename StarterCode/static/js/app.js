// Function that would create a dynamic dropdown menu
function optionChanged(selectedID){
    //Verify if object is selected in dropdown
    console.log(selectedID);

    // Read samples json file for the data
    d3.json("samples.json").then((data) => {
        console.log(data);

    // Clear dropdown as necessary
    d3.select("#selDataset").html("");

    // Select metadata array and for each item append item id and add ids to the dropdown
    data.metadata.forEach(item => {
        d3.select("#selDataset").append('option').attr('value', item.id).text(item.id);
        });
        
    d3.select("#selDataset").node().value = selectedID;
    
    // Filter metadata for selected id from dropdown
    const metadataID = data.metadata.filter(item => (item.id == selectedID));
    //Verify that metadata loaded
    console.log(metadataID);
    
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(metadataID[0]).forEach(item => {
        //console.log(item);
        panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
        });
    console.log(panelDisplay);

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
var otuLabels = sampleID[0].otu_labels;
otuLabels = otuLabels.reverse();

console.log(sampleValues);
console.log(otuID);
console.log(otuLabels);

// Define Y axis 
const yaxis = otuID.map(item => 'OTU' + " " + item);

// Define the layout and trace objects
    const trace = [
        {
        y: yaxis,
        x: sampleValues,
        type: 'bar',
        orientation: 'h',
        text: otuLabels,
    },
    ]
    layout = {
        title: 'Top 10 Operational Taxonomic Units (OTUs)',
        yaxis: {title: 'OTU ID'},
        xaxis: {title: 'Samples Collected'}
    };
    // Plot chart using ploty
    Plotly.newPlot('bar', trace, layout, {responsive: true});

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
const trace1 = [
    {
    x: otuID1,
    y: sampleValues1,
    mode: 'markers',
    marker: {
        color: otuID1,
        size: sampleValues1
    }}
]
layout1 = {
    title: '<b>OTU Samples</b>',
    yaxis: {title: 'Samples Collected'},
    xaxis: {title: 'OTU ID'},
    showlegend: false,
    height: 500,
    width: 1200
    };
// Plot chart using plotly
Plotly.newPlot('bubble', trace1, layout1);

//BONUS -- Gauge Chart
// Gauge Chart to plot weekly washing frequency 
const guageDisplay = d3.select("#gauge");
guageDisplay.html(""); 
const washFreq = metadataID[0].wfreq;
 
const guageData = [
    {
    domain: {x: [0, 1], y: [0, 1]},
    value: washFreq,
    title: { text: "<b>Belly Button Weekly Washing Frequency </b><br> (Scrubs Per Week)" },
    type: "indicator",
    mode: "gauge+number",     
     gauge: {
      axis: {range: [0,9]},
      bar: {color: "#7B7D7D"},
      steps: [
        {range: [0, 1], color: '#D6EAF8'},
        {range: [1, 2], color: '#AED6F1'},
        {range: [2, 3], color: '#85C1E9'},
        {range: [3, 4], color: '#5DADE2'},
        {range: [4, 5], color: '#3498DB'},
        {range: [5, 6], color: '#2E86C1'},
        {range: [6, 7], color: '#2874A6'},
        {range: [7, 8], color: '#21618C'},
        {range: [8, 9], color: '#1B4F72'}
       ],
      threshold: {
        value: washFreq
        }}}
    ]; 
const gaugeLayout = {width: 500, height: 400, margin: {t: 0, b: 0},
};
// Plot using Plotly
Plotly.newPlot('gauge', guageData, gaugeLayout);
});
}
// //Function that would create a dynamic dropdown menu
// function optionChanged(selectedID){
//     // Verify if object is selected in dropdown
//     console.log(selectedID);

// Initial test starts at ID 940
optionChanged(940);
 
// Event on change takes the value and calls the function during dropdown selection
d3.select("#selDataset").on('change',() => {
optionChanged(d3.event.target.value);

});

// // Initialize function
//init();