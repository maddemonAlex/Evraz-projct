function activateVent(id, dotId, svgId, temp) {
    document.getElementById(id).classList.add('vent-control-active')
    document.getElementById(dotId).classList.add('dot-active')
    document.getElementById(svgId).classList.add('svg-active')
    document.getElementById(id).classList.remove('vent-control-accident')
    document.getElementById(id).classList.remove('vent-control-service')
}

function accident(id, dotId, svgId) {
    document.getElementById(id).classList.add('vent-control-accident')
    document.getElementById(dotId).classList.add('dot-accident')
    document.getElementById(svgId).classList.add('svg-accident')
    document.getElementById(id).classList.remove('vent-control-active')
}

function service(id, dotId, svgId) {
    document.getElementById(id).classList.add('vent-control-service')
    document.getElementById(dotId).classList.add('dot-service')
    document.getElementById(svgId).classList.add('svg-service')
    document.getElementById(id).classList.remove('vent-control-active')
    document.getElementById(id).classList.remove('vent-control-accident')
}


function moveTo(targetNumber, time, id, dotId) {
    const el = document.getElementById(id)
    let interval = setInterval(gMoneyU1, time);
    let curentTemp = +el.innerHTML;
    const delta = targetNumber - curentTemp;

    function gMoneyU1() {
        if (delta > 0) {
        document.getElementById(dotId).classList.add('flame-control-active')
        document.getElementById(dotId).classList.remove('flame_control')
    }
        curentTemp += (delta / time);
        if (delta > 0 && curentTemp >= targetNumber) {
            curentTemp = targetNumber;
            console.log(9999)
            document.getElementById(dotId).classList.add('flame_control')
            document.getElementById(dotId).classList.remove('flame_control-active')
            clearInterval(interval)
        }
        if (delta < 0 && curentTemp <= targetNumber) {
            curentTemp = targetNumber;
            clearInterval(interval)
        }
        el.innerHTML = curentTemp.toFixed(1);

    }
}

moveTo(30, 100, 'temp3', 'flame3')

activateVent('П1', "dot1", "svg1")
accident('П3', 'dot3', 'svg3')
service("П2", 'dot2', 'svg2')
