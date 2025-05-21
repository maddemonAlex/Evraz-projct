function activateVent(id, dotId,svgId ){
    document.getElementById(id).classList.add('vent-control-active')
    document.getElementById(dotId).classList.add('dot-active')
    document.getElementById(svgId).classList.add('svg-active')
    document.getElementById(id).classList.remove('vent-control-accident')
}
function accident(id, dotId,svgId ){
    document.getElementById(id).classList.add('vent-control-accident')
    document.getElementById(dotId).classList.add('dot-accident')
    document.getElementById(svgId).classList.add('svg-accident')
    document.getElementById(id).classList.remove('vent-control-active')
}
function service(id, dotId,svgId ){
    document.getElementById(id).classList.add('vent-control-service')
    document.getElementById(dotId).classList.add('dot-service')
    document.getElementById(svgId).classList.add('svg-service')
    document.getElementById(id).classList.remove('vent-control-active')
}
activateVent('П1',"dot1","svg1")
accident('П3','dot3','svg3')
