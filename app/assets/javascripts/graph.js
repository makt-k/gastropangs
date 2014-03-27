var Gastropangs = Gastropangs || {};

Gastropangs.clearGraph = function() {
  $('#legend').fadeOut(300);
  $('#graph').fadeOut(300);
};

Gastropangs.fetchTodayMeals = function() {
  var id = $('#recent').data('user');
  $.ajax({
    type: "GET",
    url: "/users/" + id + "/today",
    dataType: "JSON",
    success: function(meals) {
     $('#graph').fadeOut(300, function() {
        $('#graph').empty().append(Gastropangs.drawGraph(meals)).fadeIn(300);
      });
     $('#legend').fadeOut(300, function() {
        $('#legend').empty().append(Gastropangs.drawLegend(meals)).fadeIn(300);
     });
    }
  });
};

Gastropangs.fetchRecentMeals = function() {
  var id = $('#recent').data('user');
  $.ajax({
    type: "GET",
    url: "/users/" + id + "/recent",
    dataType: "JSON",
    success: function(meals) {
     $('#graph').fadeOut(300, function() {
        $('#graph').empty().append(Gastropangs.drawGraph(meals)).fadeIn(300);
      });
     $('#legend').fadeOut(300, function() {
        $('#legend').empty().append(Gastropangs.drawLegend(meals)).fadeIn(300);
     });
    }
  });
};

Gastropangs.fetchMealsOverAte = function() {
  var id = $('#recent').data('user');
  $.ajax({
    type: "GET",
    url: "/users/" + id + "/over",
    dataType: "JSON",
    success: function(meals) {
      $('#graph').fadeOut(300, function() {
        $('#graph').empty().append(Gastropangs.drawGraph(meals)).fadeIn(200);
      });
      $('#legend').fadeOut(300, function() {
        $('#legend').empty().append(Gastropangs.drawLegend(meals)).fadeIn(300);
     });
    }
  });
};

Gastropangs.fetchMealsByDOW = function() {
   var id = $('#recent').data('user');
   weekday = $('#search_dow').val().toLowerCase().trim();
   $.ajax({
    type: "GET",
    url: "/users/" + id + "/dow",
    data: {weekday: weekday},
    dataType: "JSON",
    success: function(meals) {
      $('#graph').fadeOut(300, function() {
        $('#graph').empty().append(Gastropangs.drawGraph(meals)).fadeIn(300);
      });
      $('#legend').fadeOut(300, function() {
        $('#legend').empty().append(Gastropangs.drawLegend(meals)).fadeIn(300);
     });
      $('#search_dow').val('');
    }
  });
};

Gastropangs.drawGraph = function(meals) {
  colorScale= d3.scale.category10();
     var margin = {top: 20, right: 10, bottom: 20, left: 50},
         width = 350 - margin.left - margin.right,
         height = 400 - margin.top - margin.bottom,
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
            .attr('fill', function(m) { return colorScale(m.time); })
            .attr('height', function(m) { return yScale(m.level_of_fullness); })
            .attr('width', 15)
            .attr('x', function(m, i) { return i * 25; })
            .attr("y", function(m) { return (height - yScale(m.level_of_fullness)); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
};

Gastropangs.drawLegend = function(meals){

  var legend = d3.select('#legend')
                  .attr('height', 100)
                  .attr('width', 200);


  var keys = legend.selectAll('g')
                  .data(meals, function(m) { return m.time; })
                  .enter()
                  .append('g')
                    .attr('class', 'keys');

  keys.append("rect")
        .attr('width', 10)
        .attr('height', 10)
        .attr('x', 10)
        .attr('y', function(m, i) {return i * 15; })
        .style('fill', function(m) { return colorScale(m.time); });


  keys.append("text")
      .attr('x', 20)
      .attr('y', function(m, i) {return i * 16; })
      .text(function(m) { return m.time; })
      .attr("font-size","12px")
      .attr("stroke","black");

    };
