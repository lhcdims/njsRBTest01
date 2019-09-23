var rpio = require('rpio');

class Robot {
    constructor() {
        this.intNoOfMotor = 2;
        this.aryMotor = [];
    }

    funInit() {
        this.aryMotor.push({strLR: "R", intDir: 1, intPin0: 12, intPin1: 16});  
        this.aryMotor.push({strLR: "L", intDir: -1, intPin0: 18, intPin1: 22});   

        for (let i = 0; i < this.intNoOfMotor; i++) {
            rpio.open(this.aryMotor[i].intPin0, rpio.OUTPUT, rpio.LOW);
            rpio.open(this.aryMotor[i].intPin1, rpio.OUTPUT, rpio.LOW);
        }
    }

    funMoveMotor(intMotorNo, strAction, intDir, intValue) {
        let intCalMotorDir = 0;
        switch (strAction) {
            case 'S':
                intCalMotorDir = intDir * this.aryMotor[intMotorNo].intDir;
                if (intCalMotorDir == 1) {
                    rpio.write(this.aryMotor[intMotorNo].intPin0, rpio.LOW);
                    rpio.write(this.aryMotor[intMotorNo].intPin1, rpio.HIGH);
                } else if (intCalMotorDir == 0) {
                    rpio.write(this.aryMotor[intMotorNo].intPin0, rpio.LOW);
                    rpio.write(this.aryMotor[intMotorNo].intPin1, rpio.LOW);
                } else {
                    rpio.write(this.aryMotor[intMotorNo].intPin0, rpio.HIGH);
                    rpio.write(this.aryMotor[intMotorNo].intPin1, rpio.LOW);
                }
                // I dont know why, after setTimeout, this.aryMotor becomes undefined
                // However, let a array can solve this problem...
                let aryStopMotor = this.aryMotor;
                setTimeout(function() {
                    rpio.write(aryStopMotor[intMotorNo].intPin0, rpio.LOW);
                    rpio.write(aryStopMotor[intMotorNo].intPin1, rpio.LOW);
                }, intValue * 1000);
                break;
            case 'F':
                intCalMotorDir = intDir * this.aryMotor[intMotorNo].intDir;
                if (intCalMotorDir == 1) {
                    rpio.write(this.aryMotor[intMotorNo].intPin0, rpio.LOW);
                    rpio.write(this.aryMotor[intMotorNo].intPin1, rpio.HIGH);
                } else if (intCalMotorDir == 0) {
                    rpio.write(this.aryMotor[intMotorNo].intPin0, rpio.LOW);
                    rpio.write(this.aryMotor[intMotorNo].intPin1, rpio.LOW);
                } else {
                    rpio.write(this.aryMotor[intMotorNo].intPin0, rpio.HIGH);
                    rpio.write(this.aryMotor[intMotorNo].intPin1, rpio.LOW);
                }           
                break;
            default:
                break;
        }
    }

    funMoveRobot(strAction, intLeft, intRight, intValue) {
        for (let i = 0; i < this.intNoOfMotor; i++) {
            if (this.aryMotor[i].strLR == "L") {
                this.funMoveMotor(i, strAction, intLeft, intValue);
            } else {
                this.funMoveMotor(i, strAction, intRight, intValue);
            }
        }
    }

    funStopMotor(intMotorNo) {
        rpio.write(this.aryMotor[intMotorNo].intPin0, rpio.LOW);
        rpio.write(this.aryMotor[intMotorNo].intPin1, rpio.LOW);
    }         
}

module.exports = Robot

