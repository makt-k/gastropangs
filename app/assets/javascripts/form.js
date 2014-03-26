var Gastropangs = Gastropangs || {};

Gastropangs.saveMeal = function(event) {
  var $fullness = $("#meal_level_of_fullness"),
    $time = $("#meal_time"),
    $date = $("#meal_date"),
    meal,
    id = $('#all').data('user');

  event.preventDefault();
  this.currentMeal = new Gastropangs.Meal($fullness.val(), $time.val(), $date.val());
  meal = this.currentMeal;


  if($time.val() === "" || $date.val() === "") {
    $('.notice-alert').prepend("Please enter a time and date for your meal.");
    } else {

    $.ajax({
      type: "POST",
      url: "/users/" + id + "/meals",
      data: {meal: {
        level_of_fullness: meal.level_of_fullness,
        time: meal.time,
        date: meal.date}},
        dataType: 'json'
    }).done(function (data) {
      meal.id = data.id;
        $('.notice').hide();
        $('#meal_level_of_fullness').val(1);
        $('#meal_time').val('');
        $.datepicker._clearDate('#meal_date');
      });
    }
  };
Gastropangs.fullnessText = function(){
  var level = $('#level');
  $('#meal_level_of_fullness').change(function(){
      level.html(this.value);
  });
  $('#meal_level_of_fullness').change();
};
