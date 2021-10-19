'use strict';
const path = require('path');
const fs = require('fs');
findTreasureSync('.\\maze');

// this function opens a folder
function openFolder(folder) {
  drawMapSync(folder);
  return fs.readdirSync(folder).map((fileName) => path.join(folder, fileName));
}
// this function accepts an array of paths and goes over them until one works then checks the paths in that path.
function findTreasureSync(roomPath) {
  const chestPaths = openFolder(roomPath);
  for (const chestPath of chestPaths) {
    try {
      const chestContent = openChestSync(chestPath);
      if (chestContent.treasure === true) {
        break;
      }
      findTreasureSync(chestContent.clue);
    } catch {
      continue;
    }
    return;
  }
}
// lets us check the contents of the chest
function openChestSync(chestPath) {
  return JSON.parse(fs.readFileSync(chestPath, 'utf8'));
}
// lets us map our movements on the map.txt file
function drawMapSync(currentRoomPath) {
  fs.writeFileSync('./map.txt', currentRoomPath + '\n', { flag: 'a+' });
}
