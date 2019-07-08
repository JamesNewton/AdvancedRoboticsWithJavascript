/* Edit this file to make it closer to a car which can be 3D printed.
Hints:
- Use a modular approach. e.g. write a function which returns a wheel
- Allow for intelligent scaling. e.g. the wheel function should take parameters that specify the hub size, tire width, diameter, etc...
- Assume options may be added or removed. e.g. assemble the parts in the standard union / difference pattern.

When you have improved the file even the smallest amount, save the change and do a merge request. 
- Edit the file to make your changes (on GitHub, use the pencil icon next to trash icon)
- When you are done editing, Commit your changes (scroll down, click Commit)
- Make a pull request. (green and white "New Pull Request" button.)
- Assuming your branch is now different from the authors (because you commited a change) you should be able to click "Create Pull Requst"

Note: your request may or may not be merged. 
- You can fork the project and try to attract other developers attention
- You can edit your files to better merge

*/

function axel(length, diameter){
 var axel = cylinder({r:diameter/2, h:length});
return axel.rotateY(90);}
 
 function wheel1(axelLength, diameter, width){
     var wheel1 = cylinder({r:diameter/2, l:width +20}).rotateY(90);
     wheel = intersection(wheel1,translate([-width/2,-diameter/2,-diameter/2],
     cube([width,diameter+20 , diameter + 20])));
     return translate([axelLength, 0, 0],wheel);
 }
  function wheel2(axelLength, diameter, width){
     var wheel2 = cylinder({r:diameter/2, l:width +20}).rotateY(90);
     wheel = intersection(wheel2,translate([-width/2,-diameter/2,-diameter/2],
     cube([width,diameter+20 , diameter + 20])));
     return wheel;
 }

function getParameterDefinitions(){
    return[{name:wheel1_width, type:int, initial:5, caption:wheel1_width},
    {name:wheel1_diameter, type:int, initial:15, caption:wheel1_diameter},
    {name:wheel2_width, type:int, initial:5, caption:wheel2_width},
    {name:wheel2_diameter, type:int, initial:15, caption:wheel2_diameter},
    {name:axel_length, type:int, initial:15, caption:axel_length},
    {name:axel_diameter, type:int, initial:5, caption:axel_diameter}];
}
function main(params) {return union(wheel1(axel_length,wheel1_diameter,wheel1_width),
axel(axel_length,axel_diameter),
wheel2(axel_length,wheel2_diameter,wheel2_width))

  }
