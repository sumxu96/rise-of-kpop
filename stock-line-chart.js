var stock_margin = {top: 50, right: 20, bottom: 30, left: 90},
    width = 600,
    height = 400;

var stockChart = d3.select("#area8")
    .append("svg")
        .attr("width", width + stock_margin.left + stock_margin.right)
        .attr("height", height + stock_margin.top + stock_margin.bottom)
    .append("g")
        .attr("transform", "translate(" + stock_margin.left + "," + stock_margin.top + ")");

let allData = [];
let companyNames = ["JYP ENTERTAINMENT", "SM ENTERTAINMENT", "YG ENTERTAINMENT"];

d3.csv("stock-prices.csv", function(d) {
    return {
        date : d["Date"],
        jyp: +d["JYP ENTERTAINMENT"],
        sm: +d["SM ENTERTAINMENT"],
        yg: +d["YG ENTERTAINMENT"],
    };
}).then(function(data) {
    for(var i = 0; i < data.length; i++) {
        var year = data[i].date.substr(0,2);
        var month = data[i].date.substr(2,2) - 1;
        var day = data[i].date.substr(4,2);

        var newDate = new Date('20' + year, month, day);

        allData.push({companyName: "JYP ENTERTAINMENT", date: newDate, stockPrice: data[i].jyp * 1000});
        allData.push({companyName: "SM ENTERTAINMENT", date: newDate, stockPrice: data[i].sm * 1000});
        allData.push({companyName: "YG ENTERTAINMENT", date: newDate, stockPrice: data[i].yg * 1000});
    }

    var entries = d3.group(allData, d => d.companyName);

    var companyColors = d3
        .scaleOrdinal(d3.schemeCategory10)
        .domain(companyNames);

    var ordinalLegend = d3.legendColor().scale(companyColors);

    stockChart.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (stock_margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .text("Korean Entertainment Companies Share Price (2020)");
    
    var scaleX = d3.scaleTime()
        .domain(d3.extent(allData, function(d) { 
            return d.date;
        }))
        .range([0, width]);
    
    stockChart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(scaleX));

    var scaleY = d3.scaleLinear()
        .domain([0, 60000])
        .range([height, 0]);
    
    stockChart.append("g")
        .call(d3.axisLeft(scaleY));

    stockChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - stock_margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Stock Price in Won");
        
    stockChart.selectAll(".line")
        .data(entries)
        .enter()
        .append("path")
        .attr("fill", "none")
            .attr("stroke", function(d) {
                return companyColors(d[0]);
            })
            .attr("stroke-width", 2)
            .attr("d", function(d) {
                return d3.line()
                    .x(function(d) { 
                        return scaleX(d.date); 
                    })
                    .y(function(d) {
                        return scaleY(+d.stockPrice); 
                    }) (d[1])
            });
    
    stockChart.append("g")
                .attr("transform", "translate(20, 20)")
                .call(ordinalLegend);
});