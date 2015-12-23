
/***************
*  COST CHART *
***************/
function costChartTrigger(){
  var costHtmlStorage;
  nv.addGraph(function() {
    console.log("starting cost graph ");
    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label; })
      .y(function(d) { return d.value; })
      .staggerLabels(true)
      .showValues(true);

    var c = costChartData();
    console.log(c);

    costHtmlStorage = d3.select('#costChart svg')
      .datum(c)
      //.transition().duration(500)
      .call(chart)
      ;
    localStorage.setItem('costChartData', costHtmlStorage[0][0].outerHTML);
    nv.utils.windowResize(chart.update);
    // console.log("ending cost graph ");
    // window.d3chartCost = chart
    // console.log(chart);
    return chart;
  });

}

function costChartData () {
  console.log("starting costChartData Function")
  return [
          {
            key: "Total Trip Cost Range",
            values: [
              {
                "label" : "Low Gas Cost" ,
                "value" : user.costReg
              } ,
              {
                "label" : "Mid Gas Cost" ,
                "value" : user.costMid
              } ,
              {
                "label" : "High Gas Cost" ,
                "value" : user.costPrem
              }
            ]
          }
        ]
}

/***************
*  MPG   CHART *
***************/
function mpgChartTrigger(){
  nv.addGraph(function() {
    console.log("starting mpg graph ");
    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label; })
      .y(function(d) { return d.value; })
      .staggerLabels(true)
      .showValues(true);

    var m = mpgChartData();
    console.log(m);

    mpgHtmlStorage =d3.select('#mpgChart svg')
      .datum(m)
      //// .transition().duration(500)
      .call(chart)
      ;
    localStorage.setItem('mpgChartData', mpgHtmlStorage[0][0].outerHTML);
    nv.utils.windowResize(chart.update);
    // $chartTwo.resolve();
    console.log("ending mpg graph shenannigans");
    window.d3chartMPG = chart;
    return chart;
  });

}
function mpgChartData () {
  console.log("starting mpgCost Function")
  return [
          {
            key: "Gallons of Gas Used",
            values: [
              {
                "label" : "Min" ,
                "value" : user.gasQuantityMin
              } ,
              {
                "label" : "Avg" ,
                "value" : user.gasQuantityAvg
              } ,
              {
                "label" : "High" ,
                "value" : user.gasQuantityMax
              }
            ]
          }
        ]
}
