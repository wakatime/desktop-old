import axios from 'axios';

import Options from './options';
import logger from './logger';

const options = new Options();
const baseURL = 'https://wakatime.com/api';

export default class API {
  public async setup() {
    const apikey = await options.getApiKeyAsync();
    const token = Buffer.from(apikey).toString('base64');
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.common.Authorization = `Basic ${token}`;
  }

  public async summaries(start: string, end: string) {
    try {
      await this.setup();
      const response = await axios.get(`/v1/users/current/summaries?start=${start}&end=${end}`);
      if (response.status !== 200) {
        throw new Error('Get current summaries call failed');
      }
      return response.data;
    } catch (err) {
      logger.error(err.message, err);
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

  public async userAgents() {
    try {
      await this.setup();
      const response = await axios.get('/v1/users/current/user_agents');
      if (response.status !== 200) {
        throw new Error('Get current user agents call failed');
      }
      const unique = {};
      const result = [];
      response.data.data.forEach((r) => {
        if (!unique[r.editor]) {
          unique[r.editor] = true;
          result.push(r);
        }
      });
      return result;
    } catch (err) {
      logger.error(err.message, err);
      return null;
    }
  }
}
