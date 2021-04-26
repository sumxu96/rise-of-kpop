var bb_margin = {top: 30, right: 30, bottom: 65, left: 100},
    width = 600,
    height = 400;

var barWidth = width/5;
var padding = 7;

var bbChart = d3.select("#area3")
    .append("svg")
        .attr("width", width + bb_margin.left + bb_margin.right)
        .attr("height", height + bb_margin.top + bb_margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + bb_margin.left + "," + bb_margin.top + ")");
          

let bb_names = [];
let bb_videoViews = [];

d3.csv('bigbang-mv.csv', function(d) {
    return {
        song : d["song name"],
        views : +d["views"],
    };
}).then(function(data) {
    for(var i = 0; i < data.length; i++) {
        bb_names.push(data[i].song);
        bb_videoViews.push([data[i].song, data[i].views]);
    }

    var x = d3.scaleLinear()
        .domain([0, 530000000])
        .range([0, width]);
    
    bbChart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(bb_names)
        .padding(.5);

    bbChart.append("g")
        .call(d3.axisLeft(y));

    bbChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - bb_margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Song Name");

    bbChart.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Number of Views");
    
    bbChart.selectAll("rect")
        .data(bb_videoViews)
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
        .attr("fill", "#4c95ff");
})