var bp_margin = {top: 30, right: 30, bottom: 65, left: 70},
    bp_width = 600,
    bp_height = 400;

var barWidth = bp_width/4;
var padding = 7;

var bpChart = d3.select("#area7")
    .append("svg")
        .attr("width", bp_width + bp_margin.left + bp_margin.right)
        .attr("height", bp_height + bp_margin.top + bp_margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + bp_margin.left + "," + bp_margin.top + ")");
          

let bp_names = [];
let bp_followers = [];

d3.csv('blackpink.csv', function(d) {
    return {
        name : d["name"],
        followers : +d["followers"],
    };
}).then(function(data) {
    for(var i = 0; i < data.length; i++) {
        bp_names.push(data[i].name);
        bp_followers.push([data[i].name, data[i].followers]);
    }

    var x = d3.scaleLinear()
        .domain([0, 52000000])
        .range([0, bp_width]);
    
    bpChart.append("g")
        .attr("transform", "translate(0," + bp_height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

    var y = d3.scaleBand()
        .range([ 0, bp_height ])
        .domain(bp_names)
        .padding(.5);

    bpChart.append("g")
        .call(d3.axisLeft(y));

    bpChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - bp_margin.left)
        .attr("x", 0 - (bp_height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Member Name");

    bpChart.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", bp_width)
        .attr("y", bp_height - 6)
        .text("Number of Followers");
    
    bpChart.selectAll("rect")
        .data(bp_followers)
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
        .attr("fill", "#ebb0be");
})