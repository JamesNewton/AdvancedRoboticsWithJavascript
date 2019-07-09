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
        { name: 'carLength', type: 'int', initial: 43, caption: 'Length?' }, 
        { name: 'carWidth', type: 'int', initial: 20, caption: 'Width?' },
        { name: 'carHight', type: 'int', initial: 18, caption: 'Hight?' },
        { name: 'wheelRadius', type: 'int', initial: 4, caption: 'Wheel radius?' },
        { name: 'hubRadius', type: 'int', initial: 3, caption: 'Hub radius?' },
        { name: 'frontWheelOffset', type: 'int', initial: 3, caption: 'Front wheel offset?' },
        { name: 'backWheelOffset', type: 'int', initial: 3, caption: 'Back wheel offset?' },
        { name: 'numSpokes', type: 'int', initial: 8, caption: 'number of spokes'}, 
        { name: 'hubDiam', type: 'float', initial: 1, caption: 'diameter of the wheel hub'},
        { name: 'wheelWidth', type: 'int', initial: 2, caption: 'width of the wheel'},
        { name: 'windAngle', type: 'int', initial: 45, min: 0, max: 80, caption: 'Front thingy angle?' }
    ];
}

function chassis(l, w, h, wheelR, hubR, frontWheelOffset, backWheelOffset, windAngle) {
  return [ 
    union(
        difference(
            translate([-l/2,-w/2,wheelR],cube([l,w,h])),
            translate([l/2 - frontWheelOffset - wheelR, w/2, wheelR], 
                rotate([90,0,0], cylinder({r: wheelR + 1, h: 3}))
                ),
            translate([l/2 - frontWheelOffset - wheelR, -w/2, wheelR], 
                rotate([90,0,0], 
                    cylinder({r: wheelR + 1, h: -3})
                    )
                ),
            translate([l/2, -w/2, wheelR * 2], 
                rotate([0,-windAngle,0], 
                    cube([l,w,h*2])
                    )
                )
            ),
        translate([l/2 - frontWheelOffset - wheelR, -w/2, wheelR], 
            axel(w,hubR)
            ),
        translate([l/2 - frontWheelOffset - wheelR, -w, wheelR], 
            wheel(params.numSpokes, params.hubDiam, params.wheelWidth, wheelR*2, 0, 0)
            ),
        translate([l/2 - frontWheelOffset - wheelR, w, wheelR], 
            wheel(params.numSpokes, params.hubDiam, params.wheelWidth, wheelR*2, 0, 0)
            )
        )
    ]
}

function axel(length, diameter){
    var axel = cylinder({r:diameter/2, h:length})
    return axel.rotateX(-90)
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
  var l = params.carLength;
  var w = params.carWidth;
  var h = params.carHight;
  var wheelR = params.wheelRadius;
  var hubR = params.hubRadius;
  var frontWheelOffset = params.frontWheelOffset;
  var backWheelOffset = params.backWheelOffset;
  var windAngle = params.windAngle;
  //return (translate([-l/2,-w/2,0],cube([l,w,h])));
    //return (translate(l/2 - frontWheelOffset - wheelR, w/2, wheelR, rotate([90,0,0], cylinder({r: wheelR + 1, h: 10}))));
    var carChasis = chassis(l, w, h, wheelR, hubR, frontWheelOffset, backWheelOffset, windAngle);
    return (carChasis );
    
}
