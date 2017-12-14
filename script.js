var data = {latitude: 40.296898, longitude:-111.694647, radius:50};
var courseArray;
var specificCourse;

function loadCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var courses = JSON.parse(this.responseText).courses;
            courseArray = courses;
            appendCourses();
        }
    };
    xhttp.open('POST', 'https://golf-courses-api.herokuapp.com/courses', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data));
}

function appendCourses(){
    $('#courseSelect').append('<option></option>');
    for (i = courseArray.length; i > 0; i--){
        var name = courseArray.pop(i);
        var name2 = name.name;
        var id = name.id;
        $('#courseSelect').append('<option class="'+ name2 +'" value="'+ id +'">'+ name2 +'</option>');
    }
}

function loadSpecificCourse(courseId){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            specificCourse = JSON.parse(this.responseText).course;
            console.log(specificCourse);
            showPlayerCount();
        }
    };
    xhttp.open("GET", "http://golf-courses-api.herokuapp.com/courses/"+courseId, true);
    xhttp.send();
}
function showPlayerCount(){
    $('.select').hide();
    $('.playerCount').show();
}

function loadScoreCard(players){
    console.log(players);
}

    loadCourses();









// function showTee() {
//     $('.select').hide();
//     $('.tee').show();
//     console.log(specificCourse.tee_types.length);
//     for (i = specificCourse.tee_types.length; i > 0; i--) {
//         var name = specificCourse.tee_types.slice(i-1, i)[0];
//         console.log(name);
//         console.log(name.par);
//         var name2 =
//             $('#teeSelect').append('<option class="' + name2 + '" value="' + 10 + '">' + name2 + '</option>');
//
//     }
// }