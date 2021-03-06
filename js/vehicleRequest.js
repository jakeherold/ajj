var metaMpgData = {};
var vehicleRequest = vehicleRequest||{};

$(function(){
      var localInput = JSON.parse(localStorage.getItem('userInput'));
      if(localInput){
        $('.carSelection').html(localInput.carSelection);
        $('.carYear').val(localInput.carYear);
        $('.carMake').val(localInput.carMake);
        $('.carModel').val(localInput.carModel);
        $('.carVersion').val(localInput.carVersion);
        $('#WPOutput').html(localInput.waypts);
        $('#start').val(localInput.start);
        $('#end').val(localInput.end);
        $('#WPOutput option').each(function(index, elem){
          var waypt = {
            location: $(elem).val(),
            stopover: true
        }
        waypts.push(waypt);
    });
        console.log(waypts);
        setEventsCarInfo();
    }
    else{
        console.log('no local input stored');
        setEventsCarInfo();
    }
});//end of ready function
function setEventsCarInfo(){
    var $carYear = $('.carYear');
    var $carMake = $('.carMake');
    var $carModel = $('.carModel');
    var $carVersion = $('.carVersion');
    $carYear.on('change', function(e) {
        e.preventDefault;
        console.log('carYear event fires');
        var userSelectedYear = ""
        $(".carYear option:selected").each(function() {
            userSelectedYear += $(this).text();
        });
        var ajaxRequest = $.ajax({
            type: "GET",
            url: 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=' + userSelectedYear,
            dataType: "xml",
        });
        ajaxRequest.done(function(xml) {
            $carMake.html('');
            $carMake.append('<option>Make</option>');
            $(xml).find("value").each(function() {
                $carMake.append('<option>' + $(this).text() + '</option>');
            })
        });
    });
    //MODELS
    $carMake.change(function() {
        console.log('carMake event fires');
        var userSelectedMake = "";
        $(".carMake option:selected").each(function() {
            userSelectedMake += $(this).text();
        });

        ajaxRequest = $.ajax({
            type: "GET",
            url: 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=2012&make=' + userSelectedMake,
            dataType: "xml",
        });
        ajaxRequest.done(function(xml) {
            $carModel.html('');
            $carModel.append('<option>Model</option>');
            $(xml).find("value").each(function() {
                $carModel.append('<option>' + $(this).text() + '</option>');
            })
        });
    });

    $carModel.on('change', function() {
        vehicleRequest.userCar();
    });
}

vehicleRequest.selection = function() {
    var $carYear = $('.carYear');
    var $carMake = $('.carMake');
    var $carModel = $('.carModel');
    var $carVersion = $('.carVersion');
    var $avgMpg = $('.avgMpg');
    var $minMpg = $('.minMpg');
    var $maxMpg = $('.maxMpg');
    var $errorVehicle = $('.errorVehicle');

    var date = new Date();
    var currentYear = date.getFullYear();
    for (ii = 1984; ii <= currentYear; ii++) {
        $carYear.append('<option>' + ii + '</option>')
    };

vehicleRequest.userCar = function() {
    console.log('it runs');
    userYear = $(".carYear option:selected").text();
    userMake = $(".carMake option:selected").text();
    userModel = $(".carModel option:selected").text();
    ajaxRequest = $.ajax({
        type: "GET",
        url: 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=' + userYear + '&make=' + userMake + '&model=' + userModel,
        dataType: "xml",
    });
    ajaxRequest.done(function(xml) {
        var $carVersion = $('.carVersion');
        $carVersion.html('');
        $carVersion.append('<option>Version</option>');
        $(xml).find("text").each(function() {
            $carVersion.append('<option>' + $(this).text() + '</option>');
        });
        if ($carVersion.children().length === 1) {
            $errorVehicle.append('Sorry, we could not find the information about the vehicle.');
        } else {
            $carVersion.on('change', function() {
                vehicleID = $(xml).find("text:contains('" + $carVersion.val() + "')").next("value").text();
                vehicleRequest.userId(vehicleID);
            });
        }

        vehicleRequest.userId(vehicleID);
        }); //ajax done #1
    } //userCarVersion
}; //vehicleRequest closed
vehicleRequest.selection();
