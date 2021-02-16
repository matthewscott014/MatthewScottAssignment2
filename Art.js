"use strict";

var gl;
var points;
let colors;

window.onload = function init()
{
    
    let canvas = document.getElementById( "gl-canvas" );
    gl = canvas.getContext('webgl2');
    
    
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }
    
    colors = [];
    
    let color1 = vec3(250, 0, 0);
    let color2 = vec3(10, 180, 0);

    colors.push(color1);
    colors.push(color1);
    colors.push(color1);

    colors.push(color2);
    colors.push(color2);
    colors.push(color2);

    colors.push(color1);
    colors.push(color1);
    colors.push(color1);

    colors.push(color2);
    colors.push(color2);
    colors.push(color2);

    colors.push(color1);
    colors.push(color1);
    colors.push(color1);

    colors.push(color2);
    colors.push(color2);
    colors.push(color2);

     points = new Float32Array([
         -0.1, -0.1 ,
          0,  0.1 ,
          0.1, -0.1 ,
          
          0.7, 0.1 ,
          0.1, 0.7 ,
          -0.3, 0.5 ,

          -1, -1,
          -0.5, -0.3,
          -0.2, -0.5,

          -1, 1,
          -0.5, 0.8,
          -0.7, 0.4,

          1, -1,
          0.8, 0.1,
          0.5, -0.3,

          0.3, -0.8,
          0, -0.3,
          -0.2, -0.4,
         
         
        ]);


    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 0.9, 0.9, 1.0 );


    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
   
    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, points, gl.STATIC_DRAW );


    var aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( aPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( aPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 18 );
}
