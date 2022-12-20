import axios from "axios";

const baseURL = 'http://localhost:5000/api';

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