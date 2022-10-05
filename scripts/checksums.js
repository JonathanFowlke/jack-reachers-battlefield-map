const fs = require("fs");
const path = require("path");
const { checksum } = require("./utils");

const workingDir = path.join(__dirname, "../public/data");
const resultsFileName = "checksums.json";

let fileNames = fs.readdirSync(workingDir);
console.debug("Files found: ", fileNames);

let contents = fileNames
    .filter((fileName) => fileName !== resultsFileName)
    .map((fileName) => {
        let buffer = fs.readFileSync(`${workingDir}/${fileName}`);
        let file = buffer.toString();
        let value = checksum(file);
        return {
            name: path.parse(fileName).name,
            checksum: value,
        };
    });
console.debug("Checksums generated: ", contents);

fs.writeFileSync(`${workingDir}/${resultsFileName}`, JSON.stringify(contents, null, 2));
console.log("Success!");
