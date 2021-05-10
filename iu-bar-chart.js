var iu_margin = {top: 30, right: 30, bottom: 65, left: 100},
    width = 600,
    height = 400;

var barWidth = width/5;
var padding = 7;

var iuChart = d3.select("#area4")
    .append("svg")
        .attr("width", width + iu_margin.left + iu_margin.right)
        .attr("height", height + iu_margin.top + iu_margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + iu_margin.left + "," + iu_margin.top + ")");
          

let iu_names = [];
let iu_videoViews = [];

d3.csv('iu-mv.csv', function(d) {
    return {
        song : d["song name"],
        views : +d["views"],
    };
}).then(function(data) {
    for(var i = 0; i < data.length; i++) {
        iu_names.push(data[i].song);
        iu_videoViews.push([data[i].song, data[i].views]);
    }

    var x = d3.scaleLinear()
        .domain([0, 210000000])
        .range([0, width]);
    
    iuChart.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (bb_margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")  
        .text("Top 5 IU Music Videos by Views on YouTube");
    
    iuChart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(iu_names)
        .padding(.5);

    iuChart.append("g")
        .call(d3.axisLeft(y));

    iuChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - iu_margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Song Name");

    iuChart.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Number of Views");
    
    iuChart.selectAll("rect")
        .data(iu_videoViews)
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
        .attr("fill", "#c6acd2");
})