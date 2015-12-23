
/***************
*  COST CHART *
***************/
function costChartTrigger(){
  nv.addGraph(function() {
    console.log("starting addGraph shenannigans");
    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label; })
      .y(function(d) { return d.value; })
      .staggerLabels(true)
      .showValues(true);

    var c = costChartData();
    console.log(c);

    d3.select('#costChart svg')
      .datum(c)
      .transition().duration(500)
      .call(chart)
      ;

    nv.utils.windowResize(chart.update);
    console.log("ending addGraph shenannigans");
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
    console.log("starting addGraph shenannigans");
    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label; })
      .y(function(d) { return d.value; })
      .staggerLabels(true)
      .showValues(true);

    var m = mpgChartData();
    console.log(m);

    d3.select('#mpgChart svg')
      .datum(m)
      .transition().duration(500)
      .call(chart)
      ;

    nv.utils.windowResize(chart.update);
    console.log("ending addGraph shenannigans");
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
