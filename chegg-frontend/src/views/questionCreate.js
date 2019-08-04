import React, {Component} from "react";
import axios from "axios";
import {Button, Container, Form, Grid, Icon, Modal, Segment} from "semantic-ui-react";
import Template from "../components/template/template";
import MultiSelect from "@khanacademy/react-multi-select";
import Ad from "../components/ad";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertToRaw, EditorState} from 'draft-js';
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
            ads: [{'id': 0, 'link': ''}, {'id': 1, 'link': ''}, {'id': 2, 'link': ''},],
            isActive: true,
            isAbleToAsk: true,
        };
    }

    onContentStateChange: Function = (editorState) => {
        this.setState({
            text: editorState
        })
    };
    onEditorStateChange: Function = (editorState) => {


        if (!this.state.isActive) {

            alert('حساب کاربری شما مسدود شده و نمی توانید سوالی بپرسید.')

            window.location.replace('http://localhost:3000/')
        }
        console.log(this.state.isAbleToAsk)
        if (!this.state.isAbleToAsk) {
            alert('تعداد سوالاتی که می توانستید بپرسید به بیشینه مقدار خود رسیده است. برای پرسیدن سوال, حساب خود را ارتقا دهید.')

            window.location.replace('http://localhost:3000/profile/' + localStorage.getItem('chegg-username'))
        }

        this.setState({
            editorState,
        });
    };


    componentWillMount() {

        var username = localStorage.getItem('chegg-username');
        /*const headers = {
            'Authorization': 'TOKEN ' + localStorage.getItem('chegg-username')
        };*/

        if (username !== null || username !== undefined) {

            axios.get('http://localhost:8000/auth/profile/' + username).then(res => {
                this.setState({
                    isAbleToAsk: res.data.is_able_to_ask,
                    isActive: res.data.is_active
                });
                console.log("back", res.data.is_able_to_ask, "here", this.state.isAbleToAsk);
                axios.get('http://localhost:8000/qa/tags/').then(res2 => {
                    axios.get('http://localhost:8000/store/ads/')
                        .then(res3 => {
                            this.setState({
                                tags: res2.data,
                                allow: true,
                                ads: res3.data,
                            })
                        });


                });
            })
        }

        console.log(this.state.isAbleToAsk, "nice")

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
                                                color='green'
                                                onClick={this.onCloseModal.bind(this)}>بستن</Button>
                                    </Modal.Actions>
                                </Modal>
                                <Container style={{height: '100%'}}>
                                    <Segment>
                                        <Form onSubmit={this.handleSubmit} style={{'direction': 'rtl'}}>
                                            <Form.Group>
                                                <Form.TextArea width={16} required
                                                               id='title'
                                                               style={{
                                                                   resize: 'none',
                                                                    height: '42px',
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
                                                    id='submit'
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
                                <Ad ad1={this.state.ads[0].link}
                                    ad2={this.state.ads[1].link}
                                    ad3={this.state.ads[2].link}/>
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