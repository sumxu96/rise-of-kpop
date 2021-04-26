//reference: https://www.d3-graph-gallery.com/graph/treemap_basic.html
var bts_margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 800,
    height = 600;

var bts_map = d3.select("#area6")
    .append("svg")
        .attr("width", width + bts_margin.left + bts_margin.right)
        .attr("height", height + bts_margin.top + bts_margin.bottom)
    .append("g")
        .attr("transform",
                "translate(" + bts_margin.left + "," + bts_margin.top + ")");

let hashtags = [];

d3.csv('hashtags.csv', function(d) {
    return {
        hashtag : d["hashtag"],
        parent : d["parent"],
        alltweets: d["alltweets"]
    };
}).then(function(data) {
    for(var i = 0; i < data.length; i++) {
        hashtags.push(data[i].hashtag);
    }
    var root = d3.stratify()
        .id(function(d) { return d.hashtag; })  
        .parentId(function(d) { return d.parent; })
        (data);
    
    root.sum(function(d) { return +d.alltweets; })
    
    d3.treemap()
        .size([width, height])
        .padding(4)
        (root);

    var color = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(hashtags);
    
    bts_map.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("fill", function (d) { return color(d.id) });
    
    bts_map.selectAll("hashtag_text")
        .data(root.leaves())
        .enter()
        .append("text")
            .attr("x", function (d) { return d.x0 + 10; })
            .attr("y", function (d) { return d.y0 + 20; })
            .text(function (d) { return d.data.hashtag })
            .attr("font-size", "18px")
            .attr("fill", "white");
    
    bts_map.selectAll("number_text")
        .data(root.leaves())
        .enter()
        .append("text")
            .attr("x", function (d) { return d.x0 + 10; })
            .attr("y", function (d) { return d.y0 + 40; })
            .text(function (d) { return d.data.alltweets })
            .attr("font-size", "15px")
            .attr("fill", "white");
});
