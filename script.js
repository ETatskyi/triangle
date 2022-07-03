let btn, canvas, sideA, sideB, sideC;

window.onload = function () {
    btn = document.querySelector(".build");
    canvas = document.querySelector("#canvas");
    btn.addEventListener("click", build);
}


function parse() {
    sideA = parseInt(document.querySelector("#side-a").value);
    sideB = parseInt(document.querySelector("#side-b").value);
    sideC = parseInt(document.querySelector("#side-c").value);
}


function build() {
    parse()
    clearCanvas()
    if (check(sideA, sideB, sideC)) { drawTriangle(calcTriangle(sideA, sideB, sideC)) } else { error() }
    // console.log(check(sideA, sideB, sideC))
    //error()
}

function clearCanvas() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.classList.remove("error");
}

function error() {
    canvas.classList.add("error");
}

function check(a, b, c) {
    return !(a + b <= c || a + c <= b || b + c <= a)
}

function calcTriangle(a, b, c) {
    const biggest = Math.max(...arguments)
    const cof = canvas.width * 0.8 / biggest;
    a *= cof;
    b *= cof;
    c *= cof;

    let AX = 0; let AY = 0;
    let BX = a; let BY = 0;
    let CX = (a * a - c * c + b * b) / 2 / a; let CY = Math.sqrt(b * b - CX * CX);
    console.log("a=" + a + ";" + "b=" + b + ";" + "c=" + c + ";")
    console.log(AX + "," + AY);
    console.log(BX + "," + BY);
    console.log(CX + "," + CY);

    // console.log("fix" + fixX + "," + fixY);

    if (CX < 0) {
        AX -= CX;
        BX -= CX;
        CX = 0;
    }
    return { aX: AX, aY: AY, bX: BX, bY: BY, cX: CX, cY: CY }
}

function drawTriangle(arg) {
    console.log(arg)
    const ctx = canvas.getContext('2d');
    const fixX = canvas.width * 0.1;
    const fixY = canvas.height - canvas.height * 0.1;

    ctx.beginPath();
    ctx.moveTo(fixX + arg.aX, fixY - arg.aY);
    ctx.lineTo(fixX + arg.bX, fixY - arg.bY);
    ctx.lineTo(fixX + arg.cX, fixY - arg.cY);
    ctx.lineTo(fixX + arg.aX, fixY - arg.aY);
    ctx.stroke();
}