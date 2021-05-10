var timeline_data = [
    {time: new Date(1995, 0), info: "SM Entertainment forms"},
    {time: new Date(1996, 0), info: "Boy band H.O.T debuts with popular single Candy"},
    {time: new Date(1996, 0), info: "YG Entertainment forms"},
    {time: new Date(1997, 0), info: "Boy band Big Bang, formed by YG Entertainment, debuts"},
    {time: new Date(2008, 0), info: "Singer and actress IU debuts with Lost and Found album"},
    {time: new Date(2012, 0), info: "PSY's Gangnam Style debuts and becomes first YouTube video ever to reach 1 billion views"},
    {time: new Date(2012, 0), info: "Big Bang's Alive becomes first Korean album to chart on US Billboard 200"},
    {time: new Date(2013, 0), info: "Boy band BTS debuts"},
    {time: new Date(2016, 0), info: "Girl group BLACKPINK, formed by YG Entertainment, debuts"},
    {time: new Date(2017, 0), info: "BTS becomes first K-pop group to win a Billboard Music Award (BBMA) as Top Social Artist"},
    {time: new Date(2020, 0), info: "BTS becomes first non-English artist to be named International Federation of the Phonographic Industry (IFPI) #1 Global Recording Artist of the Year"},
    {time: new Date(2020, 0), info: "BLACKPINK becomes highest-charting female Korean Act on the Billboard Hot 100 with single Ice Cream"},
    {time: new Date(2020, 0), info: "BLACKPINK becomes first music group and Korean act to have three music videos each have over one billion views on YouTube"},
    {time: new Date(2021, 0), info: "IU achieves her 20th Perfect All Kill (PAK - #1 in all real-time, daily, and iChart weekly charts) with single LILAC, 4 times more than the second highest number of PAKs (Big Bang with 5)"},
];

var chart = new d3KitTimeline('#kpoptimeline', {
    direction: 'right',
    initialWidth: 1500,
    initialHeight: 600,
    labelBgColor: "#7394AF",
    textFn: function(d) { return d.time.getFullYear() + ' - ' + d.info; },
    textStyle: {
        'font-size': 13,
    },
  });
  chart.data(timeline_data);