import axios from "axios";

const baseURL = 'http://localhost:5000/api';

export class API {
    static get(path: string) {
        return new Promise(async (resolve, reject) => {
            let { data } = await axios.get(baseURL + path);

            return resolve(data);
        });
    }

    static post(path: string, body: any) {
        return new Promise(async (resolve, reject) => {
            let { data } = await axios.post(baseURL + path, body);

            return resolve(data);
        });
    }
}