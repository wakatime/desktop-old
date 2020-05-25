import axios from 'axios';

import Options from './options';

const options = new Options();
const baseURL = 'https://wakatime.com';

export default class API {
  public async summaries(start: string, end: string) {
    try {
      const apikey = await options.getApiKeyAsync();
      const token = Buffer.from(apikey).toString('base64');
      axios.defaults.baseURL = baseURL;
      axios.defaults.headers.common.Authorization = `Basic ${token}`;
      const response = await axios.get(`/api/v1/users/current/summaries?start=${start}&end=${end}`);
      if (response.status !== 200) {
        return null;
      }
      return response.data;
    } catch (err) {
      return null;
    }
  }

  public async todayMins(): Promise<string> {
    const summaries = await this.summaries('today', 'today');
    if (summaries == null) {
      return '0 min';
    }
    return summaries.data[0].grand_total.text;
  }
}
