var Gastropangs = Gastropangs || {};

Gastropangs.saveMeal = function(event) {
  var $fullness = $("#meal_level_of_fullness"),
  $time = $("#meal_time"),
  $date = $("#meal_date"),
  $note = $("#meal_note"),
  meal,
  id = $('#recent').data('user');

  event.preventDefault();
  this.currentMeal = new Gastropangs.Meal($fullness.val(), $time.val(), $date.val(), $note.val());
  meal = this.currentMeal;

  if($time.val() === "" || $date.val() === "") {
    $('#user-notice').prepend("Please enter a time and date for your meal.").fadeOut(3000,function(){ $(this).remove(); });
  } else {
    $.ajax({
      type: "POST",
      url: "/users/" + id + "/meals",
      data: {meal: {
        level_of_fullness: meal.level_of_fullness,
        time: meal.time,
        date: meal.date,
        note: meal.note}},
        dataType: 'json'
      }).done(function (data) {
        meal.id = data.id;
        $('.notice').hide();
        $('#meal_level_of_fullness').val(1);
        $('#meal_time').val('');
        $('#meal_date').val('');
        $('#meal_note').val('');
        $('#user-notice').prepend("Sweet! A new meal has been added.").fadeOut(3000,function(){ $(this).remove(); });
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
