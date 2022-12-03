import axios from "axios";

const url = `http://localhost:5000/api/feed`;

export class FeedService {
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => {
                        return {
                            ...post.data
                        }
                    })
                )
            } catch(err) {
                reject(err);
            }
        })
    }
}