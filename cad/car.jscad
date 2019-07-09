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
 var axel = cylinder({r:diameter/2, h:length})
return axel.rotateX(90)
 
}
L = 25, D = 5
function main(params) {return union(
   translate([0,0,D/2+15],axel(L,D)),
  cube([5, 5, 5]))
  }
