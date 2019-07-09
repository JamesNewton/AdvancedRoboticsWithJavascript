function getParameterDefinitions() {
    return [
        { name: 'carLength', type: 'int', initial: 43, caption: 'Length?' }, 
        { name: 'carWidth', type: 'int', initial: 20, caption: 'Width?' },
        { name: 'carHight', type: 'int', initial: 18, caption: 'Hight?' },
        { name: 'wheelRadius', type: 'int', initial: 4, caption: 'Wheel radius?' },
        { name: 'hubRadius', type: 'int', initial: 3, caption: 'Hub radius?' },
        { name: 'frontWheelOffset', type: 'int', initial: 3, caption: 'Front wheel offset?' },
        { name: 'backWheelOffset', type: 'int', initial: 3, caption: 'Back wheel offset?' },
    ];
}

function chassis(l, w, h, wheelR, hubR, frontWheelOffset, backWheelOffset) {
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
                )
            ),
        translate([l/2 - frontWheelOffset - wheelR, -w/2, wheelR], 
            axel(w,hubR)
            )
        )
    ]
}
function axel(length, diameter){
    var axel = cylinder({r:diameter/2, h:length})
    return axel.rotateX(-90)
    }

function main(params) {
  var l = params.carLength;
  var w = params.carWidth;
  var h = params.carHight;
  var wheelR = params.wheelRadius;
  var hubR = params.hubRadius;
  var frontWheelOffset = params.frontWheelOffset;
  var backWheelOffset = params.backWheelOffset;
  //return (translate([-l/2,-w/2,0],cube([l,w,h])));
    //return (translate(l/2 - frontWheelOffset - wheelR, w/2, wheelR, rotate([90,0,0], cylinder({r: wheelR + 1, h: 10}))));
    var carChasis = chassis(l, w, h, wheelR, hubR, frontWheelOffset, backWheelOffset);
    return (carChasis );
    
}