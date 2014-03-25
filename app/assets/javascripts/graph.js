Gastropangs.fetchAllMeals = function() {
  var id = $('#all').data('user');
  $.ajax({
    type: "GET",
    url: "/users/" + id + "/meals",
    dataType: "JSON",
    success: function(meals) {
      Gastropangs.drawGraph(meals);
    }
  });
};

Gastropangs.drawGraph = function(meals) {
  colorScale= d3.scale.category10();
     var margin = {top: 20, right: 10, bottom: 20, left: 50},
         width = 500 - margin.left - margin.right,
         height = 300 - margin.top - margin.bottom,
         padding = 50;

     var yScale = d3.scale.linear()
                          .domain([0, d3.max(meals, function(m) { return m.level_of_fullness;})])
                          .range([0, height]);

     var tip = d3.tip()
                 .attr('class', 'd3-tip')
                 .offset([-10, 0])
                 .html(function(m) { return "Date: <span class='date'>" + m.date + "</span><br> Satiety: <span class='satiety'>" + m.level_of_fullness + "</span>";});

     var graph = d3.select('#graph')
                  .attr('height', height)
                  .attr('width', width);


     graph.call(tip);

     graph.selectAll('rect')
          .data(meals)
          .enter()
          .append('rect')
            .attr('class', 'bar')
            .attr('fill', function(m) { return colorScale(m.time) })
            .attr('height', function(m) { return yScale(m.level_of_fullness) })
            .attr('width', 5)
            .attr('x', function(m, i) { return i * 10})
            .attr("y", function(m) { return (height - yScale(m.level_of_fullness)); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

};
