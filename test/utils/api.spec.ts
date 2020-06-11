import chai from 'chai';
import sinon from 'sinon';

import API from '../../src/utils/api';

const { expect } = chai;
const internal = {
  api: null,
  options: {
    getApiKeyAsync: sinon.stub(),
  },
  axios: {
    get: sinon.stub(),
    defaults: {
      headers: {
        common: {},
      },
    },
  },
};

describe('utils API', () => {
  beforeEach(async () => {
    internal.options.getApiKeyAsync.resolves('key');
    internal.api = new API(internal.axios as any, internal.options as any);
  });

  afterEach(() => {
    internal.axios.get.reset();
    internal.options.getApiKeyAsync.reset();
  });

  it('should return null in case of failure', async () => {
    internal.axios.get.withArgs('/v1/users/current/summaries?start=today&end=today').rejects();
    const summaries = await internal.api.summaries('today', 'today');
    expect(summaries).to.equal(null);
  });

  it('should return null in case of returned status is not 200', async () => {
    const data = [{ one: 1 }, { two: 2 }];
    internal.axios.get
      .withArgs('/v1/users/current/summaries?start=today&end=today')
      .resolves({ data, status: 400 });
    const summaries = await internal.api.summaries('today', 'today');
    expect(summaries).to.equal(null);
  });

  it('should fetch data from summaries', async () => {
    const data = [{ one: 1 }, { two: 2 }];
    internal.axios.get
      .withArgs('/v1/users/current/summaries?start=today&end=today')
      .resolves({ data, status: 200 });
    const summaries = await internal.api.summaries('today', 'today');
    expect(summaries).to.equal(data);
  });

  it('should return 0 min if summaries call fails', async () => {
    internal.axios.get.withArgs('/v1/users/current/summaries?start=today&end=today').rejects();
    const todayMins = await internal.api.todayMins('today', 'today');
    expect(todayMins).to.equal('0 min');
  });

  it('should fetch data from summaries and return today total time', async () => {
    const data = { data: [{ grand_total: { text: '20 mins' } }, { two: 2 }] };
    internal.axios.get
      .withArgs('/v1/users/current/summaries?start=today&end=today')
      .resolves({ data, status: 200 });
    const todayMins = await internal.api.todayMins('today', 'today');
    expect(todayMins).to.equal('20 mins');
  });

  it('should fetch data from summaries and return today total time "2h 30 mins"', async () => {
    const data = { data: [{ grand_total: { text: '2h 30 mins' } }, { two: 2 }] };
    internal.axios.get
      .withArgs('/v1/users/current/summaries?start=today&end=today')
      .resolves({ data, status: 200 });
    const todayMins = await internal.api.todayMins('today', 'today');
    expect(todayMins).to.equal('2h 30 mins');
  });

  it('should throw and return null if status != 200', async () => {
    const data = { status: 400 };
    internal.axios.get.withArgs('/v1/users/current/user_agents').resolves(data);
    const userAgents = await internal.api.userAgents();
    expect(userAgents).to.equal(null);
  });

  it('should throw if fetching data from userAgents fails and return null', async () => {
    internal.axios.get.withArgs('/v1/users/current/user_agents').rejects();
    const userAgents = await internal.api.userAgents();
    expect(userAgents).to.equal(null);
  });

  it('should fetch data from userAgents', async () => {
    const data = {
      data: { data: [{ editor: 'VS Code' }, { editor: 'VS Code' }, { editor: 'Chrome' }] },
      status: 200,
    };
    internal.axios.get.withArgs('/v1/users/current/user_agents').resolves(data);
    const userAgents = await internal.api.userAgents();
    expect(userAgents).to.deep.equal([{ editor: 'VS Code' }, { editor: 'Chrome' }]);
  });
});
