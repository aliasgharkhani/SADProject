import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/bookCard'
import Template from '../components/template';
import axios from "axios";
import Question from "../components/question";
import Ad from '../components/ad'
import QuestionPart from '../components/questionOfQuestionPage'


class QuestionPage extends Component {


    constructor(props) {
        super(props);

        this.state = {
            question: [],

        };
    }

    componentWillMount() {
        document.title = "صفحه ی سوال";
        var urlParameters = this.props.match.params;
        var that = this;
        console.log('http://localhost:8000/qa/questions/' + urlParameters.id)
        axios.get('http://localhost:8000/qa/questions/' + urlParameters.id + '/')
            .then(res => {
               // console.log(res.data, ' question form question page get axios')
                this.setState({
                        question: res.data

                    }
                )

            })
            .catch(

            )


    }


    render() {


        console.log('question from question page', this.state.question)

        return (

            <Template {...this.props}>


                <QuestionPart question={this.state.question}/>

            </Template>


        )
    }
}

export default QuestionPage;