var stock_margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 600,
    height = 400;

var stockChart = d3.select("area5")
    .append("svg")
        .attr("width", width + stock_margin.left + stock_margin.right)
        .attr("height", height + stock_margin.top + stock_margin.bottom)
    .append("g")
        .attr("transform", "translate(" + stock_margin.left + "," + stock_margin.top + ")");

let allData = [];
let jypData = [];
let smData = [];
let ygData = [];

d3.csv("stock-prices.csv", function(d) {
    return {
        date : d["Date"],
        jyp: +d["JYP ENTERTAINMENT"],
        sm: +d["SM ENTERTAINMENT"],
        yg: +d["YG ENTERTAINMENT"],
    };
}).then(function(data) {
    for(var i = 0; i < data.length; i++) {
        allData.push({date : data[i].date, jyp : data[i].jyp, sm : data[i].sm, yg : data[i].yg});
        jypData.push([data[i].date, data[i].jyp]);
        smData.push([data[i].date, data[i].sm]);
        ygData.push([data[i].date, data[i].yg]);
    }  

    var x = d3.scaleTime()
        .domain(d3.extent(allData, function(d) { 
            return d3.timeParse("%y%m%d")(d.date);
        }))
        .range([0, width]);
    
    console.log(x.ticks(10));
    
    stockChart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, 40])
        .range([height, 0]);
    
    stockChart.append("g")
        .call(d3.axisLeft(y));
        
    stockChart.append("path")
        .datum(jypData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(function(d) { return x(d3.timeParse("%y%m%d")(d[0])) })
            .y(function(d) { return y(d[1]) })
        );
});