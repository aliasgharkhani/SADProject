import React, {Component} from "react";
import {Button, Card, Image, Menu, Segment} from 'semantic-ui-react'
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

        console.log("question")
        return (


                <Grid style={{width: '48%', backgroundColor: 'white', margin: '10px 10px', height: '190px', display: 'flex', flexDirection: 'column'}}>

                    <Grid.Row style={{ flexGrow: '1' }}>
                        <Grid.Column>
                            <div style={{fontSize: '1.5em'}}><a href={this.props.link}> {this.props.title}</a> <br/><br/></div>

                            <div>{this.props.description}</div>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row style={{
                        marginBottom: '10px',
                        height: '5vh',
                    }}>

                        {this.props.tags.map(tag =>

                            <Button primary disabled={true}>{tag}</Button>
                        )}

                    </Grid.Row>
                </Grid>

        )
    }


}

export default Question;