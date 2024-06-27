import { DatabaseClient } from './DatabaseClient';
import {  HomeData } from '@souhailelk/myblog.domain';

export class HomeDatabase {
  async getData(): Promise<HomeData[]> {
    const database = await DatabaseClient.getClient();
    const homeDataDB = database.collection<HomeData>('HomeData');
    return homeDataDB.find().sort({ _id: -1 }).limit(1).toArray();
  }
}
