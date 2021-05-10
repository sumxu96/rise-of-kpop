var hot_margin = {top: 40, right: 30, bottom: 65, left: 180},
    width = 600,
    height = 400;

var barWidth = width/5;
var padding = 7;

var hotChart = d3.select("#area2")
    .append("svg")
        .attr("width", width + hot_margin.left + hot_margin.right)
        .attr("height", height + hot_margin.top + hot_margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + hot_margin.left + "," + hot_margin.top + ")");
          

let albums = [];
let albumSales = [];

d3.csv('HOT-albums.csv', function(d) {
    return {
        album : d["album"],
        sales : +d["sales"],
    };
}).then(function(data) {
    for(var i = 0; i < data.length; i++) {
        albums.push(data[i].album);
        albumSales.push([data[i].album, data[i].sales]);
    }

    hotChart.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (market_margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .text("H.O.T. Album Sales");
    
    var x = d3.scaleLinear()
        .domain([0, 1600000])
        .range([0, width]);
    
    hotChart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(albums)
        .padding(.5);

    hotChart.append("g")
        .call(d3.axisLeft(y));

    hotChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - hot_margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Album Name");

    hotChart.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Number of Sales");
    
    hotChart.selectAll("rect")
        .data(albumSales)
        .enter()
        .append("rect")
        .attr("x", x(0))
        .attr("y", function(d) { 
            return y(d[0]); 
        })
        .attr("width", function(d) { 
            return x(d[1]); 
        })
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2");
})