import {request} from "http";
import {IncomingMessage} from "http";
import {ClientRequest} from "http";

export class LogstashConnector {

    public static pushLog(object: any): void {
        object = JSON.stringify(object);
        let req: ClientRequest = request({
            host: "127.0.0.1",
            port: 1235,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(object)
            }
        }, (response: IncomingMessage) => {
            if (response.statusCode === 200) {
                console.log("info", ["Logstash push successful", JSON.stringify(object)]);
            } else {
                console.log("warn", ["Logstash push failed", JSON.stringify(object)]);
            }
        });

        req.write(new Buffer(object));
        req.end();
    }
}