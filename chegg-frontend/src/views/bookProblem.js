import React, {Component} from 'react'
import {Grid, Image, Segment} from "semantic-ui-react";
import Template from '../components/template'
import axios from "axios";
import BreadCrump from '../components/BreadCrump'

class bookProblem extends Component {
    state = {
        body: "",
        answer: "",
        book: '',
        chapterId: '',
        problemId: ''
    };

    componentWillMount() {
        let url = window.location.pathname;
        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        if (localStorage.getItem('chegg-token') === null) {
            axios.get('http://localhost:8000/store' + url)
                .then(res => {
                    console.log('ali    ', res.data);
                    this.setState({
                        body: res.data.body,
                        answer: res.data.answer
                    })
                });
        } else {
            axios.get('http://localhost:8000/store' + url, {headers: headers})
                .then(res => {
                    console.log('ali    ', res.data);
                    this.setState({
                        body: res.data.body,
                        answer: res.data.answer
                    })
                });
        }
        url = window.location.href;
        url = url.split('/');
        console.log('inja  ', url);
        var bookURL = url[0] + '//' + 'localhost:3000/' + url[3] + '/' + url[4];
        var chapterID = url[6];
        axios.get('http://localhost:8000/store/books/' + url[4])
            .then(res => {
                this.setState({
                    book: {
                        name: res.data.title,
                        url: bookURL
                    },
                    chapterId: chapterID,
                    problemId: url[8]
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
                        <Grid.Row style={{padding: '2em'}}>
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