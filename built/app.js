"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logstash_connector_1 = require("./util/logstash.connector");
const gpio = require('rpi-gpio');
const MACHINE_TYPES = [
    "A100",
    "BX10",
    "CF400",
    "EB88",
    "ARP",
    "X500",
    "P1C1",
    "G200",
    "L90Q",
    "QX400"
];
const STATUS = [
    "OK",
    "ERROR",
    "WARNING"
];
gpio.setup(13, gpio.DIR_OUT, write);
gpio.setup(11, gpio.DIR_OUT, write);
gpio.on('change', (channel, value) => {
    if (!value && channel === 8) {
        logstash_connector_1.LogstashConnector.pushLog({
            machine: MACHINE_TYPES[0],
            status: STATUS[3],
            energy: Math.round(Math.random() * 10),
            order: "INJECTOR-CI2",
            manualData: true
        }).then(() => {
            write(true);
        }).catch((err) => {
            console.log(err);
            write(false);
        });
    }
});
gpio.setup(8, gpio.DIR_IN, gpio.EDGE_FALLING);
function write(green) {
    if (green) {
        gpio.write(13, true, function (err) {
            if (err)
                throw err;
            setTimeout(closeLED13, 300);
        });
    }
    else {
        gpio.write(11, true, function (err) {
            if (err)
                throw err;
            setTimeout(closeLED11, 300);
        });
    }
}
function closeLED13() {
    gpio.write(13, false, function (err) {
        if (err)
            throw err;
    });
}
function closeLED11() {
    gpio.write(11, false, function (err) {
        if (err)
            throw err;
    });
}
//# sourceMappingURL=app.js.map