const path = require('path');
const fs = require('fs');

function openFolder(folder){
    const isFile = (fileName) => fs.lstatSync(fileName).isFile();
    let chests = fs
      .readdirSync(folder)
      .map((fileName) => path.join(folder, fileName))
      .filter(isFile);
    console.log(chests)
    return chests
}


function openChestSync(chestPath) {
    console.log(JSON.parse(chestPath))
    return JSON.parse(chestPath)
}
openFolder('.\\maze');


// try {
//     const data = fs.readFileSync(`.\\maze-example\\${}, 'utf8'`)
//     console.log(data)
//   } catch (err) {
//     // console.error(err)
//   }

// process.stdin.on("data", dataBuffer => {
//     const input = dataBuffer.toString().trim();
//     try {
//         // const content = fs.readdirSync(`${__dirname}\\${input}`);
//         const content = fs.readdirSync(path.relative(__dirname, input));
//         process.stdout.write(content.join("\n"));
//         process.exit(0);
//     } catch(e) {
//         process.stderr.write(e.toString());
//         process.exit(1);
//     }
// });

// function drawMapSync(currentRoomPath) {}
