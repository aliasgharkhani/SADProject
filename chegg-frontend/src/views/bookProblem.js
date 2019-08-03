import React, {Component} from 'react'
import {Grid, Image, Segment} from "semantic-ui-react";
import Template from '../components/template/template'
import axios from "axios";
import BreadCrump from '../components/book/BreadCrump'

class bookProblem extends Component {
    state = {
        body: "",
        answer: "",
        book: '',
        chapterId: '',
        problemId: ''
    };

    componentDidMount() {
        // let url = window.location.pathname;
        // console.log(url);
        var urlParameters = this.props.match.params;

        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        if (localStorage.getItem('chegg-token') === null) {
            axios.get('http://localhost:8000/store/books/' + urlParameters.bookId + '/chapters/' + urlParameters.chapterId + '/problems/' + urlParameters.problemId)
                .then(res => {
                    this.setState({
                        body: res.data.body,
                        answer: res.data.answer
                    })
                });
        } else {
            axios.get('http://localhost:8000/store/books/' + urlParameters.bookId + '/chapters/' + urlParameters.chapterId + '/problems/' + urlParameters.problemId, {headers: headers})
                .then(res => {
                    console.log('ali    ', res.data);
                    this.setState({
                        body: res.data.body,
                        answer: res.data.answer
                    })
                });
        }
        var bookURLbackend = 'http://localhost:8000/store/books/' + urlParameters.bookId;
        var bookURLfrontend = 'http://localhost:3000/books/' + urlParameters.bookId;
        axios.get(bookURLbackend)
            .then(res => {
                this.setState({
                    book: {
                        name: res.data.title,
                        url: bookURLfrontend
                    },
                    chapterId: urlParameters.chapterId,
                    problemId: urlParameters.problemId
                })
            });
    }


    render() {
        return (
            <Template>
                <Segment piled={true} style={{
                    width: ' 70%',
                    margin: 'auto'
                }}>
                    <Grid>
                        <Grid.Row style={{margin: '20px'}}>
                            <Grid.Column style={{textAlign: 'right'}}>
                                <BreadCrump book={this.state.book} chapter={this.state.chapterId}
                                            problemId={this.state.problemId}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{padding: '2em', marginBottom: '15px'}}>
                            <div style={{direction: 'rtl', width: '100%', fontSize: '1.56em'}}>{this.state.body}</div>
                        </Grid.Row>
                        <Grid.Row>
                            <Image style={{margin: '1em 6em', width: '100%'}} src={this.state.answer}/>
                        </Grid.Row>
                    </Grid>

                </Segment>
            </Template>
        )
    }
}

export default bookProblem;