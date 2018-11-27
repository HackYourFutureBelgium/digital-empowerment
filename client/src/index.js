import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'normalize.css';
import 'nprogress/nprogress.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './assets/css/index.css';
import './assets/css/modal.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
