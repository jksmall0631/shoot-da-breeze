import React from 'react';
import { render } from 'react-dom';

import Application from './components/Application';
import firebase from './firebase';
// import filterMessages from './filterMessages';

require('./css/index.scss');

render(<Application/>, document.getElementById('application'));
