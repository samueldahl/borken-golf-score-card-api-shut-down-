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

function buildCardStructure(players){
    $('#card').append('<tr id="head"></tr>');
    $('#card').append('<tr id="par"></tr>');
    $('#card').append('<tr id="yardage"></tr>');
    $('#card').append('<tr id="handicap"></tr>');
    for (i = players; i > 0; i--){
        $('#card').append('<tr class="score" id="player' + i + '"></tr>');
    }
}

function loadHoles (){
    if (specificCourse.holes.length <= 9 ) {
        for(i = 1; i <= specificCourse.holes.length; i++){
            $('#head').append('<td>' + i + '</td>');

        }
        $('#head').append('<td class="totalCol">total</td>');
    }else{
        for(i = 1; i <= specificCourse.holes.length-9; i++){
            $('#head').append('<td>' + i + '</td>');
        }
        $('#head').append('<td class="outCol">Out</td>');
        for(i = 10; i <= specificCourse.holes.length; i++){
            $('#head').append('<td>' + i + '</td>');
        }
        $('#head').append('<td class="inCol">In</td>');
        $('#head').append('<td class="totalCol">Total</td>');
        //insert second forloop here to complete the process.
    }

    $('#head').prepend('<td></td>');
}

function loadPar(){
    console.log('Shoutout to our wonderfull xactware instructors');
}

function loadYardage(){
    console.log('Trent');
}

function loadHandicap(){
    console.log('Mario');
}

function loadScoreBoxes(){
    console.log('Jason');
}


function loadScoreCard(players){
    console.log(players);
    $('.playerCount').hide();
    $('#cardDiv').show();
    buildCardStructure(players);
    loadHoles();
    loadPar();
    loadYardage();
    loadHandicap();
    loadScoreBoxes();


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