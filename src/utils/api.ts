import axios from 'axios';

export class API {
  public async summaries() {
    try {
      axios.defaults.baseURL = 'https://wakatime.com';
      axios.defaults.headers.common.Authorization =
        'Basic Mzc2NmQ2OTMtYmZmMy00YzYzLThiZjUtYjQzOWYzZTEyMzAxCg==';
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
      return null;
    }
    return summaries.data[0].grand_total.text;
  }
}
