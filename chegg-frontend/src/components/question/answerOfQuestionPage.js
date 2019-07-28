import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import {Divider, Icon, Segment} from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import axios from 'axios'

class AnswerOfQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.handleVote = this.handleVote.bind(this);
        // const contentBlock = htmlToDraft(html);
        // if (contentBlock) {
        //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        //     const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editorState: null,
            reply: [],
            score: 0,
        };
        // }
    }

    handleVote(e) {
        var token = localStorage.getItem('chegg-token')
        e.preventDefault()

        if (token === null || token === undefined) {
            alert('برای رای دادن باید وارد سایت شوید');

            return
            //this.props.history.push('../signin');
            // window.location.replace('http://localhost:3000/signin');
        }

        var headers = {

            'Authorization': 'TOKEN ' + token
        };

        var command = 'up';
        if (e.target.className[e.target.className.length - 1] === 'n') {
            command = 'down'
        }

        axios.post('http://127.0.0.1:8000/qa/reply/' + this.state.reply.id + '/score/', {

            command: command
        }, {headers: headers})
            .then(response => {

                if (response.status === 200) {

                    this.setState({
                        score: response.data.score
                    })


                }


            })
            .catch((error) => {
                let errors = "";
                for (let i = 0; i < error.response.data.length; i++) {
                    errors += error.response.data[i] + "\n";
                }

            })

    }


    componentDidUpdate(prevProps, prevState) {

        if (this.props !== prevProps) {
            var editorState = null;
            var contentBlock = htmlToDraft(this.props.reply.body);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                editorState = EditorState.createWithContent(contentState);
            }
            this.setState({
                editorState: editorState,
                reply: this.props.reply,
                score: this.props.reply.score,
            })
        }
    }

    componentWillMount() {
        var editorState = null;
        var contentBlock = htmlToDraft(this.props.reply.body);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        }
        this.setState({
            editorState: editorState,
            reply: this.props.reply,
            score: this.props.reply.score,
        })
    }

    // static getDerivedStateFromProps(props, state) {
    //
    // }


    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const divStyle = {
            cursor: 'pointer',
            margin: 'auto',
        };
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
        return (

            <Grid style={{margin: 'auto'}}>

                <Grid.Row columns={2}>


                    <Grid.Column width={15}>
                        <Grid style={{direction: 'rtl'}}>
                            <Grid.Row columns={2} style={{
                                marginTop: '20px',
                                paddingBottom: '0',
                                direction: 'rtl',
                                minHeight: '4vh'
                            }}>
                                <Grid.Column style={{paddingRight: '0px'}} width={13}>
                                    <Editor
                                        readOnly
                                        toolbarHidden
                                        editorState={this.state.editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                    />
                                </Grid.Column>

                                <Grid.Column width={3}>
                                    <div style={{textAlign: 'center', fontSize: '1.2em'}}> پرسیده شده در تاریخ
                                        <br/>
                                        <br/>
                                        {this.state.reply.date}
                                    </div>
                                </Grid.Column>

                            </Grid.Row>


                            <Grid.Row columns={2} style={{
                                overflow: 'hidden',
                                padding: '0px',
                            }}>
                                <Grid.Column style={{padding: '0px'}} width={13}>
                                    <div/>


                                </Grid.Column>
                                <Grid.Column style={{textAlign: 'right'}} width={3}>
                                    <div style={{textAlign: 'center'}}>

                                        نویسنده: &nbsp;&nbsp;
                                        <a href={'http://localhost:3000/profile/' + this.state.reply.asker}>{this.state.reply.asker}</a>

                                        <br/>
                                    </div>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Grid.Column>
                    <Grid.Column style={{padding: '0'}} width={1}>

                        <Grid.Row style={{textAlign: 'center'}}>
                            <Icon onClick={this.handleVote} className={'up'} color={this.state.reply.member_score === 1 ? "green":"grey"} size={"huge"}
                                  style={divStyle} name="caret up"/>
                        </Grid.Row>
                        <Grid.Row>
                            <p style={{textAlign: 'center', fontSize: '2em'}}>{this.state.score}</p>
                        </Grid.Row>
                        <Grid.Row className={'pointer'} style={{textAlign: 'center'}}>
                            <Icon onClick={this.handleVote} className={'down'} color={this.state.reply.member_score === -1 ? "red":"grey"} size={"huge"}
                                  style={divStyle} name="caret down"/>
                        </Grid.Row>
                    </Grid.Column>

                </Grid.Row>
                <Divider section/>
            </Grid>


        );
    }
}


export default AnswerOfQuestionPage;