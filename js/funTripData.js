var roadTripObj = [{
        start: "Grand Canyon Village, AZ",
        end: "Memphis, TN",
        midpoints: ["Bryce Canyon National Park, Utah",
                    "Yellowstone National Park",
                    "Pikes Peak",
                    "Carlsbad Caverns National Park, New Mexico",
                    "San Antonio, TX",
                    "Sulphur, OK"
        ]
    }, {
        start: "Portland, OR",
        end: "Eugene, OR",
        midpoints: ["Ashland, OR",
                    "Las Vegas, NV",
                    "Red Rock Canyon Road, Las Vegas, NV",
                    "Los Angeles, CA",
                    "Big Sur, CA",
                    "San Francisco, CA"
        ]
    }, {
        start: "Seattle, WA",
        end: "New York City, NY",
        midpoints: ["San Francisco, CA",
                    "Albuquerque, NM",
                    "Houston, TX",
                    "Miami, FL"
        ]
    }, {
        start: "San Francisco, CA",
        end: "New York City, NY",
        midpoints: ["Asheville, North Carolina", "Pittsburgh, PA"]
    }, {
        start: "Portland, OR",
        end: "Anchorage, AK",
        midpoints: ["Eugene, OR",
                    "Bend, OR", "Ashland, OR",
                    "Truckee, CA",
                    "San Francisco, CA",
                    "Salt Lake City, UT",
                    "Calgary, AB, Canada",
                    "Banff, AB, Canada",
                    "Whitehorse, YT, Canada"]
    }, {
        start: "New York City, NY",
        end: "Portland, OR",
        midpoints: ["Miami, FL",
                    "San Antonio, TX",
                    "Los Angeles, CA,"]
    }, {
        start: "Minneapolis, MN",
        end: "Philadelphia, PA",
        midpoints: ["Omaha, NE",
                    "Kansas City, KS",
                    "Jasckon, MS",
                    "New Orleans, LA",
                    "Atlanta, GA",
                    "Charlotte, NC",
                    "Richmond, VA"],
    }, {
        start: "Los Angeles, CA",
        end: "New York City, NY",
        midpoints: ["Chicago, IL",
                    "Detroit, MI",
                    "Toronot ON, Canada",
                    "Montreal QC, Canada,",
                    "Québec City, QC, Canada"]
    }, {
        start: "Bellingham, WA",
        end: "Cabo San Lucas, Mexico",
        midpoints: ["Tijuana, Baja California"]
    }, {

        start: "Portland, ME",
        end: "Havana, Cuba",
        midpoints: ["Miami, FL"]
    }]
    //Random trip here
var userRandomTrip = [];

//Generates a random trip from data above.
$(function() {
    var tripGen = Math.floor(Math.random() * 9);
    userRandomTrip.push(roadTripObj[tripGen])
    console.log(userRandomTrip);

})
