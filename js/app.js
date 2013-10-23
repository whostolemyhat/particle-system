var ctx;
var canvas;


// RAF shim
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    var mousePos = {x: canvas.width / 2, y: canvas.height / 2 }; // default pos = centre of canvas
    var colour = '#52ef1d';
    var particleSystem = new ParticleSystem(ctx);

    canvas.addEventListener('mousedown', function(event) {
        mousePos = Utility.getMouseClick(canvas, event);
        particleSystem.createExplosion(mousePos.x, mousePos.y, colour);
    }, false);
    

    var time;

    (function animloop(){
        requestAnimFrame(animloop);
        var now = new Date().getTime();
        var dt = now - (time || now);
        time = now;
        particleSystem.update(dt);
    })();

}

// should be in onload event
init();