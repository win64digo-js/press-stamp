window.onload = $("body").hide().fadeIn(2000);

$("#drawGraphicsId").click(function () {
    window.open('ellipseGraph.html', '', "width=705,height=800");
});
$("#infoId").click(function () {
    window.open('zInfoEllipse.html', '', "width=700,height=800");
});

////////////////////////////////////////////////////////// - stupidity
$("input[name='a1']").keyup(function() {
    window.a1 = $(this).val();
}).keyup();

$("input[name='b1']").keyup(function() {
    window.b1 = $(this).val();
}).keyup();

$("input[name='a2']").keyup(function() {
    window.a2 = $(this).val();
}).keyup();

$("input[name='b2']").keyup(function() {
    window.b2 = $(this).val();
}).keyup();

$("input[name='R1']").keyup(function() {
    window.R1 = $(this).val();
}).keyup();

$("input[name='R2']").keyup(function() {
    window.R2 = $(this).val();
}).keyup();

$("input[name='LR1']").keyup(function() {
    window.lr1 = $(this).val();
}).keyup();

$("input[name='LR2']").keyup(function() {
    window.lr2 = $(this).val();
}).keyup();

$("input[name='angleF']").keyup(function() {
    window.angleF = $( this ).val();
}).keyup();
//////////////////////////////////////////////////////////

$("#fillDataEllipseID").click(function () {
    $("input[name='a1']").val(21);
    $("input[name='b1']").val(17);
    $("input[name='a2']").val(25);
    $("input[name='b2']").val(15);
    $("input[name='R1']").val(70);
    $("input[name='R2']").val(80);
    $("input[name='LR1']").val(30);
    $("input[name='LR2']").val(35);
    $("input[name='angleF']").val(45);

    a1 = $("input[name='a1']").val();
    b1 = $("input[name='b1']").val();
    a2 = $("input[name='a2']").val();
    b2 = $("input[name='b2']").val();
    R1 = $("input[name='R1']").val();
    R2 = $("input[name='R2']").val();
    lr1 = $("input[name='LR1']").val();
    lr2 = $("input[name='LR2']").val();
    angleF = $("input[name='angleF']").val();

    //local storage write vars
    localStorage.setItem("ellipseLsA1", 21);
    localStorage.setItem("ellipseLsB1", 17);
    localStorage.setItem("ellipseLsA2", 25);
    localStorage.setItem("ellipseLsB2", 15);
    localStorage.setItem("ellipseLsR1", 70);
    localStorage.setItem("ellipseLsR2", 80);
    localStorage.setItem("ellipseLsLR1", 30);
    localStorage.setItem("ellipseLsLR2", 35);
    localStorage.setItem("ellipseLsAngleF", 45);
    //local storage write vars
});

$("#saveEllipseGraphID").click(function () {
    var today = new Date();
    var date = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var fullTime = "-date" + date + "-time" + time;

    var graph = document.getElementById("coordinateSystemId");
    graph.toBlob(function(blob) {
        saveAs(blob, "graphEllipse" + fullTime + ".png");
    });

    var inputData = $("#outputDataEllipseID").text();
    var text = new Blob([inputData], {type: "text/plain;charset=utf-8"});
    saveAs(text, "dataEllipse" + fullTime + ".txt");

    sweetAlert("Saved", "to file", "success");
});

$("#idDataEllipse input").keydown(function(event) {
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 127 || event.keyCode == 9) {
    }
    else {
        if (event.keyCode < 48 || event.keyCode > 57 ) {
            sweetAlert("Input allow only numbers", "ERROR", "error");
        }
    }

});

function coordinates(x) {
    var f, f1, f2, f1A, f1B, f1C, fi, fInt;

    fi = ((angleF * Math.PI) / 180);

    var sinFi = Math.sin(fi);
    var cosFi = Math.cos(fi);

    f1A = (sinFi / a1) * (sinFi / a1) + (cosFi / b1) * (cosFi / b1);

    f1B = -( (2 * cosFi * (sinFi * (x - lr1 * cosFi) + lr1 * cosFi * sinFi)) / (b1 * b1) ) -
        ( (2 * sinFi * (lr1 * Math.pow(sinFi, 2) - cosFi * (x - lr1 * cosFi))) / (a1 * a1) );

    f1C = Math.pow(sinFi * (x - lr1 * cosFi) + lr1 * cosFi * sinFi, 2) / (b1 * b1) + Math.pow(lr1 * sinFi * sinFi - cosFi * (x - lr1 * cosFi), 2) / (a1 * a1) - 1;

    f1 = (-f1B - Math.pow((f1B * f1B - 4 * f1A * f1C), 1 / 2)) / (2 * f1A);

    f2 = Math.pow(1 - Math.pow((x - lr2) / a2, 2), 1 / 2) * b2;

    f = f1 - f2;

    fInt = f2 - f1;

    return {
        f1: f1,
        f2: f2,
        f: f,
        fInt: fInt
    };
}

$('#idCalculateArea').click(function () {

    window.counterInputs = 0;
    window.diapasonCounter = 0;
    $("#idDataEllipse input").each(function(){
        if( $(this).val() != ''){
            counterInputs += 1;
        }
        if($(this).val() < 120 && $(this).val() > 10) {
            diapasonCounter += 1;
        }
    });
    if(counterInputs != 9){
        sweetAlert("Some fields is empty, please correct it.", "ERROR", "error")
    }
    else if (diapasonCounter != 9) {
        sweetAlert("Wrong diapason", "ERROR", "error");
    }
    else {

        //local storage write vars
        localStorage.setItem("ellipseLsA1", a1);
        localStorage.setItem("ellipseLsB1", b1);
        localStorage.setItem("ellipseLsA2", a2);
        localStorage.setItem("ellipseLsB2", b2);
        localStorage.setItem("ellipseLsR1", R1);
        localStorage.setItem("ellipseLsR2", R2);
        localStorage.setItem("ellipseLsLR1", lr1);
        localStorage.setItem("ellipseLsLR2", lr2);
        localStorage.setItem("ellipseLsAngleF", angleF);
        //local storage write vars

    var result;
    var h = R1/10000;
        /////////////////////////////////////////
        var x1 = 0;
        var MIN = 0.1;
        var xt1 = x1;
        var eps1;

        while (x1 <= R1 / 2 && MIN > 0.0001) {
            try {
                result = coordinates(x1);
                eps1 = Math.abs(result.f);
                if (eps1 < MIN) {
                    MIN = eps1;
                    xt1 = x1;
                }
                x1 += h;
            }
            catch (err) {
                x1 += h;
            }
        }
        ////////////////////////////////////////
        var x2 = x1 + MIN;
        var MIN2 = 0.1;
        var xt2 = x2;
        var eps2;

        while (x2 <= R1) {
            try {
                result = coordinates(x2);
                eps2 = Math.abs(result.f);
                if (eps2 < MIN2) {
                    MIN2 = eps2;
                    xt2 = x2;
                }
                x2 += h;
            }
            catch (err) {
                x2 += h;
            }
        }
        ////////////////////////////////////////
    var x1Intersecting, y1Intersecting,
        x2Intersecting, y2Intersecting;
    result = coordinates(xt1);
        x1Intersecting = xt1;
        y1Intersecting = result.f2;
    $("output[name='x1']").empty().text(xt1.toFixed(3));
    $("output[name='y1']").empty().text(result.f2.toFixed(3));
    result = coordinates(xt2);
        x2Intersecting = xt2;
        y2Intersecting = result.f2;
    $("output[name='x2']").empty().text(xt2.toFixed(3));
    $("output[name='y2']").empty().text(result.f2.toFixed(3));
    ////////////////////////////////////////
    var a, b, n, step,SAreaIntegral;
    var nArray = new Array(100);

    a = parseFloat($("output[name='x1']").text());
    b = parseFloat($("output[name='x2']").text());
    n = 100;
    step = (b-a)/n;
    nArray[0] = a;
    result = coordinates(nArray[0]);
    SAreaIntegral = result.fInt;

    for(var i=1; i<n; i++) {
        nArray[i] = nArray[i-1] + step;
        result = coordinates(nArray[i] + step/2);
        SAreaIntegral = SAreaIntegral + result.fInt;
    }

    SAreaIntegral = SAreaIntegral * step;
    ///////////////////////////////////////
    var SAreaEllipse1 = Math.PI * a1 * b1;
    var KAreaEllipse1 = SAreaIntegral / SAreaEllipse1;

    $("output[name='Si']").empty().text(SAreaIntegral.toFixed(3));
    $("output[name='Ki']").empty().text(KAreaEllipse1.toFixed(3));

    sweetAlert("Результат",
        "Координаты точек пересечения:\n" +
        "(x1, y1) = " + "(" + x1Intersecting.toFixed(3) + ", " + y1Intersecting.toFixed(3) + ")\n" +
        "(x2, y2) = " + "(" + x2Intersecting.toFixed(3) + ", " + y2Intersecting.toFixed(3) + ")\n" +
        "Площадь пересечения отверстий (эллипсов) Si = " + SAreaIntegral.toFixed(3) + "\n" +
        "Коэффициент перекрытия Ki= " + KAreaEllipse1.toFixed(3),
        "success"
    );
    //////////////////////////////////////////////////////////////
        //clear canvas
        myGraph.clearCanvas();

        //upper plate 1
        myGraph.drawCircle(function(){}, 0, 0, R1, "#098d70", 5);
        //lower plate 2
        myGraph.drawCircle(function(){}, 0, 0, R2, "#ff2900", 5);

        /* x,y - coordinates of circle
        x0, y0 - coordinates of dot on circle
        x1, y1 - coordinates of dot on circle rotated
        angle - rotating angle of dot on circle

        rx = x0 - x;
        ry = y0 - y;
        cos = Math.cos(angleF * Math.PI / 180);
        sin = Math.sin(angleF * Math.PI / 180);
        x1 = x + rx * cos - ry * sin;
        y1 = y + rx * sin + ry * cos; */

        //default position of ellipse 1 on upper ROTATING plate 1
        var rx = lr1 - 0,
            ry = 0,
            c = Math.cos(angleF * Math.PI / 180),
            s = Math.sin(angleF * Math.PI / 180),
            x1 = rx * c - ry * s,
            y1 = rx * s + ry * c;
        myGraph.drawEllipse(function(){}, x1, y1, a1, b1, angleF, 'green', 1, "#098d70", 0.3);
        //default position of ellipse 2 on lower FIXED plate 2
        myGraph.drawEllipse(function(){}, lr2, 0, a2, b2, 0, 'red', 1, "#ff2900", 0.3);

        //radius from R1 ro ellipse 1
        myGraph.drawLine(function(){}, 0, 0, x1, y1, 'green', 1);

        myGraph.drawCoordinate(function(){}, x1Intersecting, y1Intersecting, 1.3, 1.3);
        myGraph.drawCoordinate(function(){}, x2Intersecting, y2Intersecting, 1.3, 1.3);

        // reDraw coordinate system in max lvl
        myGraph.drawXAxis();
        myGraph.drawYAxis();
        myGraph.drawText(function(){}, "Y", -20, -90);
        myGraph.drawText(function(){}, "X", 90, 15);

    }
});
