// start slingin' some d3 here.

var options = {
  height: $(window).height() -100,
  width: $(window).width() -100,
  numberOfEnemies: 40,
  currentScore: 0
};

var board = d3.select("body").append("svg:svg")
    .attr("width", options.width)
    .attr("height", options.height)
    .style("border", "1px solid black");

var User = function(){
  this.data = {
    x: Math.floor(options.width/2),
    y: Math.floor(options.height/2),
    r: 10,
    color: "green"
  };
  board.selectAll("circle.user")
    .data([this.data])
    .enter()
    .append("circle")
    .attr("class", "user")
    .attr("r", function(d){return d.r;})
    .attr("transform", "translate("+ this.data.x +", " + this.data.y + ")")
    .attr("fill", this.data.color);
};

var user = new User();

var Enemy = function(){
  this.data = [];
  this.updatePosition();
  board.selectAll("circle.enemy")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("class", "enemy")
    .attr("r", function(d){return d.r;})
    .attr("fill", function(d){ return d.color})
    //attr("transform",  "translate("+ this.data.x +", " + this.data.y + ")");
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
  this.moveEnemies();
};

Enemy.prototype.updatePosition = function(){
  for(var i =0; i < options.numberOfEnemies; i++){
    this.data[i] = {
      x: Math.floor(Math.random() * options.width),
      y: Math.floor(Math.random() * options.height),
      r: 5,
      color: "red"
    };
  }
};

Enemy.prototype.moveEnemies = function(){


  board.selectAll("circle.enemy")
      .data(this.data)
      .attr("cx", function(d){return d.x}) // make the body green
      .attr("cy", function(d){return d.y})
      .transition()
      .attr("cx", function(d){return d.x+50}) // then transition to red
      .attr("cy", function(d){return d.y+50});
};




var enemy = new Enemy();



// setInterval(function(){
//   Enemy.prototype.moveEnemies.bind(enemy);
// }, 1000);



setInterval(function(){
  options.currentScore++;
  d3.select(".current span").text(options.currentScore);
}, 80);

