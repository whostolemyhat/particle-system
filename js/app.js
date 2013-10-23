var ctx;
var canvas;

// begin particle system (controller)
var particles = [];


// boring
function createBasicExplosion(x, y) {
    // add 4 particles; scatter at 0, 90, 180 and 270 deg
    for(var angle = 0; angle < 360; angle += 90) {
        var particle = new Particle();
        particle.x = x;
        particle.y = y;
        particle.colour = '#f00';

        var speed = 50;
        particle.velocityX = speed * Math.cos(angle * Math.PI / 180);
        particle.velocityY = speed * Math.sin(angle * Math.PI / 180);

        particles.push(particle);
    }
}

function createExplosion(x, y, colour) {
    var minSize = 3;
    var maxSize = 18;
    var count = 20;
    var minSpeed = 70;
    var maxSpeed = 280;
    var minScaleSpeed = 2;
    var maxScaleSpeed = 6;

    for(var angle = 0; angle < 360; angle += Math.round(360/count)) {
        var particle = new Particle();
        particle.x = x;
        particle.y = y;
        particle.radius = randomNumber(minSize, maxSize);
        particle.colour = alterShade(colour, parseFloat(randomNumber(-1, 1)).toFixed(2));
        particle.scaleSpeed = randomNumber(minScaleSpeed, maxScaleSpeed);

        var speed = randomNumber(minSpeed, maxSpeed);
        particle.velocityX = speed * Math.cos(angle * Math.PI / 180);
        particle.velocityY = speed * Math.sin(angle * Math.PI / 180);

        particles.push(particle);
    }
}

function randomNumber(min, max) {
    return min + Math.random() * (max - min);
}


function update(frameDelay) {
    ctx.fillStyle = '#fff';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for(var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        particle.update(frameDelay);
        particle.draw(ctx);
    }
}

// end Particle system

// utility
function getMouseClick(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.top,
        y: event.clientY - rect.left
    };
}

// RAF shim
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// hex = colour, lum = % lighter
// eg alterShade('#69c', 0.2) = '#7ab8f5': 20% lighter
// also accepts negative lum values
function alterShade(hex, lum) {
    // strip hex to make sure only numbers
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    // make sure always 6 digits
    if(hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    lum = lum || 0;

    var rgb = '#';
    var c;
    var i;
    for(i = 0; i < 3; i++) {
        // convert to decimal
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ('00' + c).substr(c.length);
    }

    return rgb;
}

// end utility


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    var mousePos = {x: canvas.width / 2, y: canvas.height / 2 }; // default pos = centre of canvas
    var colour = '#52ef1d';

    canvas.addEventListener('mousedown', function(event) {
        mousePos = getMouseClick(canvas, event);
        createExplosion(mousePos.x, mousePos.y, colour);
    }, false);
    

    var time;

    (function animloop(){
        requestAnimFrame(animloop);
        var now = new Date().getTime();
        var dt = now - (time || now);
        time = now;
        update(dt);
    })();

}

// should be in onload event
init();