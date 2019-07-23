import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {Divider, Icon, Segment} from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";

class Answer extends Component {
    constructor(props) {
        super(props);
        // const contentBlock = htmlToDraft(html);
        // if (contentBlock) {
        //     const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        //     const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editorState: null,
        };
        // }
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            var contentBlock = htmlToDraft(this.props.html)
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({
                    editorState: editorState,
                });
            }
        }
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
        return (

                <Grid style={{margin: 'auto'}}>

                    <Grid.Row columns={2}>


                        <Grid.Column width={14}>
                            <Grid style={{direction: 'rtl'}}>
                                <Grid.Row columns={2} style={{
                                    marginTop: '20px',
                                    paddingBottom: '0',
                                    direction: 'rtl',
                                    minHeight: '4vh'
                                }}>
                                    <Grid.Column style={{paddingRight: '0px'}} width={12}>
                                        <Editor
                                            toolbarHidden
                                            editorState={editorState}
                                            wrapperClassName="demo-wrapper"
                                            editorClassName="demo-editor"
                                            onEditorStateChange={this.onEditorStateChange}
                                        />
                                    </Grid.Column>

                                    <Grid.Column width={4}>
                                        <div style={{textAlign: 'center', fontSize: '1.2em'}}> پرسیده شده در تاریخ
                                            <br/>
                                            <br/>
                                            {/*{this.state.question.date}*/}
                                            1397/2/3
                                        </div>
                                    </Grid.Column>

                                </Grid.Row>


                                <Grid.Row columns={1} style={{
                                    overflow: 'hidden',
                                    padding: '0px',
                                    height: '5vh',
                                }}>

                                    <Grid.Column style={{textAlign: 'right'}} width={4}>
                                        <div style={{textAlign: 'center'}}>

                                            نویسنده: &nbsp;&nbsp;
                                            <a href={'http://localhost:3000/profile/' + 'ali'}>ali</a>

                                            <br/>
                                        </div>

                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Grid.Column>
                        <Grid.Column width={2}>

                            <Grid.Row style={{textAlign: 'center'}}>
                                <Icon className={'pointer'}  color={"grey"} size={"huge"}
                                      style={divStyle} name="caret up"/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{textAlign: 'center', fontSize: '2em'}}>10</p>
                            </Grid.Row>
                            <Grid.Row className={'pointer'} style={{textAlign: 'center'}}>
                                <Icon  color={"grey"} size={"huge"}
                                      style={divStyle} name="caret down"/>
                            </Grid.Row>
                        </Grid.Column>

                    </Grid.Row>
                    <Divider section/>
                </Grid>



        );
    }
}


export default Answer