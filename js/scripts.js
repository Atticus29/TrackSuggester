// Back End
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
  }
  // do nothing if q6 == 3

  // maxVal = Math.max(Ruby,PhP,Java, Css, Csharp);
  var trackArray = [Ruby,PhP,Java, Css, Csharp];
  maxVal = Math.max.apply(Math.max, trackArray);
  trackNames = ["Ruby", "PhP", "Java","Css", "Csharp"],
  maxTrackName = trackNames[trackArray.indexOf(maxVal)];

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
