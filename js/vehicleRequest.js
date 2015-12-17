//TESTING OKAY DONT JUDGE MEH
/*
Notes before I pass out -
basic flow: cascading ajax calls/async
-User selects year, then year gets concated to the end of make ajax url, makes the call,
and populates make drop down.
-User selects a make, then make gets concated to the end of model ajax url, makes the call,
and populates the model drop down.
-Pull all three values from the selectors below after this occurs, and get the car {id} #
we then can make the last ajax call in this module, getting the important mpg data or any
other criteria for that specific vehicle only.
*/

$(function() {
    var $carYear = $('.carYear');
    var $carMake = $('.carMake');
    var $carModel = $('.carModel');

    var userSelectedMake;
    $carMake.change(function() {
            userSelectedMake = " "
            $(".carMake option:selected").each(function() {
                userSelectedMake += $(this).text();
            });
        })

        //LOLZ GUYZ I WROTE U A 4LOOPZ
        //YEARS
    for (ii = 1984; ii < 2017; ii++) {
        $carYear.append('<option>' + ii + '</option>')
    };

    //MAKES
    var ajaxRequest = $.ajax({
        type: "GET",
        url: "http://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=2012",
        dataType: "xml",
        success: function(xml) {
            $(xml).find("value").each(function() {
                var carMakes = $(this).text();
                $carMake.append('<option>' + carMakes + '</option>');
            })
        },
    });

    //MODELS
    ajaxRequest = $.ajax({
        type: "GET",
        url: 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=2012&make=Honda',
        dataType: "xml",
        success: function(xml) {
            $(xml).find("value").each(function() {
                var carModels = $(this).text();
                $carModel.append('<option>' + carModels + '</option>');
            })
        },
    });
    ajaxRequest.fail(function(data, textStatus, xhr) {
        console.log('your ajax request was bullshit.')
    });
});
