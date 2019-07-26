import React, {Component} from "react";
import {Button, Icon} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {Editor} from "react-draft-wysiwyg";
import {ContentState, EditorState} from "draft-js";
import htmlToDraft from 'html-to-draftjs';


class QuestionOfQuestionPage extends Component {


    constructor(props) {

        super(props);

        this.showTags = this.showTags.bind(this);
        this.handleUpVotes = this.handleUpVotes.bind(this);
        this.state = {
            question: [],
            votes: 0,
            editorState:null,

        }
    }


    componentDidUpdate(prevProps, prevState) {

        if (this.props !== prevProps) {
            var contentBlock = htmlToDraft(this.props.question.body);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({
                    editorState: editorState,
                    question: this.props.question,
                    date: this.props.question.date
                });
                return
            }
            this.setState({
                question: this.props.question,
                date: this.props.question.date
            })
        }
    }

    // componentWillMount() {
    //     console.log("component will mount", this.props)
    //     this.setState({
    //         question: this.props.question
    //     })
    // }

    showTags() {
        if (this.state.question.length === 0) {
            return (<div/>)

        }
        return (
            <div>


                {this.state.question.tags_with_names.map(tag =>

                    <Button primary disabled={true}
                            style={{direction: 'ltr', color: '#283351', backgroundColor: '#d6e1e9'}}
                            content={tag.name}/>
                )}
            </div>
        )
    }

    handleUpVotes() {
        alert("here")

    }

    handleDownVotes() {
        alert("there")
    }

    vote(command) {


    }


    render() {
        const divStyle = {
            cursor: 'pointer',
            margin: 'auto',
        };


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
                                    <div style={{
                                        fontSize: '1.9em',
                                        paddingRight: '0px'
                                    }}>{this.state.question.title} </div>
                                </Grid.Column>

                                <Grid.Column width={4}>
                                    <div style={{textAlign: 'center', fontSize: '1.2em'}}> پرسیده شده در تاریخ
                                        <br/>
                                        <br/>
                                        {this.state.question.date}
                                        {/*1397/2/3*/}
                                    </div>
                                </Grid.Column>

                            </Grid.Row>
                            <Grid.Row style={{ width:'100%'}}>
                                <Grid.Column>
                                <Editor

                                    readOnly
                                    toolbarHidden
                                    editorState={this.state.editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                />
                                </Grid.Column>
                                {/*<div> {this.state.question.body}</div>*/}
                            </Grid.Row>

                            <Grid.Row columns={2} style={{
                                overflow: 'hidden',
                                padding: '0px',
                                height: '5vh',
                            }}>
                                <Grid.Column style={{padding: '0px'}} width={12}>
                                    {this.showTags()}


                                </Grid.Column>
                                <Grid.Column style={{textAlign: 'right'}} width={4}>
                                    <div style={{textAlign: 'center'}}>

                                        نویسنده: &nbsp;&nbsp;
                                        <a href={'http://localhost:3000/profile/' + this.state.question.asker}>{this.state.question.asker}</a>

                                        <br/>


                                    </div>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Grid.Column>
                    <Grid.Column width={2}>

                        <Grid.Row style={{textAlign: 'center'}}>
                            <Icon className={'pointer'} onClick={this.handleUpVotes} color={"grey"} size={"huge"}
                                  style={divStyle} name="caret up"/>
                        </Grid.Row>
                        <Grid.Row>
                            <p style={{textAlign: 'center', fontSize: '2em'}}>{this.state.question.score}</p>
                        </Grid.Row>
                        <Grid.Row className={'pointer'} style={{textAlign: 'center'}}>
                            <Icon onClick={this.handleDownVotes} color={"grey"} size={"huge"}
                                  style={divStyle} name="caret down"/>
                        </Grid.Row>
                    </Grid.Column>

                </Grid.Row>

            </Grid>


        )
    }


}

export default QuestionOfQuestionPage;