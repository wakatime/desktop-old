import matchesProperty from 'lodash/fp/matchesProperty';
import has from 'lodash/fp/has';
import { Action } from 'redux';

const isForwardToMain = matchesProperty('meta.forwardToMain', true);
const hasType = has('type');

export default (action: Action): boolean => hasType(action) && isForwardToMain(action);
