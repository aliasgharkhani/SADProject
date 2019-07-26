import React, {Component} from "react";
import axios from "axios";
import {Button, Container, Form, Grid, Icon, Modal, Segment} from "semantic-ui-react";
import Template from "../components/template/template";
import MultiSelect from "@khanacademy/react-multi-select";
import Ad from "../components/ad";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';


class QuestionCreate extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: null,
            body: null,
            allow: false,
            tags: null,
            selectedTags: [],
            editorState: EditorState.createEmpty(),
            text: '',
        };
    }

    onContentStateChange: Function = (editorState) => {
        this.setState({
            text: editorState
        })
    };
    onEditorStateChange: Function = (editorState) => {
        // console.log('editor', editorState)

        this.setState({
            editorState,
        });
    };


    componentWillMount() {
        axios.get('http://localhost:8000/qa/tags/').then(res => {
            // console.log(res.data, "sfsdfqqqq")
            this.setState({
                tags: res.data,
                allow: true,
            })
        });
        // console.log(this.state.tags, "sdfsdf")

    }

    onCloseModal() {
        this.setState({
            modalActive: false,
            memberInfo: null
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        console.log('baba    ', this.state.text);
        const formFields = e.target;
        const title = formFields[0].value;
        // var body = this.state.text;
        // body = JSON.stringify(body);
        var body = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        const tags = this.state.selectedTags;
        const headers = {
            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-token')
        };

        const data = {
            title: title,
            body: body,
            tags: tags,
        }
        axios.post('http://127.0.0.1:8000/qa/questions/', data, {headers: headers})
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
                    this.setState({
                        modalMessage: " موفقیت آمیز"
                    })
                } else {
                    this.setState({
                        modalMessage: "سوال شما با موفقیت ایجاد شد"
                    })
                    setTimeout(() => {
                        this.props.history.push('../questions');
                        // window.location.replace("http://localhost:3000/questions")
                    }, 2000)
                }
            })
            .catch((error) => {
                console.log("error", error)
                this.setState({
                    modalMessage: "خطا"
                })
            });
        this.setState({modalActive: true})
    }


    render() {
        const editorState = this.state.editorState;
        const styleObj = {
            minHeight:'100px',
            border: '0.3px solid gray',
            padding: '0 5px',
            maxHeight: '200px',
            margin: '0',
            overFlow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
        };
        let token = localStorage.getItem('chegg-token');
        if (this.state.allow && token !== null && token !== undefined) {
            return (
                <Template {...this.props}>

                    <Grid style={{margin: 'auto', width: '70%', height: '82vh'}}>
                        <Grid.Row columns={2} style={{maxHeight: '100%',}}>

                            <Grid.Column width={13} style={{maxHeight: '100%',}}>
                                <Modal size={"mini"} onRequestClose={this.onCloseModal.bind(this)}
                                       open={this.state.modalActive}>
                                    <Icon name="close" onClick={this.onCloseModal.bind(this)}/>

                                    <Modal.Content image>

                                        <Modal.Description
                                            style={{
                                                flexGrow: '1',
                                                direction: 'rtl',
                                                textAlign: 'right',
                                                fontFamily: 'B Yekan'
                                            }}>

                                            <p>
                                                {this.state.modalMessage}
                                            </p>

                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button style={{fontFamily: "B Yekan"}} emphasis="positive"
                                                color='white'
                                                onClick={this.onCloseModal.bind(this)}>بستن</Button>
                                    </Modal.Actions>
                                </Modal>
                                <Container style={{height: '100%'}}>
                                    <Segment>
                                        <Form onSubmit={this.handleSubmit} style={{'direction': 'rtl'}}>
                                            <Form.Group>
                                                <Form.TextArea width={16} required
                                                               style={{
                                                                   resize: 'none',
                                                                   height: '37.6px',
                                                                   overflow: 'hidden',
                                                                   fontFamily: 'B Yekan'
                                                               }}
                                                               label='عنوان'/>

                                            </Form.Group>

                                            <div style={{marginBottom: '40px', direction: 'ltr'}}
                                            >
                                                <div style={{direction: 'rtl'}}>متن</div>

                                                <Editor
                                                    editorState={editorState}
                                                    wrapperClassName="demo-wrapper"
                                                    editorClassName="demo-editor"
                                                    editorStyle={styleObj}
                                                    onEditorStateChange={this.onEditorStateChange}
                                                    onContentStateChange={this.onContentStateChange}
                                                />

                                            </div>
                                            برچسب ها
                                            <MultiSelect overrideStrings={{
                                                selectSomeItems: "انتخاب کنید",
                                                allItemsAreSelected: "همه انتخاب شدند",
                                                selectAll: "انتخاب همه",
                                                search: "جستوجو",
                                            }}
                                                         options={this.state.tags.map(tag => {
                                                             return {
                                                                 label: tag.name,
                                                                 value: tag.id
                                                             }
                                                         })}
                                                         selected={this.state.selectedTags}
                                                         onSelectedChanged={selectedTags => this.setState({selectedTags})}
                                            />
                                            <br/>
                                            <Button type='submit'
                                                    style={{
                                                        fontFamily: 'B Yekan',
                                                        color: '#ffffff',
                                                        backgroundColor: 'cornflowerblue',
                                                        padding: '12px 60px'
                                                    }}>ایجاد</Button>
                                        </Form>
                                    </Segment>
                                </Container>
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
        } else {
            if (token === null || token === undefined) {
                alert('برای پرسش سوال باید وارد سایت شوید');
                this.props.history.push('../signin');
                // window.location.replace('http://localhost:3000/signin');
            }
            return (<div/>)
        }
    }


}

export default QuestionCreate;