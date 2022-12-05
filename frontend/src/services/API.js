import axios from "axios";

const baseApiURL = 'http://localhost:5000/api';

export class API {
    static get(path) {
        return new Promise(async (resolve, reject) => {

            try {
                path = !path.startsWith('/') ? `/${path}` : path;

                const { data } = await axios.get(baseApiURL + path);

                if(data) {
                    return resolve(data)
                } else {
                    return resolve(undefined);
                }
            } catch(err) {
                return reject(err);
            }
            
        });
    }
}