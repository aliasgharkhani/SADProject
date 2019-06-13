import React from 'react';
import Main from './views/main';
import SignIn from './views/signin';
import SignUp from './views/signup';
import Book from './views/book';
import BookList from './views/bookList';


import {Route, Switch} from 'react-router';
import {BrowserRouter} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/signin' component={SignIn}/>
                <Route exact path='/signup' component={SignUp}/>
                <Route exact path='/books/:id' component={Book}/>
                <Route exact path='/booklist' component={BookList}/>

            </Switch>
        </BrowserRouter>
    );
}


export default App;
