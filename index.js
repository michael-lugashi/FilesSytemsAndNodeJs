'use strict';
const path = require('path');
const fs = require('fs');
// this function opens a folder
function openFolder(folder) {
  drawMapSync(folder);
  return fs.readdirSync(folder).map((fileName) => path.join(folder, fileName));
}

let i = 0;
findTreasureSync(openFolder('.\\maze'));
// this function accepts an array of paths and goes over them until one works then checks the paths in that path.
function findTreasureSync(chestPaths) {
  try {
    const chestContent = openChestSync(chestPaths[i]);
    i = 0;
    if (chestContent.treasure === true) {
      return;
    }

    findTreasureSync(openFolder(chestContent.clue));

  } catch {
    i++;
    findTreasureSync(chestPaths);
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
