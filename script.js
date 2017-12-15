var data = {latitude: 40.296898, longitude:-111.694647, radius:50};
//data is the object showing location in latitude and longitude that the program uses to search for nearby holes.
//you can refine your search by changing radius.
// Due to time restraints the functions required to alter this object were not included.
var courseArray;
//courseArray is the information from the initial API call stored as a variable for later use.
var specificCourse;
//specificCourse is the object returned by the API stored as a global variable.
var playerCount;
//playerCount is equal to the number of players selected after the course is selected.
var holeCount;
//holecount is equal to the number of holes in the course.
var holes;
//holes is the holes information array within the specificCourse object. This array includes par and crap like that.

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

function showPlayerCount(){
    $('.select').hide();
    $('.playerCount').show();
}

function buildCardStructure(players){
    $('#card').append('<tr id="head"></tr>');
    $('#card').append('<tr id="yardage"></tr>');
    $('#card').append('<tr id="handicap"></tr>');
    $('#card').append('<tr id="par"></tr>');
}

function loadHoles (){
    holeCount = specificCourse.holes.length;
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
    }

    $('#head').prepend('<td style="background-color:white;"></td>');
}

function loadYardage(){
    $('#yardage').append('<td>Yardage</td>');
    let localHoles = holes;
    if (specificCourse.holes.length <= 9 ) {
        for(i = 0; i <= specificCourse.holes.length; i++){
            localHole = localHoles.slice(i,i+1)[0];
            $('#yardage').append('<td>' + localHole. + '</td>');

        }
        $('#yardage').append('<td class="totalCol"></td>');
    }else{
        for(i = 1; i <= specificCourse.holes.length-9; i++){
            $('#yardage').append('<td>' + i + '</td>');
        }
        $('#yardage').append('<td class="outCol"></td>');
        for(i = 10; i <= specificCourse.holes.length; i++){
            $('#yardage').append('<td>' + i + '</td>');
        }
        $('#yardage').append('<td class="inCol"></td>');
        $('#yardage').append('<td class="totalCol"></td>');
    }
}

function loadHandicap(){
    $('#handicap').append('<td>Handicap</td>');
}

function loadPar(){
    $('#par').append('<td>Par</td>')
}

function loadScoreBoxes(){

}

//functions below called by HTML events
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

function loadScoreCard(players){
    playerCount = players;
    holes = specificCourse.holes;
    $('.playerCount').hide();
    $('#cardDiv').show();
    buildCardStructure(players);
    loadHoles();
    loadYardage();
    loadHandicap();
    loadPar();
    loadScoreBoxes();


}

function calculateScore(){

}

//functions below called upon page load.
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