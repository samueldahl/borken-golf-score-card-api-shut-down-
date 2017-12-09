
var data = {ContentType: application/json, latitude: 40.296898, Longitude:-111.694647, radius:50};
var experiment;

$.post('http://golf-courses-api.herokuapp.com/courses/search',  function (data, status){
    experiment = JSON.parse(data);
    console.log(experiment);
});

