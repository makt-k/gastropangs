$(document).ready(function(){
  $("#all").click(Gastropangs.fetchAllMeals.bind(this));

  $('#meal_date').datepicker();

  $(function(){
    var level = $('#level');
    $('#meal_level_of_fullness').change(function(){
        level.html(this.value);
    });
    $('#meal_level_of_fullness').change();
  });

  $('#new_meal').on('ajax:success', function(event, data, status, xhr) {
      $('#meal_level_of_fullness').val(1);
      $('#meal_time').val('');
      $.datepicker._clearDate('#meal_date');
  });
});
