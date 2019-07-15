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
        asker:null,
        description:null,
        tags:[],
        link:null,
        title:null,
        isProfile:null
    };

    static getDerivedStateFromProps(props, state) {
        return {
            asker: props.asker,
            title: props.title,
            link: props.link,
            description: props.description,
            tags:props.tags,
            isProfile:props.isProfile
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

        const UserName_or_not = () => {

            if (this.state.isProfile === 0) {

                return (
                    <div>

                        نویسنده: &nbsp;&nbsp;
                        {this.state.asker}

                        <br/>


                        </div>// path='/sport3/login'


                )
            }
            else {
                return (
                    <div></div>


                )
            }
        };

        return (


                <Grid style={{width: '48%', backgroundColor: 'white', margin: '10px 10px', height: '160px', display: 'flex', flexDirection: 'column'}}>

                    <Grid.Row style={{  paddingBottom: '0'}} >

                            <div style={{fontSize: '1.5em'}}><a href={this.state.link}> {this.state.title}</a></div>



                    </Grid.Row>
                    <Grid.Row style={{flexGrow: '1'}}>
                        <div>{this.state.description}</div>
                    </Grid.Row>

                    <Grid.Row  columns={2} style={{
                        overflow: 'hidden',
                        padding: '0px',
                        height: '5vh',
                    }}>
                        <Grid.Column style={{padding: '0px'}} width={12} >
                         {this.state.tags.map(tag =>

                            <Button id={tag.id} primary disabled={true}>{tag.name}</Button>
                        )}

                        </Grid.Column >
                        <Grid.Column style={{textAlign: 'left'}} width={4}>
                            {UserName_or_not()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

        )
    }


}

export default Question;