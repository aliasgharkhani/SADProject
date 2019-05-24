import React from 'react';
import './App.css';
import Main from './views/main';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/' component={Main}/>
            </Switch>
        </Router>
    );
}

export default App;
