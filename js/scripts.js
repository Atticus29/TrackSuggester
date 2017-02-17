// Back End
var assignSurveyResults = function(q2, q3, q4, q5, q6){
  // Assigns the best track based on user's answers to the survey questions
  // q2-q6 are the questions in the survey excluding the one asking the user to enter his/her/their name
  // q2-q6 are assumed to be numbers at this point
  // idea is to increment scores of the different track variables based on user responses, then report the max of those values at the end. If there's a tie, choose at random.
  var Ruby = 0;
  var PHP = 0;
  var Java = 0;
  var CSS = 0;
  var Csharp = 0;


}

// Front End
// console.log("js is working");
$(function(){
  // console.log("doc ready is working");
  $("#trackSurvery").submit(function(){
    // console.log("got in");
    var UsrName = $("#userName").val();
    // console.log(UsrName);
    var q2response = parseInt($("input:radio[name=big-business]:checked").val());
    // console.log(q2response);
    var q3response = parseInt($("input:radio[name=web-design]:checked").val());
    var q4response = parseInt($("input:radio[name=app-design]:checked").val());
    var q5response = parseInt($("input:radio[name=startup]:checked").val());
    var q6response = parseInt($("input:radio[name=google]:checked").val());
    // console.log(UsrName, q2response, q3response, q4response, q5response, q6response);
    var bestTrack =  assignSurveyResults(q2response, q3response, q4response, q5response, q6response);
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
