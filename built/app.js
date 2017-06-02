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
gpio.setup(27, gpio.DIR_OUT, write());
gpio.on('change', (channel, value) => {
    console.log(channel);
    if (!value && channel === 8) {
        logstash_connector_1.LogstashConnector.pushLog({
            machine: MACHINE_TYPES[0],
            status: STATUS[3],
            energy: Math.round(Math.random() * 10),
            order: "INJECTOR-CI2",
            manualData: true
        }).then((res) => {
            if (res) {
                write();
            }
        });
    }
});
gpio.setup(8, gpio.DIR_IN, gpio.EDGE_BOTH);
function write() {
    gpio.write(27, true, function (err) {
        if (err)
            throw err;
        setTimeout(gpio.write(27, false, function (err) {
            if (err)
                throw err;
        }), 300);
    });
}
//# sourceMappingURL=app.js.map