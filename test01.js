var rbCode = "ken";

var Robot = require('./robot');


var io = require('socket.io-client');
var socketPort = '10533';
var socketUrl = 'http://thisapp.zephan.top:' + socketPort;
var client = io.connect(socketUrl, {reconnect: true});

// Add a connect listener
client.on('connect', function (socket) {

    console.log('Connected to RB server, rbCode: ' + rbCode);

    client.on('serverNeedRBCode', function () {
        console.log('Sent rb code to server: ' + rbCode);
        client.emit('updateRBCode', rbCode);
    });

    client.on('moveRobot', function (aryRBMoveRobot) {
        console.log('moveRobot: ' + aryRBMoveRobot[1].toString() + ' , ' + aryRBMoveRobot[2].toString());
        rb.funMoveRobot(aryRBMoveRobot[0], aryRBMoveRobot[1], aryRBMoveRobot[2], aryRBMoveRobot[3]);
    });

});
//client.emit('CH01', 'me', 'test msg');



/*
 * Set the initial state to low.  The state is set prior to the pin
 * being actived, so is safe for devices which require a stable setup.
 */
var rb = new Robot();
rb.funInit();



/*
 * The sleep functions block, but rarely in these simple programs does
 * one care about that.  Use a setInterval()/setTimeout() loop instead
 * if it matters.
 */

//rb.funMoveRobot('S', 1, 1, 1);
//setTimeout(function() {
//    rb.funMoveRobot('S', -1, -1, 1);
//}, 2000);
//rb.funMoveMotor(0, 'S', 1, 1);

