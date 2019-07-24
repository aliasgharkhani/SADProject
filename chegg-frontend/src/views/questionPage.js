import React, {Component} from "react";
import {Divider, Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/bookCard'
import Template from '../components/template';
import axios from "axios";
import Question from "../components/question";
import Ad from '../components/ad'
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw, ContentState, convertFromRaw, convertFromHTML} from 'draft-js';
import QuestionPart from '../components/questionOfQuestionPage'
import htmlToDraft from 'html-to-draftjs';
import Answer from '../components/answer'


import draftToHtml from 'draftjs-to-html'


const toolbarEditor = {
    options: ['inline', 'blockType', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],

    blockType: {
        inDropdown: true,
        options: ['Normal', 'Code'],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
    },
    fontSize: {

        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
    },
    fontFamily: {
        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
    },
    list: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['unordered', 'ordered', 'indent', 'outdent'],
        unordered: {className: undefined},
        ordered: {className: undefined},
        indent: {className: undefined},
        outdent: {className: undefined},
    },
    textAlign: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['left', 'center', 'right', 'justify'],
        left: {className: undefined},
        center: {className: undefined},
        right: {className: undefined},
        justify: {className: undefined},
    },
    colorPicker: {

        className: undefined,
        component: undefined,
        popupClassName: undefined,
        colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
            'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
            'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
            'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
            'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
            'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
    },
    link: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        dropdownClassName: undefined,
        showOpenOptionOnHover: true,
        defaultTargetOption: '_self',
        options: ['link', 'unlink'],
        link: {className: undefined},
        unlink: {className: undefined},
        linkCallback: undefined
    },

    embedded: {

        className: undefined,
        component: undefined,
        popupClassName: undefined,
        embedCallback: undefined,
        defaultSize: {
            height: 'auto',
            width: 'auto',
        },
    },
    image: {

        className: undefined,
        component: undefined,
        popupClassName: undefined,
        urlEnabled: true,
        uploadEnabled: true,
        alignmentEnabled: true,
        uploadCallback: undefined,
        previewImage: false,
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        alt: {present: false, mandatory: false},
        defaultSize: {
            height: 'auto',
            width: 'auto',
        },
    },
    remove: {className: undefined, component: undefined},
    history: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ['undo', 'redo'],
        undo: {className: undefined},
        redo: {className: undefined},
    },
}

class QuestionPage extends Component {


    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            text: '',
            question: [],

        };

    }

    onContentStateChange = (editorState) => {

        this.setState({
            text: editorState
        })
    };

    onEditorStateChange = (editorState) => {


        this.setState({
            editorState,
        });
    };


    componentWillMount() {


        document.title = "صفحه ی سوال";
        var urlParameters = this.props.match.params;
        var that = this;

        axios.get('http://localhost:8000/qa/questions/' + urlParameters.id + '/')
            .then(res => {

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
                    <Grid.Row columns={1} style={{height: '100%',}}>

                        <Grid.Column width={13} style={{height: '100%',}}>
                            <Segment>
                            <QuestionPart question={this.state.question}/>

                            <div style={{fontWeight: 'bold', fontSize: '1.5em', direction: 'rtl'}}>
                                <br/>
                                پاسخ ها
                            </div>
                            <Divider section/>
                            <Answer html={draftToHtml(convertToRaw(editorState.getCurrentContent()))}/>

                            <div style={{fontWeight: 'bold', fontSize: '1.5em', direction: 'rtl', marginBottom: '25px'}}>
                                <br/>
                                پاسخ شما
                            </div>


                            <Editor
                                toolbar={toolbarEditor}
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                editorStyle={styleObj}
                                onEditorStateChange={this.onEditorStateChange}
                                onContentStateChange={this.onContentStateChange}
                            />



                            </Segment>


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