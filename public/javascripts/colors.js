var Colors = {};

Colors.nUniqueHslColors = function(n){
    var baseHues;

    function hues(n){
        var ratio;
        var hs = [];
        var prev=0;

        if(n < 10){return [0, 55, 100, 225, 300]}
        if(n < 15){
            ratio = .4
        } else if(n > 15){
            ratio = .32
        }
        var step = 300/(ratio*n);
        for(var p = 0; prev < 300; p++){
            prev = p*step;
            hs.push(prev);
        }

        return hs;
    }


    function lightness(i, n){
        var stepSize = 5+(100 / baseHues.length);
        var l = 50;
        var delta;

        if(i >= baseHues.length){
            var step = Math.floor(i/baseHues.length);
            delta = step*stepSize;
            if(step % 2 == 0){
                delta = -delta;
            }
            l += delta;
        }

        return l;
    }

    function saturation(i, n){
        var stepSize = (100 / n / baseHues.length);
        var l = 100;

        if(i > baseHues.length){
            var step = Math.floor(i/baseHues.length);
            l -= step*stepSize;
        }

        return l;
    }

    function nextHslColor(i, n){
        var color = {h: 0, s: 100, l: 50};
        var hueIndex = i % baseHues.length;
        color.h = baseHues[hueIndex];
        color.l = lightness(i, n);
        color.s = saturation(i,n);
        color.text = textColor(color);
        return color;
    }

    function textColor(color){
        if(true){}

    }

    return (function nUniqueHsl(n){
        baseHues = hues(n);

        var colors = [];

        for (var i = 0; i < n; i++){
            var color = nextHslColor(i, n);
            colors.push(color);
        }

        return colors;
    })(n);
};