import React from 'react';
import { render } from 'react-dom';

import Apikey from '../components/apikey/Apikey';

const div = document.getElementById('apikey-container');
if (div) {
  render(<Apikey />, div);
}
