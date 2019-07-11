import React, {Component} from 'react'
import {Grid, Image, Segment} from "semantic-ui-react";
import Template from '../components/template'
import axios from "axios";
import BreadCrump from '../components/BreadCrump'

class bookProblem extends Component {
    state = {
        body: "",
        answer: "",
    };

    componentWillMount() {
        let url = window.location.pathname;
        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        axios.get('http://localhost:8000/store' + url, {headers: headers})
            .then(res => {
                this.setState({
                    body: res.data.body,
                    answer: res.data.answer_blurred
                })
            });
    }

    getData() {
        let url = window.location.pathname;
        let bookName;
        url = url.split('/');
        let bookURL = url[0] + '//' + 'localhost:3000/' + url[3] + '/' + url[4];
        let chapterID = url[6];
        axios.get('http://localhost:8000/store/books/' + url[4])
            .then(res => {
                bookName =  res.data.title
            });
        return {
            book: {
                name: bookName,
                url: bookURL
            },
            chapterID: chapterID,
            problemId:url[8]
        }
    }

    render() {

        let data = this.getData();
        return (
            <Template>
                <Segment piled={true} style={{
                    width: ' 70%',
                    margin: 'auto'
                }}>
                    <Grid>
                        <Grid.Row style={{margin:'20px'}}>
                            <BreadCrump book={data.book} chapter={data.chapterID} problemId={data.problemId}/>
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