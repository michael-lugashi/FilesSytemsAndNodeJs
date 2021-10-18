'use strict';
const path = require('path');
const fs = require('fs');
// this function opens the folders and only the folders inside the maze
function openFolder(folder) {
  let chests = fs
    .readdirSync(folder)
    .map((fileName) => path.join(folder, fileName));
  console.log(chests);
  return chests;
}

let i = 0;
drawMapSync('.\\maze');
findTreasureSync(openFolder('.\\maze'));
// this function accepts an array of paths and goes over them until one works then checks the paths in that path.
function findTreasureSync(roomPath) {
  try {
    const data = fs.readFileSync(roomPath[i], 'utf8');
    console.log(roomPath[i]);
    i = 0;

    let chests = openChestSync(data);
    if (chests.treasure === true) {
      console.log('congrats');
      return;
    }

    chests = chests.clue;
    drawMapSync(chests);
    findTreasureSync(openFolder(chests));
  } catch (err) {
    i++;
    findTreasureSync(roomPath);
  }
}
// lets us check the contents of the chest
function openChestSync(chestPath) {
  return JSON.parse(chestPath);
}

// lets us map our movements on the map.txt file
function drawMapSync(currentRoomPath) {
  fs.writeFileSync('./map.txt', currentRoomPath + '\n', { flag: 'a+' });
}
