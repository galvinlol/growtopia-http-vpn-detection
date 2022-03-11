const fetch = require('node-fetch');
var http = require('http');

let data = "server|127.0.0.1\nport|17091\ntype|1\n#maint|aye\n\nbeta_server|127.0.0.1\nbeta_port|17091\n\nbeta_type|1\nmeta|localhost\nRTENDMARKERBS1001\n";
//growtopia/server_data.php data
let api = "LHZkofgjqxLqI7aSgsDCioydCDXu5jFXEyJZf9ShLfYYfNskjYoU=";
//v2.api.iphub.info api goes here

let httplol = http.createServer(function(req, res) {
    let url = req.url.split("/growtopia/")[1];
    switch (req.method) {
        case 'POST': {
            if (req.connection.remoteAddress == null) {
                req.connection.destroy();
            }
            if (url && url.startsWith("server_data.php") && req.method.toLowerCase() === "post" && req.headers['content-type'] === "application/x-www-form-urlencoded" && req.headers['accept'] === "*/*" && req.httpVersion == 1.0 && req.headers['content-length'] == 37 || req.headers['content-length'] == 38 && req.headers['host'] === "growtopia1.com" || req.headers['host'] === "growtopia2.com") { // growtopia post method
                var ip = req.connection.remoteAddress;

                if (ip == null) { //checks if the ip address has already destroyed.
                    req.connection.destroy();
                    break;
                }

                let parsed = ip.replace("::ffff:", "");

                fetch("http://v2.api.iphub.info/ip/" + parsed, {
                        method: "GET",
                        headers: {
                            "X-Key": api,
                        }
                    })
                    .then(data => data.json()).then(response => {
                        if (response.error) {
                            console.log(response.error);
                            break;
                        }

                        switch (response.block) { //response.block will be integer from 0-2
                            case 0: { //normal ip address
                                res.write(data);
                                return res.end();
                            }
                            break;

                        case 1: { //proxies/vpn ip address
                            res.write("`4Can not make new account!`` Sorry, but IP " + parsed + " is not permitted to create NEW Growtopia accounts at this time. (This can be because there is an open proxy/VPN here or abuse has from this IP) Please try again from another IP address.");
                            return res.end();
                        }
                        break;

                        case 2: { //proxies/vpn ip address
                            res.write("`4Can not make new account!`` Sorry, but IP " + parsed + " is not permitted to create NEW Growtopia accounts at this time. (This can be because there is an open proxy/VPN here or abuse has from this IP) Please try again from another IP address.");
                            return res.end();
                        }
                        break;
                        }
                    })
            } else {
                return req.connection.destroy();
            }
        }
        break;

    default: { //blocking exception on request method
        return req.connection.destroy();
    }
    break;
    }
}).listen(80);

httplol.on("listening", () => {
    console.log("vpn parse implementation in growtopia server (C) Galvin");
});
