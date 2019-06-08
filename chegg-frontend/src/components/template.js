import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'


import Navbar from './navbar';
import Footer from './footer';


const templateStyle = {
    height: '100%',
    fontFamily: 'B Yekan',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'center'
};



class Template extends Component {
constructor(props){
        super(props);
    }
    render() {
        return (
            <Grid columns={1} style={templateStyle}>
                <Grid.Row>
                    <Grid.Column>
                        <Navbar{...this.props}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{flexGrow: '1',     display: 'flex',    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'}}>
                    <Grid.Column>
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Footer/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}

export default Template;