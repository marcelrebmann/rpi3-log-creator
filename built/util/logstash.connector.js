"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
class LogstashConnector {
    static pushLog(object) {
        object = JSON.stringify(object);
        let req = http_1.request({
            host: "127.0.0.1",
            port: 1235,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(object)
            }
        }, (response) => {
            if (response.statusCode === 200) {
                console.log("info", ["Logstash push successful", JSON.stringify(object)]);
            }
            else {
                console.log("warn", ["Logstash push failed", JSON.stringify(object)]);
            }
        });
        req.write(new Buffer(object));
        req.end();
    }
}
exports.LogstashConnector = LogstashConnector;
//# sourceMappingURL=logstash.connector.js.map