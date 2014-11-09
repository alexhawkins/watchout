// start slingin" some d3 here.
"use strict";

/**************GAME OPTIONS*****************/

var options = {
  gameHeight: document.getElementById("board").height.animVal.value,
  gameWidth: document.getElementById("board").width.animVal.value,
  numberOfEnemies: 30,
  currentScore: 0,
  highScore: 0,
  collisions: 0
};

/**************PLAYER*****************/

var createPlayer = function() {
  d3.select("#player")
    .attr("cx", options.gameWidth / 2)
    .attr("cy", options.gameHeight / 2)
    .attr("r", 8)
    .attr("stroke", "#333")
    .attr("stroke-width", 2)
    .attr("fill", "#ff0000");

  d3.select("#board").on("mousemove", function() {
    var mouseCoordinates = d3.mouse(this);
    //console.log(mouseCoordinates);
    d3.select("#player").attr("cx", mouseCoordinates[0]).attr("cy", mouseCoordinates[1]);
    d3.select("#xcoord span").text(mouseCoordinates[0]);
    d3.select("#ycoord span").text(mouseCoordinates[1]);
  });
};

/**************ENEMIES*****************/

/** updates the coordinates our enemy dataset */
var updateEnemies = function() {
  var eData = [];
  for (var i = 0; i < options.numberOfEnemies; i++) {
    eData.push({
      cx: Math.floor(Math.random() * options.gameWidth),
      cy: Math.floor(Math.random() * options.gameHeight)
    });
  }
  return eData;
};

/** initializes our enemies to our game board*/
var createEnemies = function() {
  var eData = updateEnemies();
  d3.select("#board")
    .selectAll(".enemy")
    .data(eData)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return d.cx;
    })
    .attr("cy", function(d) {
      return d.cy;
    })
    .attr("r", 10)
    .attr("class", "enemy")
    .attr("fill", "black")
    .transition()
    .duration(1000);
  moveEnemies();
};

/** move our enemies to new coordinates by calling updateEnemies function */
var moveEnemies = function() {
  var newEnemyData = updateEnemies();
  d3.selectAll(".enemy")
    .data(newEnemyData)
    .transition()
    .duration(1000)
    .attr("cx", function(d) {
      return d.cx;
    })
    .attr("cy", function(d) {
      return d.cy;
    });
};

/** check for collisons between player and enemies */
var checkForCollisions = function() {
  var allEnemies = d3.selectAll(".enemy");
  var player = d3.select("#player");
  var locPlayerX = player.attr("cx");
  var locPlayerY = player.attr("cy");
  var pRadius = parseFloat(player.attr("r"));

  allEnemies.each(function(el) {
    var locEnemyX = el.cx;
    var locEnemyY = el.cy;
    var eRadius = parseFloat(player.attr("r"));
    var distance = Math.sqrt(Math.pow((locPlayerX - locEnemyX), 2) + Math.pow((locPlayerY - locEnemyY), 2));
    var radiusSum = pRadius + eRadius;
    if (distance < radiusSum) {
      incrementCollisions();
    }
  });
};

/** update the collision count */
var incrementCollisions = function() {
  options.collisions++;
  d3.select(".collisions span").text(options.collisions);
  setScores();
};

/** set the high score and current score */
var setScores = function() {
  if (options.currentScore > options.highScore) {
    options.highScore = options.currentScore;
    d3.select(".high span").text(options.currentScore);
  }
  options.currentScore = 0;
  d3.select(".current span").text(options.currentScore);
};


/** start our game **/
createEnemies();
createPlayer();
setInterval(checkForCollisions, 100); //check for collisions every 100ms
setInterval(moveEnemies, 2000); //move enemies
setInterval(function() {
  options.currentScore++;
  d3.select(".current span").text(options.currentScore);
}, 80);
