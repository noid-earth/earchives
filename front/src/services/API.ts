import axios from "axios";

const baseURL = 'http://localhost:5000/api';

export class API {
    static get(path: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await axios.get(baseURL + path);
                return resolve(data);
            } catch(err) {
                return reject(err);
            }
        });
    }

    static post(path: string, body: any) {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await axios.post(baseURL + path, body);
                return resolve(data);
            } catch(err) {
                return reject(err);
            }
        });
    }
}