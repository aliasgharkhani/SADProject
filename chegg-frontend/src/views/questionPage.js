import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/bookCard'
import Template from '../components/template';
import axios from "axios";
import Question from "../components/question";
import Ad from '../components/ad'
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw} from 'draft-js';

class QuestionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            text : ''
        };
    }

    onContentStateChange: Function = (editorState) => {
        console.log('content', editorState.blocks)
        this.setState({
            text:editorState
        })
    };
    onEditorStateChange: Function = (editorState) => {
                // console.log('editor', editorState)

        this.setState({
            editorState,
        });
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

        const {editorState} = this.state;
        const styleObj = {
            border: '2px solid gray',
            padding: '5px'
        };

        return (

            <Template {...this.props}>
                <Grid style={{margin: 'auto', width: '70%', height: '100%'}}>
                    <Grid.Row columns={1} style={{padding: '0', height: '100%',}}>

                        <Grid.Column width={13} style={{height: '100%',}}>

                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                editorStyle={styleObj}
                                onEditorStateChange={this.onEditorStateChange}
                                onContentStateChange={this.onContentStateChange}
                            />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Ad ad1={"https://cdn.zoomg.ir/2019/3/4db9f81a-8796-431d-9ef0-80fbc174257c.gif"}
                                ad2={"https://cdn.zoomg.ir/2019/3/4db9f81a-8796-431d-9ef0-80fbc174257c.gif"}
                                ad3={"https://cdn.zoomg.ir/2019/3/4db9f81a-8796-431d-9ef0-80fbc174257c.gif"}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Template>


        )
    }
}

export default QuestionPage;