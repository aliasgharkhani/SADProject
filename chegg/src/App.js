import React from 'react';
import Main from './views/main';
import SignIn from './views/signin';
import {Router, Route, Switch} from 'react-router';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/signin' component={SignIn}/>
            </Switch>
        </Router>
    );
}

export default App;