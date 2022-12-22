import axios from "axios";

const baseURL = 'http://localhost:5000/api';

export class CacheMap<K, V> extends Map<K, V> {}

export interface CACHE_OBJ { 
    lastSeen?: {
        path?: string, 
        date?: Date
    }
}

export const Cache = new CacheMap<string, CACHE_OBJ>();

export class API {
    static get(path: string): Promise<any | any[]> {
        return new Promise(async (resolve, reject) => {
            try {
                return await axios.get(baseURL + path).then((response) => {
                    resolve(response.data);
                }).catch((err) => {
                    resolve(null);
                });
            } catch(err) {
                return resolve(null);
            }
        });
    }

    static post(path: string, body: any) {
        return new Promise(async (resolve, reject) => {
            try {
                return await axios.post(baseURL + path, body).then((response) => {
                    resolve(response.data);
                }).catch((err) => {
                    resolve(null);
                });
            } catch(err) {
                return resolve(null);
            }
        });
    }

    static delete(path: string) {
        return new Promise(async (resolve, reject) => {
            try {
                return await axios.delete(baseURL + path).then((response) => {
                    resolve(response.data);
                }).catch((err) => {
                    resolve(null);
                });
            } catch(err) {
                return resolve(null);
            }
        });
    }

    static user(id: string) {
        return API.get('/user/get/' + id);
    }
}

export class API_STATUS {
    public Status: boolean;
    constructor() {
        this.Status = false;
        this.__verifier();
    }


    private async __verifier() {
        let set = async () => {
            try {
                let s = await (await axios.get(baseURL + '/status')).data;                return s == true ? s : false;
            } catch {
                return false;
            }
        }

        //@ts-ignore
        this.Status = await set();
        setInterval(async () => {
           //@ts-ignore
            this.Status = await set();
        }, 10 * 1000)
    }
}