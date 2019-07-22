import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/bookCard'
import Template from '../components/template';
import axios from "axios";
import Question from "../components/question";
import Ad from '../components/ad'




class QuestionPage extends Component {


    state = {
        books: [],
        bought_books: [],

        numOfChapters: []

    };


    componentDidMount() {
        document.title = "لیست کتاب ها";
        console.log(localStorage.getItem('chegg-token'))
        axios.get(`http://localhost:8000/store/books`)
            .then(res => {
                let books = res.data;
                let numOfChapters = new Array(res.data.length).fill(0);
                var headers = {

                    'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
                };
                axios.get(`http://localhost:8000/auth/self/`, {headers: headers})
                    .then(res => {
                        for (var i = 0; i < res.data.bought_chapters.length; i++) {

                            numOfChapters[res.data.bought_chapters[i].book - 1] += 1;

                        }
                        this.setState(
                            {
                                numOfChapters: numOfChapters,
                                bought_books: res.data.bought_books,
                                books: books,
                            }
                        )
                    }).catch((error) => {
                    this.setState(
                        {
                            books: books,
                        }
                    );
                    console.log(error)
                })
            });


    }


    render() {




        return (

            <Template {...this.props}>





            </Template>


        )
    }
}

export default QuestionPage;