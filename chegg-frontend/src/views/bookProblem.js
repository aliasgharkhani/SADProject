import React, {Component} from 'react'
import {Grid, Image, Segment} from "semantic-ui-react";
import Template from '../components/template'
import axios from "axios";

class bookProblem extends Component {


    state={
        title: "",
        image: ""
    }

    componentWillMount() {
        let url = window.location.href;
        url = url.replace('3', '8');
         axios.get(`http://localhost:8000/store/books/${this.bookId}/`)
            .then(res => {
                const chapters = res.data.chapters;
                this.setState({
                    ISBN: res.data.ISBN,
                    score: res.data.score,
                    publication_date: res.data.publication_date,
                    edition: res.data.edition,
                    title: res.data.title,
                    author: res.data.author,
                    price: res.data.price,
                    cover: res.data.cover,
                    description: res.data.description,
                    chapters: chapters,
                    book: res.data
                })
            })
        let token = localStorage.getItem('chegg-token');
        if (token !== undefined) {
            axios.get('http://localhost:8000/auth/self/', {
                headers: {Authorization: 'TOKEN ' + token}
            }).then(response => {
                if (response.status === 200) {
                    this.setState({
                        memberInfo: response.data
                    })
                }
            })
        }


    }




    render() {


        return (
            <Template>
                <Segment piled={true} style={{
                    width: ' 70%',
                    margin: 'auto'
                }}>
                    <Grid>
                        <Grid.Row style={{padding: '2em'}}>
                            <div style={{direction: 'rtl', width: '100%', fontSize: '1.56em'}}>{this.props.title}</div>
                        </Grid.Row>
                        <Grid.Row>
                            <Image style={{margin: '1em 6em', width: '100%'}} src={this.props.image}/>
                        </Grid.Row>
                    </Grid>

                </Segment>
            </Template>
        )
    }
}

export default bookProblem;