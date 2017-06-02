"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
class LogstashConnector {
    static pushLog(object) {
        return new Promise((resolve, reject) => {
            object = JSON.stringify(object);
            let req = http_1.request({
                host: "127.0.0.1",
                port: 8080,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(object)
                }
            }, (response) => {
                if (response.statusCode === 200) {
                    console.log("info", ["Logstash push successful", JSON.stringify(object)]);
                    resolve(true);
                }
                else {
                    console.log("warn", ["Logstash push failed", JSON.stringify(object)]);
                    reject(new Error("Logstash push failed!"));
                }
            });
            req.write(new Buffer(object));
            req.end();
        });
    }
}
exports.LogstashConnector = LogstashConnector;
//# sourceMappingURL=logstash.connector.js.map