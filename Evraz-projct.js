function activateVent(id, dotId ){
    document.getElementById(id).classList.add('vent-control-active')
    document.getElementById(dotid).classList.add('dot_active')
    document.getElementById(id).classList.remove('vent-control-accident')
}


activateVent('П1')
activateVent('П3')