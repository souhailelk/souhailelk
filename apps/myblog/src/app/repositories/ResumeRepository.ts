import { Resume } from '@souhailelk/myblog.domain';
import axios from 'axios';

class ResumeRepository {
  private uri:string = 'https://souhailelk-backend-b5a5f23638f7.herokuapp.com/';
  
  async getResume(): Promise<Resume> {
    const val = await axios.get(this.uri+"Resume/")
      .then(response => {
        return response.data[0]
      })
      .catch(error => {
        console.error(error)
      });
    return val;
  }

}
export default ResumeRepository;