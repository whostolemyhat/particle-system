var Utility = {
    randomNumber: function(min, max) {
        return min + Math.random() * (max - min);
    },

    // hex = colour, lum = % lighter
    // eg alterShade('#69c', 0.2) = '#7ab8f5': 20% lighter
    // also accepts negative lum values
    alterShade: function(hex, lum) {
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
    },

    // utility
    getMouseClick: function(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
};
