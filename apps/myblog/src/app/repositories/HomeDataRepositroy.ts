import { HomeData } from '@souhailelk/myblog.domain';
import axios from 'axios';

class HomeDataRepository {
  private uri:string = 'https://souhailelk-backend-b5a5f23638f7.herokuapp.com/';
  
  async getData(): Promise<HomeData> {
    const val = await axios.get(this.uri+"HomeData/")
      .then(response => {
        return response.data[0]
      })
      .catch(error => {
        console.error(error)
      });
    return val;
  }

}
export default HomeDataRepository;