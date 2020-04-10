import { promises as fsp } from 'fs';
import { join } from 'path';

export class Collection {
  constructor(collectionName) {
    this.filePath = join(process.cwd(), 'data', collectionName + '.json');
  }

  list() {
    return this._readData();
  }

  findOne(id) {
    return this._readData()
      .then(data => data.find(element => element.id === id));
  }

  delete(id) {
    return this._readData()
      .then(data => data.filter(eachHW => eachHW.id !== id))
      .then((newData) => fsp.writeFile('./data/homeworks.json', JSON.stringify(newData, null, 2)));
  }

  _readData() {
    return fsp.readFile(this.filePath, 'utf8')
      .then(fileData => JSON.parse(fileData));
  }
}