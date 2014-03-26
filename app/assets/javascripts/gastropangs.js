var Gastropangs = Gastropangs || {};

$(document).ready(function(){
  $("#all").click(Gastropangs.fetchAllMeals.bind(this));
  $("#overate").click(Gastropangs.fetchMealsOverAte.bind(this));
  Gastropangs.fullnessText();
  $('#new_meal').on('submit', Gastropangs.saveMeal.bind(this));
  $('#graph_by_dow').click(Gastropangs.fetchMealsByDOW.bind(this));
  $('#report').hide();
  $('#score').hide();
  $('.open_report').click(Gastropangs.toggleReport.bind(this));
  $('.open_scoreboard').click(Gastropangs.toggleScoreboard.bind(this));
  $('#clear').click(Gastropangs.clearGraph.bind(this));
});
