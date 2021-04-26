var market_margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 600,
    height = 400;

var marketChart = d3.select("body")
    .append("svg")
        .attr("width", width + market_margin.left + market_margin.right)
        .attr("height", height + market_margin.top + market_margin.bottom)
    .append("g")
        .attr("transform", "translate(" + market_margin.left + "," + market_margin.top + ")");

let finalData = [];

d3.csv("market-values.csv", function(d) {
    return {
        country : d["Country"],
        year : d["Year"],
        coEmissions : +d["Emissions.Type.CO2"],
        ratioPerCap: +d["Ratio.Per Capita"]
    };
}).then(function(data) {
    for(var i = 0; i < data.length; i++) {
        if (data[i].country === "Canada" || data[i].country === "France" ||
        data[i].country === "Germany" || data[i].country === "United Kingdom" || data[i].country === "Japan" ||
        data[i].country === "Italy") {
            finalData.push({country : data[i].country, year : data[i].year, emissions : data[i].coEmissions, ratio : data[i].ratioPerCap})
        }
    }  
    var x = d3.scaleTime()
        .domain(d3.extent(finalData, function(d) { 
            return d3.timeParse("%Y")(d.year);
        }))
        .range([0, width]);
    
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, 1.5])
        .range([height, 0]);
    
    svg.append("g")
        .call(d3.axisLeft(y));
    
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Emissions per capita (in kilo-tons)");
    
    var z = d3.scaleLinear()
        .domain([0, 80000])
        .range([ 4, 25 ]);
    
    var keys = ["Canada", "France", "Germany", "United Kingdom", "Japan", "Italy"];
    
    var myColor = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeSet2);
    
    svg.append("g")
        .selectAll("dot")
        .data(finalData)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x(d3.timeParse("%Y")(d.year)); } )
          .attr("cy", function (d) { return y(d.ratio); } )
          .attr("r", function (d) { return z(d.emissions); } )
          .style("fill", function (d) { return myColor(d.country); } )
          .style("opacity", "0.7")
          .attr("stroke", "white")
          .style("stroke-width", "1px")
    
    
    svg.append("text")
        .attr("x", 296)
        .attr("y", 30)
        .text("Countries (bubble size denotes total carbon emissions)")
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");

    svg.selectAll("mydots")
        .data(keys)
        .enter()
        .append("circle")
        .attr("cx", 300)
        .attr("cy", function(d,i){ return 50 + i * 25})
        .attr("r", 4)
        .style("fill", function(d){ return myColor(d)})
    
    svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 320)
        .attr("y", function(d,i){ return 50 + i * 25})
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
});