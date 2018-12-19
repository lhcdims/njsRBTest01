var rpio = require('rpio');

/*
 * Set the initial state to low.  The state is set prior to the pin
 * being actived, so is safe for devices which require a stable setup.
 */
rpio.open(12, rpio.OUTPUT, rpio.LOW);
rpio.open(16, rpio.OUTPUT, rpio.LOW);
rpio.open(18, rpio.OUTPUT, rpio.LOW);
rpio.open(22, rpio.OUTPUT, rpio.LOW);

/*
 * The sleep functions block, but rarely in these simple programs does
 * one care about that.  Use a setInterval()/setTimeout() loop instead
 * if it matters.
 */
for (var i = 0; i < 1; i++) {
        /* On for 1 second */
        rpio.write(12, rpio.LOW);
        rpio.write(16, rpio.HIGH);
        rpio.write(18, rpio.LOW);
        rpio.write(22, rpio.HIGH);
        rpio.sleep(5);

        /* Off for half a second (500ms) */
        rpio.write(12, rpio.LOW);
        rpio.write(16, rpio.LOW);
        rpio.write(18, rpio.LOW);
        rpio.write(22, rpio.LOW);
        rpio.msleep(1000);
}

