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
import QuestionPart from '../components/questionOfQuestionPage'

class QuestionPage extends Component {


    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            text : '',
            question: [],

        };
    }
     onContentStateChange   (editorState)  {
        console.log('content', editorState.blocks)
        this.setState({
            text:editorState
        })
    };
    onEditorStateChange(editorState)  {
                // console.log('editor', editorState)

        this.setState({
            editorState,
        });
    };

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
 <QuestionPart question={this.state.question}/>
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