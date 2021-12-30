const fs = require("fs");
const request = require("request");


request("https://nodejs.org/dist/latest-v16.x/docs/api/fs.json#event-close_3", (error, response, body) => {
    fs.writeFileSync("./cluster.json", body);
})