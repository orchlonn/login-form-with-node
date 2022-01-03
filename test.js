const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
    res.setHeader("content-type", "text/html");
    const { headers, url, method } = req;
    if (url === "/") {
        fs.readFile("./source/index.html", "utf-8", (error, data) => {
            if (error) {
                res.statusCode = 500;
                res.write("ERROR!")
                res.end();
            } else {
                res.statusCode = 200;
                res.write(data);
                res.end();
            }
        })
    } else if (url === "/login") {
        fs.readFile("./source/login.html", "utf-8", (error, data) => {
            res.statusCode = 200;
            res.write(data);
            res.end();
        })
    } else if (url === "/logincheck" && method === "POST") {
        const body = [];
        req.on("data", chunk => {
            body.push(chunk);
        });
        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const password = parsedBody.split('=')[2];
            if (password == "orchlon") {
                res.statusCode = 302;
                res.setHeader("Location", "/home");
                res.end();
            } else {
                res.statusCode = 302;
                res.setHeader("Location", "/error");
                res.end();
            }
        });
    } else if (url === "/home") {
        fs.readFile("./source/home.html", "utf-8", (error, data) => {
            res.statusCode = 200;
            res.write(data);
            res.end();
        })
    } else if (url === "/error") {
        fs.readFile("./source/error.html", "utf-8", (error, data) => {
            res.statusCode = 200;
            res.write(data);
            res.end();
        })
    } else {
        res.write("<h1>404 not found</h1>");
        res.end();
    }
});

server.listen(3030, () => {
    console.log("hi greeting from 3030");
});