var metaMpgData    = {};
var vehicleRequest = {};
var $vehicleDefer = $.Deferred();
vehicleRequest.index = function() {
            var $carYear  = $('.carYear');
            var $carMake  = $('.carMake');
            var $carModel = $('.carModel');
            var $avgMpg   = $('.avgMpg');
            var $minMpg   = $('.minMpg');
            var $maxMpg   = $('.maxMpg');

            for(ii=1984;ii<2017;ii++){$carYear.append('<option>'+ii+'</option>')};

            $carYear.change(function() {
                var userSelectedYear = ""
                $(".carYear option:selected").each(function() {
                    userSelectedYear += $(this).text();
                });
                var ajaxRequest = $.ajax({
                    type: "GET",
                    url: 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=' + userSelectedYear,
                    dataType: "xml",
                });
                ajaxRequest.done(function(xml) {
                    $(xml).find("value").each(function() {
                        $carMake.append('<option>' + $(this).text() + '</option>');
                    })
                    $vehicleDefer.resolve();
                });

            });
            //MODELSd
            $carMake.change(function() {
                var userSelectedMake = ""
                $(".carMake option:selected").each(function() {
                    userSelectedMake += $(this).text();
                });

                ajaxRequest = $.ajax({
                    type: "GET",
                    url: 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=2012&make=' + userSelectedMake,
                    dataType: "xml",
                });
                ajaxRequest.done(function(xml) {
                    $(xml).find("value").each(function() {
                        $carModel.append('<option>' + $(this).text() + '</option>');
                    })
                    $vehicleDefer.resolve();
                    userCarId();
                });
            });

            function userCarId() {
                userYear    = $(".carYear option:selected").text();
                userMake    = $(".carMake option:selected").text();
                userModel   = $(".carModel option:selected").text();;
                ajaxRequest = $.ajax({
                    type: "GET",
                    url: '//www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=' + userYear + '&make=' + userMake + '&model=' + userModel,
                    dataType: "xml",
                });
                ajaxRequest.done(function(xml) {
                        var vehicleID = $(xml).find("value").first().text();
                        console.log(vehicleID);
                        ajaxRequest = $.ajax({
                            type: "GET",
                            url: '//www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/' + vehicleID,
                            dataType: "xml",
                        });
                        ajaxRequest.done(function(xml) {
                            $(xml).find("avgMpg").each(function() {
                              metaMpgData.avgmpg = $(this).text();
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
                        })
                        $vehicleDefer.resolve();
                    });
                  } //userCarId
                }; //vehicleRequest closed
vehicleRequest.index();
