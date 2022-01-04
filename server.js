const http = require("http");
const fs = require("fs");
const urlLib = require("url");
const path = require("path");

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
        });
    } else if (url === "/error") {
        fs.readFile("./source/error.html", "utf-8", (error, data) => {
            res.statusCode = 200;
            res.write(data);
            res.end();
        });
    } else if (url.endsWith("jpg") || url.endsWith("png")) {
        const parsed = urlLib.parse(url);
        const fileName = path.basename(parsed.pathname);
        fs.readFile("./source/img/" + fileName, (error, data) => {
            res.statusCode = 200;
            res.end(data);
        });
    } else if (url.endsWith("pdf")) {
        const parsed = urlLib.parse(url);
        const fileName = path.basename(parsed.pathname);
        fs.readFile("./source/pdf/" + fileName, (error, data) => {
            res.statusCode = 200;
            res.setHeader("content-type", "application/pdf")
            res.end(data);
        });
    } else if (url.endsWith(".css")) {
        const parsed = urlLib.parse(url);
        const fileName = path.basename(parsed.pathname);
        fs.readFile("./source/css/" + fileName, (error, data) => {
            res.statusCode = 200;
            res.setHeader("content-type", "text/css")
            res.end(data);
        });
    } else if (url.endsWith(".js")) {
        const parsed = urlLib.parse(url);
        const fileName = path.basename(parsed.pathname);
        fs.readFile("./source/js/" + fileName, (error, data) => {
            res.statusCode = 200;
            res.setHeader("content-type", "text/javascript")
            res.end(data);
        });
    } else {
        res.write("<h1>404 not found</h1>");
        console.log("-----------", url);
        res.end();
    }
});
server.listen(3030, () => {
    console.log("hi greeting from 3030");
});