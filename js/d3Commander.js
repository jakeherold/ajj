

function chartTrigger(){
  nv.addGraph(function() {
    console.log("starting addGraph shenannigans");
    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })
      .y(function(d) { return d.value })
      .staggerLabels(true)
      // .tooltips(false)
      .showValues(true)

    d3.select('.resultsChart')
      .datum(chartData())
      .transition().duration(500)
      .call(chart)
      ;

    nv.utils.windowResize(chart.update);
    console.log("ending addGraph shenannigans");
    return chart;
  });

}


function chartData () {
  console.log("starting chartData Function")
  return [
          {
            key: "Gas Data",
            values: [
              {
                "label" : "Gallons Needed" ,
                "value" : 10 //user.gasQuantity
              } ,
              {
                "label" : "Trip Cost" ,
                "value" : 11 //user.costReg
              } ,
              {
                "label" : "MPG" ,
                "value" : 12 //user.mpgAvg
              }
            ]
          }
        ]
}
