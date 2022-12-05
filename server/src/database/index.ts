import { Connection, createConnection, Model } from "mongoose";
import { Base } from "./schemas/Base";
import dotenv from "dotenv";

dotenv.config();

export interface Data<T> extends Document {
    id: string;
    data: T;
}

export class Database<T> {
    database: string;
    connection: Connection;
    schema: Model<Data<T>, any, any>
    constructor(options: {collection: string, database: string }) {
        this.database = options.database;
        this.connection = this.__connect();
        this.schema = this.connection.model(options.collection, Base)
    }

    private __connect(): Connection {
        return createConnection(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@alpha.kxr0g3b.mongodb.net/${this.database}?retryWrites=true&w=majority`);
    }
}