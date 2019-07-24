import React, {Component} from "react";
import {Button, Card, Dropdown, Icon, Image, Menu, Segment} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import {Redirect} from "react-router-dom";


class Question extends Component {


    constructor(props) {

        super(props);
        this.routeChange = this.routeChange.bind(this);
    }

    state = {
        redirect: false,
        path: '',
        asker: null,
        description: null,
        tags: [],
        link: null,
        title: null,
        isProfile: null
    };

    static getDerivedStateFromProps(props, state) {
        return {
            asker: props.asker,
            title: props.title,
            link: props.link,
            description: props.description,
            tags: props.tags,
            isProfile: props.isProfile,
            is_answered:props.is_answered,
            num_of_replies:props.num_of_replies,
            date:props.date,
            score:props.score,
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
    }

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
                    <div></div>


                )
            }
        };

        return (


            <Grid style={{
                width: '100%',
                backgroundColor: 'white',
                margin: '3px 10px',
                height: '190px',
                border: '0.7px groove',
                borderRadius: '10px'
            }}>
                <Grid.Column style={{
                    padding: '20px 0px', display: 'flex',
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

                        <div style={{fontSize: '1.5em'}}><a  href={this.state.link}> {this.state.title}</a></div>


                    </Grid.Row>
                    <Grid.Row style={{flexGrow: '1'}}>
                        <div>{this.state.description}</div>
                    </Grid.Row>
                    <Grid columns={2}>

                        <Grid.Column width={13}>
                            {this.state.tags.map(tag =>

                                <Button primary disabled={true}
                                        style={{direction: 'ltr', color: '#283351', backgroundColor: '#d6e1e9'}}
                                        content={tag.name}/>
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

export default Question;