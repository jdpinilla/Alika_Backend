const fs = require('fs')
var file = "yo.jpg"
let binaryData = fs.readFileSync(file);

let base64 = new Buffer(binaryData).toString("base64");

console.log(base64)