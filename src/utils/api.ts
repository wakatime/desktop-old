import axios from 'axios';

import Options from './options';

const options = new Options();
export default class API {
  public async summaries() {
    try {
      const apikey = await options.getApiKeyAsync();
      const token = Buffer.from(apikey).toString('base64');
      axios.defaults.baseURL = 'https://wakatime.com';
      axios.defaults.headers.common.Authorization = `Basic ${token}`;
      const response = await axios.get('/api/v1/users/current/summaries?start=today&end=today');
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (err) {
      return null;
    }
  }

  public async todayMins() {
    const summaries = await this.summaries();
    if (summaries == null) {
      return '0 min';
    }
    return summaries.data[0].grand_total.text;
  }
}
