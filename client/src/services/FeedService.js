import axios from "axios";
import config from "./services.config";

const url = config.url + '/feed';

export class FeedService {
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data
                    .map(post => {
                        return {
                            ...post.data
                        }
                    })
                    .sort((postA, postB) => new Date(postA.createdAt).getTime() - new Date(postB.createdAt).getTime())
                    .filter((post) => !post.isPrivate)
                )
            } catch(err) {
                reject(err);
            }
        })
    }

    static viewPost(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                let data = res.data;
                    data = data.map(post => {
                        return {
                            ...post.data
                        }
                    });

                let post = data.find(post => post.id === id);

                if(post && !post.isPrivate) {
                    return resolve(post);
                } else {
                    return resolve(undefined);
                }
            } catch(err) {
                reject(err);
            }
        });
    }
}