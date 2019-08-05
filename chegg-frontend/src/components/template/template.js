import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'


import Navbar from './navbar';
import Footer from './footer';


const templateStyle = {
    height: '100%',
    fontFamily: 'B Yekan',
    display: "flex",
    flexDirection: 'row'

};


class Template extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Grid style={templateStyle}>
                <Grid.Row style={{height: '8%', paddingBottom: '0px', direction: 'rtl'}}>
                    <Grid.Column>
                        <Navbar {...this.props}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{minHeight: '82%', padding: '0'}}>
                    <Grid.Column style={{
                        padding: '0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%'
                    }}>
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{height: '10%', padding: '0px', justifySelf: 'flex-end'}}>
                    <Grid.Column>
                        <Footer/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Template;