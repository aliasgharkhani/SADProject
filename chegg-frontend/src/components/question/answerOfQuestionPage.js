import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import {Divider, Icon, Segment} from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";

class AnswerOfQuestionPage extends Component {
    constructor(props) {
        super(props);
        // const contentBlock = htmlToDraft(html);
        // if (contentBlock) {
        //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        //     const editorState = EditorState.createWithContent(contentState);
        console.log('salma lsalasdfm')
        this.state = {
            editorState: null,
            reply: []
        };
        // }
    }


    static getDerivedStateFromProps(props, state) {
        var editorState = null;
        var contentBlock = htmlToDraft(props.reply.body);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        }
        return {
            editorState: editorState,
            reply: props.reply,
        };
    }


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
                                        <a href={'http://localhost:3000/profile/' + 'ali'}>{this.state.reply.asker}</a>

                                        <br/>
                                    </div>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Grid.Column>
                    <Grid.Column style={{padding:'0'}} width={1}>

                        <Grid.Row style={{textAlign: 'center'}}>
                            <Icon className={'pointer'} color={"grey"} size={"huge"}
                                  style={divStyle} name="caret up"/>
                        </Grid.Row>
                        <Grid.Row>
                            <p style={{textAlign: 'center', fontSize: '2em'}}>{this.state.reply.score}</p>
                        </Grid.Row>
                        <Grid.Row className={'pointer'} style={{textAlign: 'center'}}>
                            <Icon color={"grey"} size={"huge"}
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