import React, {Component} from "react";
import {Button,  Icon} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {Redirect} from "react-router-dom";
import {ContentState, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import htmlToDraft from 'html-to-draftjs';


class QuestionOfQuestionList extends Component {


    constructor(props) {

        super(props);

        this.state = {
            redirect: false,
            path: '',
            asker: null,
            description: null,
            tags: [],
            link: null,
            title: null,
            isProfile: null,
            editorState: null
        }
        this.tagOnclick = this.tagOnclick.bind(this)
    }


    static getDerivedStateFromProps(props, state) {
        var editorState = null;
        var contentBlock = htmlToDraft(props.description);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        }
        return {
            asker: props.asker,
            title: props.title,
            link: props.link,
            description: props.description,
            tags: props.tags,
            isProfile: props.isProfile,
            is_answered: props.is_answered,
            num_of_replies: props.num_of_replies,
            date: props.date,
            score: props.score,
            editorState: editorState,
        };
    }


    renderRedirect = () => {

        if (this.state.redirect) {

            return <Redirect to={this.state.path}/>
        }
    };

    tagOnclick(e){
        console.log(e.target)
        /*window.location.replace(e.target.link)*/
    }

    render() {
        const divStyle = {
            margin: 'auto',
            textAlign: 'center',
        };

        const UserName_or_not = () => {

            if (this.state.isProfile === 0) {
                var links = 'http://localhost:3000/profile/' + this.state.asker;
                return (
                    <div>

                        نویسنده: &nbsp;&nbsp;
                        <a href={links}>{this.state.asker}</a>

                        <br/>


                    </div>// path='/sport3/login'


                )
            } else {
                return (
                    <div/>


                )
            }
        };

        return (


            <Grid style={{
                width: '100%',
                backgroundColor: 'white',
                margin: '3px 0px',
                border: '4px solid transparent',
                borderBottom: '4px solid #eeeeee',

            }}>
                <Grid.Column style={{
                    padding: '20px 0px', display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }} width={1}>
                    <Grid.Row style={{}}>
                        <div style={divStyle}>
                            <div style={{fontSize:'2em'}}>{this.state.num_of_replies}</div>
                            پاسخ‌
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                        <div style={divStyle}>
                            {this.state.is_answered ? <Icon style={{width:'100%', margin:'auto'}} size={"huge"} name={"check circle outline"} color={"green"}/>:<div/>}
                        </div>
                    </Grid.Row>

                </Grid.Column>
                <Grid.Column style={{
                    display: 'flex',
                    flexDirection: 'column'
                }} width={15}>
                    <Grid.Row style={{paddingBottom: '5px'}}>

                        <div style={{fontSize: '1.5em'}}><a href={this.state.link}> {this.state.title}</a></div>


                    </Grid.Row>
                    <Grid.Row style={{height: '11.5vh', overflow: 'hidden'}}>
                        {/*<div>{this.state.description}</div>*/}
                        <Editor
                            readOnly
                            toolbarHidden
                            editorState={this.state.editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                        />
                    </Grid.Row>
                    <Grid columns={2}>

                        <Grid.Column width={13}>
                            {this.state.tags.map(tag =>
                                <a href={'http://localhost:3000/questions/tagged/' + tag.name}>
                                <Button primary


                                        style={{
                                            direction: 'ltr',
                                            color: '#ffffff',
                                            backgroundColor: '#761d69',
                                            margin: '1px'
                                        }}
                                        content={tag.name} id={'id' + tag.id}/>
                                </a>
                            )}

                        </Grid.Column>
                        <Grid.Column width={3} style={{textAlign: 'left'}}>
                            {/*    salam*/}
                            {UserName_or_not()}
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>

        )
    }


}

export default QuestionOfQuestionList;