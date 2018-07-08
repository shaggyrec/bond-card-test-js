import React from 'react';
import { render } from 'react-dom'
import './index.css';
import Bond from './containers/BondContainer';
import { Provider } from 'react-redux'
import configureStore  from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

render(
	<Provider store={store}>
		<div className="container">
			<Bond />
		</div>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();