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
    for (i = playerCount; i > 0; i--){
        $('#card'+i).append('<table id="table'+ i +'"></table>');
    }
    for (i = playerCount; i > 0; i--) {
        $('#table'+i).append('<tr id="head'+i+'"></tr>');
        $('#table'+i).append('<tr id="yardage'+i+'"></tr>');
        $('#table'+i).append('<tr id="handicap'+i+'"></tr>');
        $('#table'+i).append('<tr id="par'+i+'"></tr>');
        $('#table'+i).append('<tr id="score'+i+'"></tr>');
    }
//     $('#card').append('<tr id="head"></tr>');
//     $('#card').append('<tr id="yardage"></tr>');
//     $('#card').append('<tr id="handicap"></tr>');
//     $('#card').append('<tr id="par"></tr>');
    }

function loadHoles (){
    holeCount = specificCourse.holes.length;
        for (i = playerCount; i > 0; i--){
            let outerSelect = i;
            for(j = 1; j <= specificCourse.holes.length; j++){
                    $('#head'+outerSelect).append('<td>' + j + '</td>');
                }
                $('#head'+outerSelect).append('<td class="totalCol">Total</td>');
                $('#head'+outerSelect).prepend('<td style="background-color:white;">Hole</td>');
        }

}
//     if (specificCourse.holes.length <= 9 ) {
//         for(i = 1; i <= specificCourse.holes.length; i++){
//             $('#head').append('<td>' + i + '</td>');
//
//         }
//         $('#head').append('<td class="totalCol">total</td>');
//     }else{
//         for(i = 1; i <= specificCourse.holes.length-9; i++){
//             $('#head').append('<td>' + i + '</td>');
//         }
//         $('#head').append('<td class="outCol">Out</td>');
//         for(i = 10; i <= specificCourse.holes.length; i++){
//             $('#head').append('<td>' + i + '</td>');
//         }
//         $('#head').append('<td class="inCol">In</td>');
//         $('#head').append('<td class="totalCol">Total</td>');
//     }
//
//     $('#head').prepend('<td style="background-color:white;"></td>');
// }
function loadTeeSelector(){
    for (i = playerCount; i > 0; i--){
        let outerSelect = i;
        $('#card'+outerSelect).prepend('<select id="select'+ i +'" onchange="loadTeeInfo(this.value,' + i + ')"><option></option></select>');

        $('#card'+outerSelect).prepend('<span>Select your Tee  </span>')
        for (j = specificCourse.tee_types.length; j > 0; j--){
            $('#select'+i).append('<option value="' + j + '">' + specificCourse.holes.slice(0,1)[0].tee_boxes.slice(j-1,j)[0].tee_type + '</option>');
        }
    }
}

function loadYardage(teeValue,playerValue){
    holeCount = specificCourse.holes.length;
    var totalYardage = 0;
    //totalyardage will be the thing that holds the total yards
    for (i = 0; i < holeCount; i++){
        var yards = specificCourse.holes.slice(i,i+1)[0].tee_boxes.slice(teeValue-1,teeValue)[0].yards;
        $('#yardage'+playerValue).append('<td>' + yards + '</td>');
        totalYardage += yards;
    }
    $('#yardage'+playerValue).prepend('<td>Yardage</td>');
    $('#yardage'+playerValue).append('<td>' + totalYardage + '</td>');

    // $('#yardage').append('<td>Yardage</td>');
    // let localHoles = holes;
    // if (specificCourse.holes.length <= 9 ) {
    //     for(i = 0; i <= specificCourse.holes.length; i++){
    //         localHole = localHoles.slice(i,i+1)[0];
    //         $('#yardage').append('<td>' + localHole. + '</td>');
    //
    //     }
    //     $('#yardage').append('<td class="totalCol"></td>');
    // }else{
    //     for(i = 1; i <= specificCourse.holes.length-9; i++){
    //         $('#yardage').append('<td>' + i + '</td>');
    //     }
    //     $('#yardage').append('<td class="outCol"></td>');
    //     for(i = 10; i <= specificCourse.holes.length; i++){
    //         $('#yardage').append('<td>' + i + '</td>');
    //     }
    //     $('#yardage').append('<td class="inCol"></td>');
    //     $('#yardage').append('<td class="totalCol"></td>');
    // }
}

function loadHandicap(teeValue, playerValue){
    holeCount = specificCourse.holes.length;
    var totalHandicap = 0;
    for (i = 0; i < holeCount; i++){
        var handicap = specificCourse.holes.slice(i,i+1)[0].tee_boxes.slice(teeValue-1,teeValue)[0].hcp;
        $('#handicap'+playerValue).append('<td>' + handicap + '</td>');
        totalHandicap += handicap;
    }
    $('#handicap'+playerValue).prepend('<td>Handicap</td>');
    $('#handicap'+playerValue).append('<td>' + totalHandicap + '</td>');
}

function loadPar(teeValue, playerValue){
    holeCount = specificCourse.holes.length;
    var totalPar = 0;
    for (i = 0; i < holeCount; i++){
        var par = specificCourse.holes.slice(i,i+1)[0].tee_boxes.slice(teeValue-1,teeValue)[0].par;
        $('#par'+playerValue).append('<td>' + par + '</td>');
        totalPar += par;
    }
    $('#par'+playerValue).prepend('<td>Par</td>');
    $('#par'+playerValue).append('<td>' + totalPar + '</td>');
}

function loadScoreBoxes(teeValue, playerValue){
    holeCount = specificCourse.holes.length;
    for(i = 0; i < holeCount; i++){
        var scoreChange = (function () {
            var oldScore = 0;
            var localPlayer = playerValue;
            var totalScore = 0;
            return function () {
                var score = parseInt(this.value);
                if (isNaN(score)) return;
                totalScore += score - oldScore;
                oldScore = score;
                $('#total' + localPlayer).html(totalScore);
            }
        })();
        var td = document.createElement('td');
        var input = document.createElement('input');
        input = td.appendChild(input);
        input.type = 'number';
        input.onchange = scoreChange;
        td = document.getElementById('score' + playerValue).appendChild(td);
    }
    $('#score'+playerValue).append('<td id="total' + playerValue + '"></td>');
    $('#score'+playerValue).prepend('<td>Score</td>');
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
    for(i = playerCount; i > 0; i--){
        $('#divForTheDumbestGameEver').prepend('<div id="card'+i+'"></div>');
    }
    holes = specificCourse.holes;
    $('.playerCount').hide();
    $('#divForTheDumbestGameEver').show();
    buildCardStructure(players);
    loadHoles();
    loadTeeSelector();
}

function loadTeeInfo(teeValue,playerValue){
    loadYardage(teeValue, playerValue);
    loadHandicap(teeValue, playerValue);
    loadPar(teeValue, playerValue);
    loadScoreBoxes(teeValue, playerValue);

}

function calculateScore(score){

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

//specificCourse.holes.slice(0,1)[0].tee_boxes.slice(0,1)[0].yardage