import { Action } from 'redux';

interface Meta {
  [s: string]: number | string | Meta;
}

export interface FSA<Payload> extends Action {
  type: string;
  payload: Payload;
  error?: boolean;
  meta?: Meta;
}
