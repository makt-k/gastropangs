var Gastropangs = Gastropangs || {};

$(document).ready(function(){
  $("#recent").click(Gastropangs.fetchRecentMeals.bind(this));
  $("#overate").click(Gastropangs.fetchMealsOverAte.bind(this));
  Gastropangs.fullnessText();
  $('#new_meal').on('submit', Gastropangs.saveMeal.bind(this));
  $('#graph_by_dow').click(Gastropangs.fetchMealsByDOW.bind(this));
  $('#report').hide();
  $('#score').hide();
  $('#graph').hide();
  $('.open_report').click(Gastropangs.toggleReport.bind(this));
  $('.open_scoreboard').click(Gastropangs.toggleScoreboard.bind(this));
  $('#clear').click(Gastropangs.clearGraph.bind(this));
  $('#today').click(Gastropangs.fetchTodayMeals.bind(this));
  $('.panel-collapse').collapse();
});
