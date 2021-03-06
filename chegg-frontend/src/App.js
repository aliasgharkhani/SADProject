import React from 'react';
import Main from './views/main';
import SignIn from './views/signin';
import SignUp from './views/signup';
import Book from './views/book';
import BookList from './views/bookList';


import {Route, Switch} from 'react-router';
import {BrowserRouter} from "react-router-dom";
import './App.css';
import BookProblem from "./views/bookProblem";
import UserProfile from "./views/userProfile";
import QuestionsList from "./views/questionsList";
import SearchPage from "./views/searchPage";
import QuestionCreate from "./views/questionCreate";
import QuestionPage from "./views/questionPage";
import SearchExampleStandard from "./views/test";
import TaggedQuestions from './views/taggedQuestions'



function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/signin' component={SignIn}/>
                <Route exact path='/signup' component={SignUp}/>
                <Route exact path='/books/:id' component={Book}/>
                <Route exact path='/books' component={BookList}/>
                <Route exact path='/books/:bookId/chapters/:chapterId/problems/:problemId' component={BookProblem}/>
                <Route exact path='/profile/:username/:page_content?' component={UserProfile}/>
                <Route exact path='/questions' component={QuestionsList}/>
                <Route exact path='/search/:title' component={SearchPage}/>
                <Route exact path='/questions/submit' component={QuestionCreate}/>
                 <Route exact path='/question/:id' component={QuestionPage}/>
                 <Route exact path='/test' component={SearchExampleStandard}/>
                 <Route exact path='/questions/tagged/:tags' component={TaggedQuestions}/>
            </Switch>
        </BrowserRouter>
    );
}


export default App;
