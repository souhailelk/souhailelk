import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
export class DatabaseClient {
  private static client: MongoClient | undefined = undefined;
  private static dbName: string = 'souhailelk-blog';
  static async getClient(): Promise<Db> {
    if (this.client != undefined) {
      return this.client.db(this.dbName);
    }
    dotenv.config();
    const uri: string | undefined = process.env.NODEJS_URI;
    if (uri == undefined) {
      throw Error("URI wasn't defined");
    }
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await this.client.connect();
    return this.client.db(this.dbName);
  }
}
