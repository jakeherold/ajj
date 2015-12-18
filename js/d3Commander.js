

function chartTrigger(){
  nv.addGraph(function() {
    console.log("starting addGraph shenannigans");
    var chart = nv.models.discreteBarChart()
      .x(function(d) { return d.label; })
      .y(function(d) { return d.value; })
      .staggerLabels(true)
      .showValues(true);

    var c = chartData();
    console.log(c);

    d3.select('#chart svg')
      .datum(c)
      .transition().duration(500)
      .call(chart)
      ;

    nv.utils.windowResize(chart.update);
    console.log("ending addGraph shenannigans");
    return chart;
  });

}

// .tooltips(false)
//
function chartData () {
  console.log("starting chartData Function")
  return [
          {
            key: "Gas Data",
            values: [
              {
                "label" : "Gallons Needed" ,
                "value" : user.gasQuantity
              } ,
              {
                "label" : "Trip Cost" ,
                "value" : user.costReg
              } ,
              {
                "label" : "MPG" ,
                "value" : user.mpgAvg
              }
            ]
          }
        ]
}
