var data = {latitude: 40.296898, longitude:-111.694647, radius:50};
var courseArray;
function loadCourses() {
    // create instance of xhttp
    var xhttp = new XMLHttpRequest();
    // set xhttp callback for whenever the state of the connection has moved on
    xhttp.onreadystatechange = function() {
        // checks if state is finished
        if (this.readyState === 4 && this.status === 200) {
            // parses response and reads from JSON
            var courses = JSON.parse(this.responseText).courses;
            // logs the data from the response that you needed
            courseArray = courses;
        }
    };
    // set connection type and location
    xhttp.open('POST', 'http://golf-courses-api.herokuapp.com/courses', true);
    // adds headers that the server will read
    xhttp.setRequestHeader('Content-Type', 'application/json');
    // send headers and 'data' as body to the server
    xhttp.send(JSON.stringify(data));
}

loadCourses();

function appendCourses(){
    for (i = courseArray.length; i > 0; i--){
        var name = courseArray.pop(i);
        var name2 = name.name;
        var id = name.id;
        $('#courseSelect').append('<option data-courseId="'+ id +'">'+ name2 +'</option>');
    }
}











































// $.post('http://golf-courses-api.herokuapp.com/courses', data,  function (data, status){
//     experiment = JSON.parse(data);
//     console.log(experiment);
// });