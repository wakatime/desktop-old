import ax from 'axios';

import Options from './options';
import logger from './logger';

const op = new Options();
const baseURL = 'https://wakatime.com/api';

export default class API {
  private axios;

  private options;

  constructor(axios = ax, options = op) {
    this.axios = axios;
    this.options = options;
  }

  public async init() {
    const apikey = await this.options.getApiKeyAsync();
    const token = Buffer.from(apikey).toString('base64');
    this.axios.defaults.baseURL = baseURL;
    this.axios.defaults.headers.common.Authorization = `Basic ${token}`;
  }

  public async summaries(start: string, end: string) {
    try {
      await this.init();
      const response = await this.axios.get(
        `/v1/users/current/summaries?start=${start}&end=${end}`,
      );
      if (response.status !== 200) {
        throw new Error('Failed fetching summaries from api');
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
      await this.init();
      const response = await this.axios.get('/v1/users/current/user_agents');
      if (response.status !== 200) {
        throw new Error('Failed fetching user agents from api');
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
