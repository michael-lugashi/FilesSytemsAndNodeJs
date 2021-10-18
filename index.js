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

let i = 0
findTreasureSync(openFolder('.\\maze'));
function findTreasureSync(roomPath) {
    // console.log(roomPath[i])
    try {
      //   console.log(roomPath[i])
      const data = fs.readFileSync(roomPath[i], 'utf8');
      // console.log(data);
      // openChestSync(data);
      console.log('');
      i = 0;
      let chest = (openChestSync(data))
      if (chest.treasure === true) {
          console.log('congrats')
          return
      }
      chest = chest.clue
  
      findTreasureSync(openFolder(chest))
    } catch (err) {
      i++;
      console.log('didnt');
      findTreasureSync(roomPath);
    }
  }
  
function openChestSync(chestPath) {
    console.log(JSON.parse(chestPath))
    return JSON.parse(chestPath)
}
openFolder('.\\maze');

