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
    console.log(UsrName, q2response, q3response, q4response, q5response, q6response);
    event.preventDefault();
  });
  $("#results-reset-form").submit(function(){
    console.log("got into redo button");
    event.preventDefault();
  })
});
