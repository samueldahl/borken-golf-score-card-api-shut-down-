
var location = {latitude: 90, Longitude:0, radius:100};

var course;
var experiment;
$.post('http://golf-courses-api.herokuapp.com/courses/:id',location, function(data, status){
    experiment =JSON.parse(data);
    console.log(experiment);
});




// $.get('https://golf-courses-api.herokuapp.com/courses/11819', function (data, status){
//     course = data;
//     console.log(course);
// });