import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuHeader from './components/menu.js';
import BodyBackgroundColor from 'react-body-backgroundcolor';

injectTapEventPlugin();
const App = () => (
	<BodyBackgroundColor backgroundColor='#F0F8FF'>
	    <MuiThemeProvider>
	        <MenuHeader />
	    </MuiThemeProvider>
    </BodyBackgroundColor>
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);