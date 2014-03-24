$(document).ready(function(){
  var Gastropangs = Gastropangs || {};

  Gastropangs.fetchAllMeals = function(data) {
  $.ajax({
    type: "GET",
    url: data.target.baseURI,
    dataType: "JSON",
    success: function(meals) {
      colorScale= d3.scale.category10();

    d3.select('.graph')
      .selectAll('rect')
      .data(meals)
      .enter()
        .append('rect')
        .attr('fill', function(d) { return colorScale(d.time) })
        .attr('width', function(d) { return d.level_of_fullness * 20 })
        .attr('height', 50)
        .attr('y', function(d, i) { return i * 60})
    }
  });
};

  $("#all").click(Gastropangs.fetchAllMeals.bind(this));

});



