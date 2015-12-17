
function printVehicleData (data){
var vehicleObject = data;
$.get('template.html', function(templateData) {

      $.each(articleBeingProcessed, function(key, value) {
        $templateAnchor = $('#templateAnchor');
        var theTemplate = Handlebars.compile(templateData);
        var userVehicleData = theTemplate(value);
        // console.log(userVehicleData);
        $templateAnchor.append(userVehicleData);
      });

  })

}
