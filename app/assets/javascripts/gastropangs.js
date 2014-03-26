var Gastropangs = Gastropangs || {};

$(document).ready(function(){
  $("#all").click(Gastropangs.fetchAllMeals.bind(this));
  $("#overate").click(Gastropangs.fetchMealsOverAte.bind(this));
  $('#meal_date').datepicker();
  Gastropangs.fullnessText();
  $('#new_meal').on('submit', Gastropangs.saveMeal.bind(this));
});
