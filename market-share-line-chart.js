var market_margin = {top: 50, right: 20, bottom: 30, left: 90},
    width = 600,
    height = 400;

var marketChart = d3.select("#area9")
    .append("svg")
        .attr("width", width + market_margin.left + market_margin.right)
        .attr("height", height + market_margin.top + market_margin.bottom)
    .append("g")
        .attr("transform", "translate(" + market_margin.left + "," + market_margin.top + ")");

let allMarketData = [];
let companies = ["JYP ENTERTAINMENT", "SM ENTERTAINMENT", "YG ENTERTAINMENT"];

d3.csv("market-values-cleaned.csv", function(d) {
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

        allMarketData.push({companyName: "JYP ENTERTAINMENT", date: newDate, marketPrice: data[i].jyp});
        allMarketData.push({companyName: "SM ENTERTAINMENT", date: newDate, marketPrice: data[i].sm});
        allMarketData.push({companyName: "YG ENTERTAINMENT", date: newDate, marketPrice: data[i].yg});
    }

    var marketEntries = d3.group(allMarketData, d => d.companyName);

    var companyColors = d3
        .scaleOrdinal(d3.schemeCategory10)
        .domain(companies);

    var ordinalLegend = d3.legendColor().scale(companyColors);

    marketChart.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (market_margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .text("Korean Entertainment Companies Market Value (2020)");
    
    var scaleX = d3.scaleTime()
        .domain(d3.extent(allMarketData, function(d) { 
            return d.date;
        }))
        .range([0, width]);
    
    marketChart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(scaleX));

    var scaleY = d3.scaleLinear()
        .domain([0, 1600000])
        .range([height, 0]);
    
    marketChart.append("g")
        .call(d3.axisLeft(scaleY));

    marketChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - market_margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Market Value in Millions of Won");
        
    marketChart.selectAll(".line")
        .data(marketEntries)
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
                        return scaleY(+d.marketPrice); 
                    }) (d[1])
            });
    
    marketChart.append("g")
                .attr("transform", "translate(20, 20)")
                .call(ordinalLegend);
});