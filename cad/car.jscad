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
        {name: 'carLength', type: 'int', initial: 150, min: 0, max: 9999, caption: 'Length of the car'}, 
        {name: 'carWidth', type: 'int', initial: 80, min: 0, max: 9999, caption: 'Width of the car'},
        {name: 'carHeight', type: 'int', initial: 50, min: 0, max: 9999,caption: 'Height of the car'},
        {name: 'frontAngle', type: 'int', initial: 45, min: 0, max: 80, caption: 'Front decline angle'},
        {name: 'backAngle', type: 'int', initial: 30, min: 0, max: 80, caption: 'Back decline angle'},
        {name: 'frontWheelOffset', type: 'int', initial: 3, min: 0, max: 9999,caption: 'Offset for the front wheel'},
        {name: 'backWheelOffset', type: 'int', initial: 3, min: 0, max: 9999,caption: 'Offset for the back wheel'},
        {name: 'axelRadius', type: 'float', initial: 10, min: 0, max: 9999,caption: 'Radius of the axel'},
        {name: 'wheelRadius', type: 'int', initial: 25, min: 0, max: 9999,caption: 'Radius of the wheel'},
        {name: 'grooveDepth', type: 'float', initial: 5, min: 0, max: 9999,caption: 'Depth of the wheel\'s groove'},
        {name: 'numSpokes', type: 'int', initial: 8, min: 0, max: 9999,caption: 'Number of spokes'}, 
        {name: 'hubRadius', type: 'float', initial: 7.5, min: 0, max: 9999,caption: 'Radius of the wheel hub'},
        {name: 'wheelWidth', type: 'int', initial: 10, min: 0, max: 9999,caption: 'Width of the wheel'},
        {name: 'servoCenterToTopDist', type: 'int', initial: 6, min: 0, max: 9999, caption: 'Center of servo to top?' },
        {name: 'servoCenterToLeftDist', type: 'int', initial: 5, min: 0, max: 9999, caption: 'Center of servo to left?' },
        {name: 'servoCenterToRightDist', type: 'int', initial: 17, min: 0, max: 9999, caption: 'Center of servo to right?' }
    ];
}

function body(length, width, height) {
    return translate([0, width / 2, height / 2],
        rotate([0, 90, 0],
            union(
                translate([0, 0, width / 4],
                    cylinder({r: width / 2, h: length - (width / 2)})
                ),
                translate([0, 0, length - (width / 4)],
                    sphere({r: width / 2})
                ),
                translate([0, 0, width / 4],
                    sphere({r: width / 2})
                )
            )
        )
    );
}

function chassis(length, width, height, wheelRadius, axelRadius, frontWheelOffset, backWheelOffset, frontAngle, backAngle, servoCenterToRightDist, servoCenterToTopDist, servoCenterToLeftDist) {
    return [
    difference(
        union(
            difference(
                translate([-length / 2, -width / 2, wheelRadius],
                    body(length, width, height)
                ),
                // scoop out front wheel wells
                translate([length / 2 - frontWheelOffset - wheelRadius, width / 2, wheelRadius], 
                    rotate([90, 0, 0],
                        cylinder({r: wheelRadius + 1, h: 3})
                    )
                ),
                translate([length / 2 - frontWheelOffset - wheelRadius, -width / 2, wheelRadius], 
                    rotate([90, 0, 0], 
                        cylinder({r: wheelRadius + 1, h: -3})
                    )
                ),
                // scoop out back wheel wells
                translate([-length / 2 + backWheelOffset + wheelRadius, width / 2, wheelRadius], 
                    rotate([90, 0, 0],
                        cylinder({r: wheelRadius + 1, h: 3})
                    )
                ),
                translate([-length / 2 + backWheelOffset + wheelRadius, -width / 2, wheelRadius], 
                    rotate([90, 0, 0], 
                        cylinder({r: wheelRadius + 1, h: -3})
                    )
                ),
                // cut off front windsheld
                translate([length / 2, -width / 2, wheelRadius * 2], 
                    rotate([0, -frontAngle, 0], 
                        translate([0, 0, -height * 1.5],
                            cube([length, width, height * 4])
                        )
                    )
                ),
                // cut off back windsheld
                translate([-length / 2, -width / 2, wheelRadius * 2], 
                    rotate([0, backAngle, 0], 
                        translate([0, 0, -height *1.5],
                            cube([-length, width, height * 4])
                        )
                    )
                ),
// cut out space for electroinics
            translate([-length/2 + backWheelOffset, -width / 2 + 3, wheelRadius], 
                rotate([45,0,0],
                    cube([length - (backWheelOffset + frontWheelOffset),Math.sqrt(Math.pow((width - 6),2)/2),-Math.sqrt(Math.pow((width - 6),2)/2)]))
                ),
            translate([-length/2 + backWheelOffset, -width / 2 + 3, 0], 
                    cube([length - (backWheelOffset + frontWheelOffset),width - 6, wheelRadius])
                ),
//make space for bord
            translate([-length/2 + backWheelOffset, -width / 2 + 5, wheelRadius],
                    cube([length - (backWheelOffset + frontWheelOffset), width - 10,5])
                ),
                //take out the bottom
                translate([-length, -width, -wheelRadius],
                    cube([length * 2, width * 2, wheelRadius * 1.75])
                )
            ),

            // front axle
            translate([length / 2 - frontWheelOffset - wheelRadius, -width / 2, wheelRadius], 
                axel(width, axelRadius)
                ),
            // front wheels
            wheel(params.numSpokes, params.hubRadius, axelRadius, params.wheelWidth, wheelRadius, params.grooveDepth, length / 2 - frontWheelOffset - wheelRadius, -width),
            wheel(params.numSpokes, params.hubRadius, axelRadius, params.wheelWidth, wheelRadius, params.grooveDepth, length / 2 - frontWheelOffset - wheelRadius, width),
            // back wheels
            wheel(params.numSpokes, params.hubRadius, axelRadius, params.wheelWidth, wheelRadius, params.grooveDepth, -length / 2 + backWheelOffset + wheelRadius, -width),
            wheel(params.numSpokes, params.hubRadius, axelRadius, params.wheelWidth, wheelRadius, params.grooveDepth, -length / 2 + backWheelOffset + wheelRadius, width)
        ),
 // servo space
        translate([-length/2 + backWheelOffset + (wheelRadius - servoCenterToLeftDist), -width/2 + 3,wheelRadius + 3], 
            cube([servoCenterToRightDist + servoCenterToLeftDist,width-6,-servoCenterToTopDist])
        ),
        translate([-length/2 + backWheelOffset + (wheelRadius - servoCenterToLeftDist), -width/2 + 5,wheelRadius + 3], 
            cube([servoCenterToRightDist + servoCenterToLeftDist + 4,width-10,-servoCenterToTopDist])
        )
        )
    ];
}

function axel(length, radius){
    var axel = cylinder({r: radius, h: length});
    return axel.rotateX(-90);
    }

function wheel(numSpokes, hubRadius, axelRadius, width, radius, grooveDepth, x, y) {
    var outside = difference(
        cylinder({r: radius, h: width}),
        cylinder({r: radius - (grooveDepth * 1.5), h: width}),
        translate([0, 0, width / 4],
            difference(
                cylinder({r: radius, h: width / 2}),
                cylinder({r: radius - grooveDepth, h: width / 2})
            )
        )
    );
    var hub = cylinder({r: hubRadius, h: width});
    var spokes = [];
    for(var i = 0; i < numSpokes; i++) {
        spokes.push(rotate([0, 0, 360 / numSpokes * i], 
            translate([-0.125, -0.125, 0], 
                cube([radius, 0.25, width])
            )
        ));    
    }
    return translate([x, y, 0],
        difference(
            union(outside, hub, union(spokes)), 
            cylinder({r: axelRadius, h: width}),
            translate([0, 0, width / 4],
                difference(
                    cylinder({r: radius, h: width / 2}),
                    cylinder({r: radius - grooveDepth, h: width / 2})
                )
            )
        )
    );
}

function main(params) {
    var length = params.carLength;
    var width = params.carWidth;
    var height = params.carHeight;
    var wheelRadius = params.wheelRadius;
    var axelRadius = params.axelRadius;
    var frontWheelOffset = params.frontWheelOffset;
    var backWheelOffset = params.backWheelOffset;
    var frontAngle = params.frontAngle;
    var backAngle = params.backAngle;
    if(axelRadius >= params.hubRadius) {
        axelRadius = params.hubRadius - 0.25
        }
    var servoCenterToRightDist = params.servoCenterToRightDist;
    var servoCenterToLeftDist = params.servoCenterToLeftDist;
    var servoCenterToTopDist = params.servoCenterToTopDist;
    var carChasis = chassis(length, width, height, wheelRadius, axelRadius, frontWheelOffset, backWheelOffset, frontAngle, backAngle, servoCenterToRightDist, servoCenterToTopDist, servoCenterToLeftDist);
    return (carChasis);
    
}
