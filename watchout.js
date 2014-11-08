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
    .attr("fill", this.data.color)
    .call(drag);
};


var drag = d3.behavior.drag()
  .on("drag", function(d) {
    console.log(this);
    d.x =  d.x + d3.event.dx;
    d.y =  d.y + d3.event.dy;
    if(d.x >= options.width){ d.x = options.width -10; }
    if(d.x <= 0 ){ d.x = 10; }
    if(d.y >= options.height){ d.y = options.height -10; }
    if(d.y <= 0 ){ d.y = 10; }
    d3.select(this)
    //.transition()
    .attr("transform", "translate(" + d.x + " ," +  d.y + ")");
    //.attr("cy", d.x)
    //.attr("cx", d.y);
  });

// User.prototype.dragIt = function(){
//   return d3.behavior.drag()
//     .on("drag", function() {
//       var X = this.data.x + d3.event.x;
//       var Y = this.data.y + d3.event.y;
//       this.data.x = X;
//       this.data.y = Y;
//     });
//     board.selectAll('circle.user')
//       .data([this.data])
//       .attr("cx", function(d) { return d.x; })
//       .attr("cy", function(d) { return d.y; });
//     console.log('you suck');
// };

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
    .attr("fill", function(d){ return d.color })
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

  /* for(var i = 0; i <options.numberOfEnemies; i++){
    var newX = Math.abs(Math.floor(this.data[i].x + Math.random() * options.width) - Math.random() * options.width);
    var newY = Math.abs(Math.floor(this.data[i].x + Math.random() * options.height) - Math.random() * options.height);


    board.selectAll("circle.enemy")
      .data(this.data[i])
      .attr("cx", function(d){return d.x;}) // make the body green
      .attr("cy", function(d){return d.y;})
      .transition()
      .attr("cx", newX) // then transition to red
      .attr("cy", newY);
  }*/

  this.updatePosition();
  board.selectAll('circle.enemy')
    .data(this.data)
    .transition()
    .duration(2000)
    .tween('custom', function() {
      return function(t){
        var en = d3.select(this);
        var enX = en.attr('x');
        var enY = en.attr('y');
        var enR =  5;
      }.bind(this);
    })
    .attr('cx', function(d){
      return Math.floor(Math.random() * options.width);
    })
    .attr('cy', function(d) {
      return Math.floor(Math.random() * options.height);
    });
};

var enemy = new Enemy();

setInterval(enemy.moveEnemies.bind(enemy), 2000);
setInterval(function(){
  options.currentScore++;
  d3.select(".current span").text(options.currentScore);
}, 80);

