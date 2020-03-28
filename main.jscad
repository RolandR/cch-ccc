
/*

	This is an openjscad file.
	You can compile it to an stl or other 3d file at openjscad.org
	
	CC0 2019 by draemmli (Roland Rytz)

*/


function main(){
	var biggerRadius = 30; // radius of the outer letter "C"
	var thickness = 5; // line width (also sets gap between inner and outer "C")
	var height = 10;
	var smallerRadius = biggerRadius - 2*thickness;
	var fn = 100; // curve resolution
	var offset = biggerRadius + smallerRadius + 2*thickness;
	
	var biggerCylinder = cylinder({r: biggerRadius, h: height, fn: fn});
	var cutout = cylinder({r: biggerRadius - thickness, h: height, fn: fn});
	biggerCylinder = difference(
		 biggerCylinder
		,cutout
	);
	
	var smallerCylinder = cylinder({r: smallerRadius, h: height, fn: fn});
	cutout = cylinder({r: smallerRadius - thickness, h: height, fn: fn});
	smallerCylinder = difference(
		 smallerCylinder
		,cutout
	);
	smallerCylinder = smallerCylinder.translate([offset, 0, 0]);
	
	var smallStraightCutout = cube({size:[offset, thickness, height], center: [false, true, false]});
	var smallStraightConnection = cube({size:[thickness*3, thickness*3, height], center: [false, true, false]})
		.translate([biggerRadius-thickness/2, 0, 0]);
	var bigStraightCutout = cube({size:[offset, thickness*5, height], center: [false, true, false]})
		.translate([-offset, 0, 0]);
	
	var part = union(
		 biggerCylinder
		,smallerCylinder
		,smallStraightConnection
	);
	
	part = difference(
		 part
		,smallStraightCutout
		,bigStraightCutout
	);
	
	var C = difference(
		 biggerCylinder
		,bigStraightCutout
	);
	
	var c = difference(
		 smallerCylinder
		,smallStraightConnection.translate([thickness, 0, 0])
	);
	
	part = union(
		 c
		,part.translate([offset, 0, 0])
		,part.translate([2*offset, 0, 0])
		,C.translate([3*offset, 0, 0])
	).translate([-2*offset, 0, 0]);
	
	return part;
}


