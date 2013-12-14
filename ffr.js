/**
 * @author Alison Benjamin
 */

var viewportWidth = $(window).width();
var viewportHeight = $(window).height()/2;
var w = viewportWidth * .97;
var h = w/1.85;

d3.csv("FFR_skill.csv", function(data){
	
	var svg = d3.select("article")
		.append("svg")
		.attr({
			"width":w,
			"height":h
		});	
	
	var counts = _.pluck(data, 'Count')
	counts = $.map(counts,Number);
		
	var outerRadius = w / 5;

	//draw wedges
	var arc = d3.svg.arc()
		.innerRadius(100) 
		.outerRadius(outerRadius);
	
	// define default pie layout
	var pie = d3.layout.pie();

	var arcs = svg.selectAll("g.arc") 
		.data(pie(counts)) 
		.enter()
		.append("g")
		.attr("transform", "translate(" + outerRadius + "," + outerRadius + ")"); 	

	//Draw arc paths	
	arcs.append("path")
		.attr("d", arc)
		
	//label 
	arcs.append("text")
		.attr("transform", function(d,i) {
			return "translate(" + arc.centroid(d) + ")"; 	
		})
		.attr({
			"text-anchor":"middle",
			"fill":"white"
		})
		.text(function(d) {
			return d.value;
		})
	
	d3.selectAll("path")
		.on("mouseover",function(d,i){				
			d3.select(this).classed("highlight",true)
			d3.select("#tooltip")
				.classed("hidden",false)
				.select("#skill")		
				.append("text")
				.text(function(){
					//find & return the label 
					for(var i = 0; i < data.length; i++){
						data[i].Count = parseInt(data[i].Count);
						if(data[i].Count == d.value){
							return data[i].Skill;
						}
					}				
				})	
			})
		.on("mouseout", function(d,i){
		d3.select(this).classed("highlight",false);
			d3.select("#tooltip")
				.classed("hidden",true)	
			d3.select("#skill text").remove();
			
		})
})


