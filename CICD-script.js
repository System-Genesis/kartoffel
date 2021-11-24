const path = require("path");
const fs = require("fs");
const readline = require('readline');

//joining path of directory
const directoryPath = path.join(__dirname, "./docker-compose-config");
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
  files.forEach(function (file) {
    fs.readdir(`${directoryPath}/${file}`, function (err, files) {
      files.forEach(function (sonFile) {
        fs.readdir(
          `${directoryPath}/${file}/${sonFile}`,
          function (err, files) {
            files.forEach(function (grandSonFile) {
              // Do whatever you want to do with the file
              let tempArray= grandSonFile.split('.')
              if(tempArray[1] == 'env')
              {

                console.log(`${file}/${sonFile}/${grandSonFile}:\n`);
                processLineByLine(`${directoryPath}/${file}/${sonFile}/${grandSonFile}`, grandSonFile);

              }
            });
          }
        );
      });
    });
  });
});


async function processLineByLine(filePath, filename) {
  const readStream = fs.createReadStream(filePath);
  let writeStream = fs.createWriteStream(`./cicd-config/${filename}-values.yaml`);

  const lineReader = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.


  lineReader.on('line', function (line) {
    let lineArray = line.split('=')
    writeStream.write(`-name: ${line[0]}`, 'base64')
    writeStream.write(` value: ${line[1]}`, 'base64')
    // console.log('Line from file:', line);
  });
  writeStream.end();
}
