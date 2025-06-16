let rooms = {
    room1: {
        status: 'off',
        service: 'off',
        accident: 'off',
    },
    room2: {
        status: 'off',
        service: 'off',
        accident: 'off',
    },
    room3: {
        status: 'off',
        service: 'off',
        accident: 'off',
    },
};

let temps = {
    room1: 'temp2',
    room2: 'temp3',
    room3: 'temp1',
};

function power(roomName) {
    let room = rooms[roomName];
    let menuDiv = document.getElementById(`${ roomName }-menu`);
    let serviceDiv = document.getElementById(`${ roomName }-service`);
    let roomDiv = document.getElementById(roomName);

    if (room.status === 'off') {
        menuDiv.classList.add('power');
        roomDiv.src = `images/${ roomName }_pipe_on.png`;
        serviceDiv.innerText = 'Работа';
        room.status = 'on';
    }
    else {
        menuDiv.classList.remove('power');
        serviceDiv.innerText = 'Онлайн';
        roomDiv.src = `images/${ roomName }_pipe_off.png`;
        room.status = 'off';
    }
}

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
        document.getElementById(dotId).classList.add('flame_control_active')
        document.getElementById(dotId).classList.remove('flame_control')
    }
        curentTemp += (delta / time);
        if (delta > 0 && curentTemp >= targetNumber) {
            curentTemp = targetNumber;
            console.log(9999)
            document.getElementById(dotId).classList.add('flame_control')
            document.getElementById(dotId).classList.remove('flame_control_active')
            clearInterval(interval)
        }
        if (delta < 0 && curentTemp <= targetNumber) {
            curentTemp = targetNumber;
            clearInterval(interval)
        }
        el.innerHTML = curentTemp.toFixed(1);

    }
}

function roomService(roomName) {
    let room = rooms[roomName];
    let menuDiv = document.getElementById(`${ roomName }-menu`);
    let serviceDiv = document.getElementById(`${ roomName }-service`);
    let roomDiv = document.getElementById(roomName);

    if (room.service === 'off') {
        menuDiv.classList.add('service');
        menuDiv.classList.remove('accident');
        serviceDiv.innerText = 'Сервис';
        room.service = 'on';

        if (room.status === 'on') {
            roomDiv.src = `images/${ roomName }_pipe_on.png`;
        }
        else {
            roomDiv.src = `images/${ roomName }_pipe_off.png`;
        }

        if (room.accident === 'on') {
            roomAccident(roomName);
        }
    }
    else {
        menuDiv.classList.remove('service');
        serviceDiv.innerText = 'Онлайн';
        room.service = 'off';
    }
}

function increaseTemp(roomName) {
    let room = rooms[roomName];
    if (room.status === 'off') {
        return;
    }
    const currentTempDiv = document.getElementById(`${ roomName }-temp`);
    const airTempDiv = document.getElementById(`${ roomName }-air-temp`);
    const roomTempDiv = document.getElementById(`${ roomName }-room-temp`);
    const roomOnPlanDiv = document.getElementById(`${ temps[roomName] }`);

    let airTemp = +airTempDiv.innerText.split('°')[0];
    let roomTemp = +roomTempDiv.innerText.split('°')[0];
    const currentTemp = +currentTempDiv.innerText.split('°')[0];
    const newTemp = +currentTemp + 1;

    const airTempInterval = setInterval(() => {
        if (airTemp < newTemp) {
            airTemp += 1;
            airTempDiv.innerText = airTemp.toFixed(1) + '°';
        }
        else {
            clearInterval(airTempInterval);
        }
    }, 3000);

    const roomTempInterval = setInterval(() => {
        if (roomTemp < newTemp) {
            roomTemp += 1;
            roomTempDiv.innerText = roomTemp.toFixed(1) + '°';
            roomOnPlanDiv.innerText = roomTemp.toFixed(1);
        }
        else {
            clearInterval(roomTempInterval);
        }
    }, 4000);

    currentTempDiv.innerText = newTemp + '°';
}

function decreaseTemp(roomName) {
    let room = rooms[roomName];
    if (room.status === 'off') {
        return;
    }
    const currentTempDiv = document.getElementById(`${ roomName }-temp`);
    const airTempDiv = document.getElementById(`${ roomName }-air-temp`);
    const roomTempDiv = document.getElementById(`${ roomName }-room-temp`);
    const roomOnPlanDiv = document.getElementById(`${ temps[roomName] }`);

    let airTemp = +airTempDiv.innerText.split('°')[0];
    let roomTemp = +roomTempDiv.innerText.split('°')[0];
    const currentTemp = +currentTempDiv.innerText.split('°')[0];
    const newTemp = +currentTemp - 1;

    const airTempInterval = setInterval(() => {
        if (airTemp > newTemp) {
            airTemp -= 1;
            airTempDiv.innerText = airTemp.toFixed(1) + '°';
        }
        else {
            clearInterval(airTempInterval);
        }
    }, 3000);

    const roomTempInterval = setInterval(() => {
        if (roomTemp > newTemp) {
            roomTemp -= 1;
            roomTempDiv.innerText = roomTemp.toFixed(1) + '°';
            roomOnPlanDiv.innerText = roomTemp.toFixed(1);
        }
        else {
            clearInterval(roomTempInterval);
        }
    }, 4000);

    currentTempDiv.innerText = newTemp + '°';
}

function roomAccident(roomName) {
    let room = rooms[roomName];
    if (room.service === 'on') {
        return;
    }
    let menuDiv = document.getElementById(`${ roomName }-menu`);
    let serviceDiv = document.getElementById(`${ roomName }-service`);
    let roomDiv = document.getElementById(roomName);

    if (room.accident === 'off') {
        menuDiv.classList.add('accident');
        roomDiv.src = `images/${ roomName }_pipe_on.png`;
        serviceDiv.innerText = 'Авария';
        room.accident = 'on';
    }
    else {
        menuDiv.classList.remove('accident');
        roomDiv.src = `images/${ roomName }_pipe_off.png`;
        serviceDiv.innerText = 'Сервис';
        room.accident = 'off';
    }
}
