// Back End
var getAllIndexes = function (arr, val) { // stole this one shamelessly from the internet because I couldn't figure out how to get all indexes that matched a value instead of just the first one
    var indexes = []
    var i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}
var getRandomInt = function (min, max) { // also stole this one shamelessly from the internet
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var assignSurveyResults = function(q2, q3, q4, q5, q6){
  // Assigns the best track based on user's answers to the survey questions
  // q2-q6 are the questions in the survey excluding the one asking the user to enter his/her/their name
  // q2-q6 are assumed to be numbers at this point
  // idea is to increment scores of the different track variables based on user responses, then report the max of those values at the end. If there's a tie, choose at random.
  var Ruby = 0;
  var PhP = 0;
  var Java = 0;
  var Css = 0;
  var Csharp = 0;
  if (q2 >3){ // if answer to question 2 (like big enterprise) was sufficiently enthusiastic, increment Java and Csharp
    Java += 1;
    Csharp += 1;
  } else if(q2 < 3){ // if answer is suffiently unenthusiastic, de-increment Java and Csharp
    Java -= 1;
    Csharp -= 1;
  } // otherwise, we'll do nothing, which doesn't need an else statement because nothing would happen in it?
  if (q3 >3){ // q3 = likes web design
    Css += 2;
    PhP += 1;
  } else if (q3 < 3){
    Css -= 1;
  }
  if (q4 >3){ // q4 = likes app development
    Ruby += 1;
    Java += 1;
  } else if (q4 < 3){
    Ruby -= 1;
    Java -= 1;
  }
  if (q5 >3){ // q5 = likes startup
    Ruby += 2;
  } else if (q5 < 3){
    Ruby -= 1;
  }
  if (q6 >4){ // q6 = likes google
    Java += 2;
    Csharp -= 2;
  } else if (q6 == 4){
    Java += 1;
    Csharp -= 1;
  } else if (q6 ==2){
    Java -= 1;
    Csharp += 1;
  } else if (q6 == 1){
    Java -= 2;
    Csharp += 2;
  }// do nothing if q6 == 3
  return [Ruby, PhP, Java, Css, Csharp];
}
var getTrackWithHighestScore = function([Ruby, PhP, Java, Css, Csharp]){
  var trackArray = [Ruby, PhP, Java, Css, Csharp];
  var maxVal = Math.max.apply(Math.max, trackArray);
  var trackNames = ["Ruby", "PhP", "Java","Css", "Csharp"];
  // can't just use indexOf because there could be more than one match
  var idexesMatchingMax = getAllIndexes(trackArray, maxVal);
  var maxTrackName = [];
  for (var i = 0; i<idexesMatchingMax.length; i++){
    maxTrackName.push(trackNames[idexesMatchingMax[i]]);
  }
  if (maxTrackName.length > 1){
    // this means there is more than one track that had the highest score for this user
    var randomMatchingIndex = getRandomInt(0, maxTrackName.length-1);
    var returnVal = maxTrackName[randomMatchingIndex];
  } else{
    var returnVal = maxTrackName[0]
  }
  return returnVal;
}

// Front End
$(function(){
  $("#trackSurvery").submit(function(){
    var UsrName = $("#userName").val();
    var q2response = parseInt($("input:radio[name=big-business]:checked").val());
    var q3response = parseInt($("input:radio[name=web-design]:checked").val());
    var q4response = parseInt($("input:radio[name=app-design]:checked").val());
    var q5response = parseInt($("input:radio[name=startup]:checked").val());
    var q6response = parseInt($("input:radio[name=google]:checked").val());
    var trackScores =  assignSurveyResults(q2response, q3response, q4response, q5response, q6response);
    var bestTrack = getTrackWithHighestScore(trackScores);
    $("#results-section").show();
    $("#survey-section").hide();
    $(".name").text(UsrName);
    $(".track").text(bestTrack);
    event.preventDefault();
  });
  $("#results-reset-form").submit(function(){
    console.log("got into redo button");
    $("#results-section").hide();
    $("#survey-section").show();
    event.preventDefault();
  })
});
