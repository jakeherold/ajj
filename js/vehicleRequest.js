var metaMpgData    = {};
var vehicleRequest = {};

var $vehicleDefer  = $.Deferred();
vehicleRequest.index = function() {
    var $carYear      = $('.carYear');
    var $carMake      = $('.carMake');
    var $carModel     = $('.carModel');
    var $carVersion   = $('.carVersion');
    var $avgMpg       = $('.avgMpg');
    var $minMpg       = $('.minMpg');
    var $maxMpg       = $('.maxMpg');
    var $errorVehicle = $('.errorVehicle');

    var date = new Date();
    var currentYear = date.getFullYear();
    for (ii = 1984; ii <= currentYear; ii++) {
        $carYear.append('<option>' + ii + '</option>')
    };

    $carYear.on('change', function() {
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
                // $vehicleDefer.resolve();
            });
    });
    //MODELSd
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
                // $vehicleDefer.resolve();
                //        console.log("vehicleDefer resolved");

            });
    });

    $carModel.on('change', function() {
        userCarVersion();
    });
    function userCarVersion() {
        userYear    = $(".carYear option:selected").text();
        userMake    = $(".carMake option:selected").text();
        userModel   = $(".carModel option:selected").text();
        ajaxRequest = $.ajax({
            type: "GET",
            url: 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=' + userYear + '&make=' + userMake + '&model=' + userModel,
            dataType: "xml",
        });
        ajaxRequest.done(function(xml) {
            $carVersion.html('');
            $carVersion.append('<option>Version</option>');
            $(xml).find("text").each(function() {
                $carVersion.append('<option>' + $(this).text() + '</option>');
            });
            if ($carVersion.children().length===1){
                $errorVehicle.append('Sorry, we could not find the information about the vehicle.');
            }else{
            $carVersion.on('change', function() {
                var vehicleID = $(xml).find("text:contains('" + $carVersion.val() + "')").next("value").text();
                userCarId(vehicleID);
            });
            }
            function userCarId(vehicleID) {
                $errorVehicle.html('');
                console.log(vehicleID);
                ajaxRequest = $.ajax({
                    type: "GET",
                    url: 'https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/' + vehicleID,
                    dataType: "xml",
                    statusCode: {
                        404: function() {
                            //resets and error message in drop down section
                            $errorVehicle.append('Sorry, we could not find the information about the vehicle.');
                            $carYear.val(0);
                            $carMake.val(0);
                            $carModel.val(0);
                            $carVersion.val(0);
                        }
                    }
                });
                console.log(xml);
                ajaxRequest.done(function(xml) {
                    $(xml).find("avgMpg").each(function() {
                        metaMpgData.avgmpg = Math.round(parseInt($(this).text()));
                        console.log(metaMpgData.avgmpg);
                        $avgMpg.append($(this).text());
                    });
                    $(xml).find("maxMpg").each(function() {
                        metaMpgData.maxmpg = $(this).text();
                        $maxMpg.append($(this).text());
                    });
                    $(xml).find("minMpg").each(function() {
                        metaMpgData.minmpg = $(this).text();
                        $minMpg.append($(this).text());
                        console.log(metaMpgData);
                    });
                    $vehicleDefer.resolve();
                    console.log("vehicle defer resolved");

                })
            } //userCarId
        }); //ajax done #1
    } //userCarVersion
}; //vehicleRequest closed
vehicleRequest.index();
