import React, {Component} from "react";
import {Button, Divider, Grid, Icon, Menu, Modal, Segment} from 'semantic-ui-react'
import Template from '../components/template/template';
import axios from "axios";
import Ad from '../components/ad'
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw, ContentState, convertFromRaw, convertFromHTML} from 'draft-js';
import QuestionPart from '../components/question/questionOfQuestionPage'
import AnswerOfQuestionPage from '../components/question/answerOfQuestionPage'


import draftToHtml from "draftjs-to-html";


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
        this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this)
        this.state = {
            editorState: EditorState.createEmpty(),
            text: '',
            question: {},
            own: false,
            replies: [],
            modalActive: false,
            memberInfo: null,
            modalMessage: "",
            ads: [{'id': 0, 'link': ''}, {'id': 1, 'link': ''}, {'id': 2, 'link': ''},],
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
        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };
        axios.get('http://localhost:8000/qa/questions/' + urlParameters.id + '/',)
            .then(res1 => {
                if (localStorage.getItem('chegg-token') === undefined || localStorage.getItem('chegg-token') === null) {
                    axios.get('http://localhost:8000/qa/questions/' + urlParameters.id + '/replies/')
                        .then(res2 => {
                            axios.get('http://localhost:8000/store/ads/')
                                .then(res3 => {
                                    this.setState({
                                            question: res1.data,
                                            replies: res2.data,
                                            own: res1.data.asker === localStorage.getItem('chegg-username'),
                                            ads: res3.data,
                                        }
                                    )
                                });


                        })
                        .catch(

                        )

                } else {
                    axios.get('http://localhost:8000/qa/questions/' + urlParameters.id + '/replies/', {headers: headers})
                        .then(res2 => {
                            axios.get('http://localhost:8000/store/ads/')
                                .then(res3 => {
                                    this.setState({
                                            question: res1.data,
                                            replies: res2.data,
                                            own: res1.data.asker === localStorage.getItem('chegg-username'),
                                            ads: res3.data,
                                        }
                                    )
                                });


                        })
                        .catch(

                        )
                }

            })
            .catch(

            )


    }

    onCloseModal() {
        this.setState({
            modalActive: false,
            memberInfo: null,
            modalMessage: "",
        });
        window.location.reload()
    }

    handleAnswerSubmit(e) {

        console.log(this.state.editorState.getCurrentContent(), 'current')
        var body = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        var data = {'question': this.state.question.id, 'body': body};


        var headers = {

            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };

        console.log(body[7], body.length);


      if (body.length <= 8) {
            this.setState({
                modalMessage: "جواب خالی ثبت نمی شود.",
                modalActive: "True"
            })
            return
        }

        axios.post('http://127.0.0.1:8000/qa/reply/', data, {headers: headers})
            .then(response => {
                if (response.status === 200) {

                    this.setState({
                        modalMessage: "جواب شما با موفقیت ثبت شد"
                    })

                } else {
                    this.setState({
                        modalMessage: "جواب شما با موفقیت ثبت شد"
                    })
                    setTimeout(() => {
                        // this.props.history.push('../questions');

                        // window.location.replace("http://localhost:3000/questions")
                    }, 2000)
                }
            })
            .catch((error) => {
                console.log("error", error)
                this.setState({
                    modalMessage: "خطا در ثبت جواب. دوباره تلاش کنید."
                })
            });
        this.setState({modalActive: true})
    }


    render() {

        const {editorState} = this.state;
        const styleObj = {
            minHeight: '100px',
            border: '0.3px solid gray',
            padding: '0 5px',
            maxHeight: '200px',
            margin: '0',
            overFlow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'

        };


        return (

            <Template {...this.props}>
                <Modal size={"mini"} onRequestClose={this.onCloseModal.bind(this)} open={this.state.modalActive}>
                    <Icon name="close" onClick={this.onCloseModal.bind(this)}/>

                    <Modal.Content image>

                        <Modal.Description
                            style={{'flexGrow': '1', 'direction': 'rtl', 'textAlign': 'right'}}>

                            <p style={{fontFamily: "B Yekan"}}>
                                {this.state.modalMessage}
                            </p>

                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button style={{fontFamily: "B Yekan"}} emphasis="positive"
                                color='green'
                                onClick={this.onCloseModal.bind(this)}>بستن</Button>
                    </Modal.Actions>
                </Modal>

                <Grid style={{margin: 'auto', width: '70%', maxHeight: '100%', overflow: 'auto'}}>
                    <Grid.Row columns={1} style={{height: '100%',}}>

                        <Grid.Column width={13} style={{height: '100%',}}>
                            <Segment>
                                <QuestionPart question={this.state.question}/>

                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.5em',
                                    direction: 'rtl',
                                    marginTop: '20px'
                                }}>
                                    <br/>
                                    {this.state.question.num_of_replies}&nbsp;&nbsp; پاسخ
                                </div>
                                <Divider section/>
                                {this.state.replies.map(reply =>
                                    <AnswerOfQuestionPage own={this.state.own} reply={reply}/>
                                )}

                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.5em',
                                    direction: 'rtl',
                                    marginBottom: '25px',
                                }}>
                                    <br/>
                                    پاسخ شما
                                </div>


                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    editorStyle={styleObj}
                                    onEditorStateChange={this.onEditorStateChange}
                                    onContentStateChange={this.onContentStateChange}
                                />
                                <div style={{width: '100%', textAlign: 'right'}}>
                                    <Button onClick={this.handleAnswerSubmit} type='submit'
                                            style={{
                                                fontFamily: 'B Yekan',
                                                color: '#ffffff',
                                                backgroundColor: 'cornflowerblue',
                                                padding: '12px 60px',
                                                marginTop: '15px',
                                                marginLeft: 'auto',
                                            }}>ارسال پاسخ</Button>
                                </div>
                            </Segment>


                        </Grid.Column>

                        <Grid.Column style={{height: '80vh'}} width={3}>
                            <Ad ad1={this.state.ads[0].link}
                                ad2={this.state.ads[1].link}
                                ad3={this.state.ads[2].link}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


            </Template>


        )
    }
}

export default QuestionPage;