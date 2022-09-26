const fs = require("fs");
const path = require("path");

const workingDir = path.join(__dirname, "../public/data");
const ignoreFiles = ["checksums.json"];

let fileNames = fs.readdirSync(workingDir);
console.debug("Files found: ", fileNames);

let contents = fileNames
    .filter((fileName) => !ignoreFiles.includes(fileName))
    .forEach((fileName, index) => {
        let buffer = fs.readFileSync(`${workingDir}/${fileName}`);
        let file = buffer.toString();
        let data = JSON.parse(file);
        //TODO: check for id column, gather all existing, then populate missing skipping if exists
        //TODO: replace
        // fs.writeFileSync(`${workingDir}/${resultsFileName}`, JSON.stringify(contents, null, 2));
    });

//TODO: add ids, add books cross references

console.log("Success!");
