import { get, set } from 'lodash';
import { Database } from '../../database';

export class Util {
  constructor() {
    throw new Error(`Class Util may not be instantiated!`);
  }

  static parseKey(key: any) {
    if (!key || typeof key !== 'string') return { key: undefined, target: undefined };
    if (key.includes('.')) {
      let spl = key.split('.');
      let parsed = spl.shift();
      let target = spl.join('.');
      return { key: parsed, target };
    }
    return { key, target: undefined };
  }

  static setData(key: string, data: any, value: any): any {
    let parsed = this.parseKey(key);
    if (typeof data === 'object' && parsed.target) {
      return set(data, parsed.target, value);
    } else if (parsed.target) throw new Error('Cannot target non-object');
    return data;
  }

  static getData(key: string, data: any): any {
    let parsed = this.parseKey(key);
    if (parsed.target) data = get(data, parsed.target);
    return data;
  }

  static parseData(key: string, data: any) {
    let parsed = this.parseKey(key);
    if (!data) return undefined;
    let item;
    if (parsed.target) item = this.getData(key, Object.assign({}, data));
    else item = data;
    return item !== undefined ? item : undefined;
  }

  static set(Database: Database<any>, key: string, value: any): Promise<any> {
    return new Promise(async (resolve) => {
      if (typeof key !== 'string') throw new Error('Key should be type string, received:' + typeof key);
      let parsed = Util.parseKey(key);
      let raw = await Database.schema.findOne({ id: parsed.key });

      if (!raw) {
        let data = new Database.schema({ id: parsed.key, data: parsed.target ? Util.setData(key, {}, value) : value });
        await data.save().catch((err: Error) => {
          console.log(err);
        });
        resolve(await Database.schema.findOne({ id: parsed.key }));
      } else {
        let data = parsed.target ? Util.setData(key, Object.assign({}, raw.data), value) : value;
        let update: any = {
          ['$set']: {},
        };

        update['$set']['data'] = data;

        await Database.schema
          .findOneAndUpdate(
            {
              id: parsed.key,
            },
            update,
            {
              upsert: true,
              new: true,
            },
          )
          .catch((err: Error) => {
            console.log(err);
          });
        resolve(await Database.schema.findOne({ id: parsed.key }));
      }
    });
  }
}