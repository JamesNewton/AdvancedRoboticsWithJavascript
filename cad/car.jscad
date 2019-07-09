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
        { name: 'carLength', type: 'int', initial: 43, caption: 'Length of the car' }, 
        { name: 'carWidth', type: 'int', initial: 20, caption: 'Width of the car' },
        { name: 'carHeight', type: 'int', initial: 18, caption: 'Height of the car' },
        { name: 'wheelRadius', type: 'float', initial: 4, caption: 'Radius of the wheel' },
        { name: 'axelRadius', type: 'float', initial: 3, caption: 'Radius of the axel' },
        { name: 'frontWheelOffset', type: 'int', initial: 3, caption: 'Offset for the front wheel' },
        { name: 'backWheelOffset', type: 'int', initial: 3, caption: 'Offset for the back wheel' },
        { name: 'numSpokes', type: 'int', initial: 8, caption: 'Number of spokes'}, 
        { name: 'hubRadius', type: 'int', initial: 1, caption: 'Radius of the wheel hub'},
        { name: 'wheelWidth', type: 'int', initial: 2, caption: 'Width of the wheel'},
        { name: 'windAngle', type: 'int', initial: 45, min: 0, max: 80, caption: 'Front thingy angle?' },
        { name: 'windAngle2', type: 'int', initial: 30, min: 0, max: 80, caption: 'Back thingy angle?' }
    ];
}

function chassis(l, w, h, wheelR, axelR, frontWheelOffset, backWheelOffset, windAngle, windAngle2) {
    return [ 
        union(
            difference(
                translate([-l/2,-w/2,wheelR],cube([l,w,h])),
                // scoop out front wheel wells
                translate([l/2 - frontWheelOffset - wheelR, w/2, wheelR], 
                    rotate([90,0,0], cylinder({r: wheelR + 1, h: 3}))
                    ),
                translate([l/2 - frontWheelOffset - wheelR, -w/2, wheelR], 
                    rotate([90,0,0], 
                        cylinder({r: wheelR + 1, h: -3})
                        )
                    ),
                // scoop out back wheel wells
                translate([-l/2 + backWheelOffset + wheelR, w/2, wheelR], 
                    rotate([90,0,0], cylinder({r: wheelR + 1, h: 3}))
                    ),
                translate([-l/2 + backWheelOffset + wheelR, -w/2, wheelR], 
                    rotate([90,0,0], 
                        cylinder({r: wheelR + 1, h: -3})
                        )
                    ),
                // cut off front windsheld
                translate([l/2, -w/2, wheelR * 2], 
                    rotate([0,-windAngle,0], 
                        cube([l,w,h*2])
                        )
                    ),
                // cut off back windsheld
                translate([-l/2, -w/2, wheelR * 2], 
                    rotate([0,windAngle2,0], 
                        cube([-l,w,h*2])
                        )
                    )
                ),
            // front axle
            translate([l/2 - frontWheelOffset - wheelR, -w/2, wheelR], 
                axel(w, axelR)
                ),
            // back axle
            translate([-l/2 + backWheelOffset + wheelR, -w/2, wheelR], 
                axel(w, axelR)
                ),
            // front wheels
            wheel(params.numSpokes, params.hubDiam, axelR, params.wheelWidth, wheelR, l/2 - frontWheelOffset - wheelR, -w),
            wheel(params.numSpokes, params.hubDiam, axelR, params.wheelWidth, wheelR, l/2 - frontWheelOffset - wheelR, w),
            // back wheels
            wheel(params.numSpokes, params.hubDiam, axelR, params.wheelWidth, wheelR, -l/2 + backWheelOffset + wheelR, -w),
            wheel(params.numSpokes, params.hubDiam, axelR, params.wheelWidth, wheelR, -l/2 + backWheelOffset + wheelR, w)
        )
    ];
}

function axel(length, radius){
    var axel = cylinder({r: radius, h:length});
    return axel.rotateX(-90);
    }

function wheel(numSpokes, hubRadius, axelR, width, radius, x, y) {
    var outside = difference(
        cylinder({r: radius, h: width}),
        cylinder({r: radius - 0.5, h: width})
    );
    var hub = cylinder({r: hubRadius, h: width});
    var spokes = [];
    for(var i = 0; i < numSpokes; i++) {
        spokes.push(rotate([0, 0, 360 / numSpokes * i], 
            translate([-0.125,-0.125, 0], 
                cube([radius, 0.25, width])
            )
        ));    
    }
    return translate([x, y, radius],
        difference(
            union(outside, hub, union(spokes)), 
            cylinder({r: axelR, h: width})
        )
    );
}

function main(params) {
  var l = params.carLength;
  var w = params.carWidth;
  var h = params.carHeight;
  var wheelR = params.wheelRadius;
  var axelR = params.axelRadius;
  var frontWheelOffset = params.frontWheelOffset;
  var backWheelOffset = params.backWheelOffset;
  var windAngle = params.windAngle;
  var windAngle2 = params.windAngle2;
  if(axelR >= params.hubRadius) {
      axelR = params.hubRadius - 0.25
  }
    var carChasis = chassis(l, w, h, wheelR, axelR, frontWheelOffset, backWheelOffset, windAngle, windAngle2);
    return (carChasis);
}
