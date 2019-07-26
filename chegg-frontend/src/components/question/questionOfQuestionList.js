import React, {Component} from "react";
import {Button, Card, Dropdown, Icon, Image, Menu, Segment} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {Redirect} from "react-router-dom";
import {ContentState, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import htmlToDraft from 'html-to-draftjs';


class QuestionOfQuestionList extends Component {


    constructor(props) {

        super(props);
        this.routeChange = this.routeChange.bind(this);
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

    routeChange = (e) => {
        this.setState({
            redirect: true,
            path: e,

        })
    };

    renderRedirect = () => {

        if (this.state.redirect) {

            return <Redirect to={this.state.path}/>
        }
    };

    render() {
        const divStyle = {
            cursor: 'pointer',
            margin: 'auto',
        };

        const UserName_or_not = () => {

            if (this.state.isProfile === 0) {
                var links = 'profile/' + this.state.asker;
                return (
                    <div>

                        نویسنده:
                        <br/>
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
                margin: '3px 10px',
                maxHeight: '25%',
                minHeight: '25%',
                border: '4px solid transparent',
                borderBottom: '4px solid #eeeeee',
            }}>
                <Grid.Column style={{
                    padding: '20px 10px', display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }} width={1}>
                    <Grid.Row style={{
                        textAlign: 'center',

                    }}>
                        <Icon className={'pointer'} onClick={this.handleUpVotes} color={"grey"} size={"huge"}
                              style={divStyle} name="caret up"/>
                    </Grid.Row>
                    <Grid.Row>
                        <p style={{textAlign: 'center', fontSize: '2em'}}>{this.state.score}</p>
                    </Grid.Row>
                    <Grid.Row className={'pointer'} style={{textAlign: 'center'}}>
                        <Icon onClick={this.handleDownVotes} color={"grey"} size={"huge"}
                              style={divStyle} name="caret down"/>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column style={{
                    display: 'flex',
                    flexDirection: 'column'
                }} width={15}>
                    <Grid.Row style={{paddingBottom: '5px'}}>

                        <div style={{fontSize: '1.5em'}}><a href={this.state.link}> {this.state.title}</a></div>


                    </Grid.Row>
                    <Grid.Row style={{height:'11vh', overflow:'hidden'}}>
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

                                <Button primary
                                        style={{direction: 'ltr', color: '#ffffff', backgroundColor: '#761d69', margin:'1px'}}
                                        content={tag.name} id={'id'+tag.id}/>
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