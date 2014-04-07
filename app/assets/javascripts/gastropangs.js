var Gastropangs = Gastropangs || {};

$(document).ready(function(){
  $("#recent").click(Gastropangs.fetchRecentMeals.bind(this));
  $("#overate").click(Gastropangs.fetchMealsOverAte.bind(this));
  $('#graph_by_dow').click(Gastropangs.fetchMealsByDOW.bind(this));
  $('.open_scoreboard').click(Gastropangs.toggleScoreboard.bind(this));
  $('#clear').click(Gastropangs.clearGraph.bind(this));
  $('#today').click(Gastropangs.fetchTodayMeals.bind(this));

  $('#new_meal').on('submit', Gastropangs.saveMeal.bind(this));

  Gastropangs.fullnessText();

  $('#graph').hide();
  $('#legend').hide();
  $('#score').hide();

  $('.panel-collapse').collapse();
});
