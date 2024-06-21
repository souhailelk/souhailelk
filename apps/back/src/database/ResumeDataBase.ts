import { DatabaseClient } from './DatabaseClient';
import { Resume } from '@souhailelk/myblog.domain';

export class ResumeDatabase {
  async getResume():Promise<Resume[]> {
    const database = await DatabaseClient.getClient();
    const resumeDB = database.collection<Resume>('Resume');
    return resumeDB.find().sort({ '_id': -1 }).limit(1).toArray();
  }
}
