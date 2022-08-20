'use strict';
const path = require('path');
const fs = require('fs');
findTreasureSync('.\\maze');

// this function opens a folder
async function openFolder(folder) {
  await drawMapSync(folder);
  return (await fs.promises.readdir(folder)).map((fileName) => path.join(folder, fileName));
}
// this function accepts an array of paths and goes over them until one works then checks the paths in that path.
async function findTreasureSync(roomPath) {
  const chestPaths = await openFolder(roomPath);
  for (const chestPath of chestPaths) {
    try {
      const chestContent = await openChestSync(chestPath);
      if (chestContent.treasure === true) {
        break;
      }
      await findTreasureSync(chestContent.clue);
    } catch {
      continue;
    }
    return;
  }
}
// lets us check the contents of the chest
async function openChestSync(chestPath) {
  return JSON.parse(await fs.promises.readFile(chestPath, 'utf8'));
}
// lets us map our movements on the map.txt file
async function drawMapSync(currentRoomPath) {
  await fs.promises.writeFile('./map.txt', currentRoomPath + '\n', { flag: 'a+' });
}
