import {LogstashConnector} from "./util/logstash.connector";
const gpio = require('rpi-gpio');

const MACHINE_TYPES: any = [
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

const STATUS: any = [
    "OK",
    "ERROR",
    "WARNING"
];

gpio.on('change', (channel, value) => {
    if (!value) {
        LogstashConnector.pushLog({
            machine: MACHINE_TYPES[0],
            status: STATUS[3],
            energy: Math.round(Math.random() * 10),
            order: "INJECTOR-CI2",
            manualData: true
        });
    }
});
gpio.setup(8, gpio.DIR_IN, gpio.EDGE_BOTH);