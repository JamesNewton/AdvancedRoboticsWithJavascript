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

function getParameterDefinitions() {
    return [
        {name: 'numSpokes', type: 'int', initial: 8, caption: 'number of spokes'}, 
        {name: 'hubDiam', type: 'float', initial: 1, caption: 'diameter of the wheel hub'},
        {name: 'wheelWidth', type: 'int', initial: 2, caption: 'width of the wheel'},
        {name: 'wheelDiam', type: 'int', initial: 5, caption: 'diameter of the wheel'}
    ];
}

function wheel(numSpokes, hubDiam, width, diam, x, y) {
    var outside = difference(
        translate([x, y, 0],
            cylinder({r: diam / 2, h: width})
        ),
        translate([x, y, 0],
            cylinder({r: diam / 2 - 0.5, h: width})
        )
    );
    var hub = translate([x, y, 0],
        cylinder({r: hubDiam / 2, h: width})
    );
    var spokes = [];
    for(var i = 0; i < numSpokes; i++) {
        spokes.push(rotate([0, 0, 360 / numSpokes * i], 
            translate([x - 0.125 + hubDiam / 2, y - 0.125, 0], 
                cube([diam / 2 - hubDiam / 2, 0.25, width])
            )
        ));    
    }
    return union(outside, hub, union(spokes));
}

function main(params) {
  var car = [wheel(params.numSpokes, params.hubDiam, params.wheelWidth, params.wheelDiam, 0, 0)];
  return car;
  }
