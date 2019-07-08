/* Dexter HD End Effector blank.
Subtract this from any part to make it slide onto the end effector
*/
function main() { 
var w = 7.5
var h = 15

return union(
 rotate([0,0,45],translate([-w/2,-w/2,0],color("black",cube([w,w,h])))),
 translate([0,-w/2,0],color("black",cube([w/2,w,h]))),
 translate([-13.5,-15,-3],color("black",cube([20,40,3]))),
 rotate([0,90,0],translate([-15,-15,3.5],color("black",cube([15,40,3]))))
 )
    
}
