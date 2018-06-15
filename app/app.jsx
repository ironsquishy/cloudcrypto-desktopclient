import React from 'react';
import ReactDOM from 'react-dom';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Dashboard from './components/dashboard.component';

import './app.css';


var app = (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Dashboard />
    </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById('app'));