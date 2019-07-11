import React, {Component} from 'react'
import {Grid} from 'semantic-ui-react'


import Navbar from './navbar';
import Footer from './footer';


const templateStyle = {
    height: '100%',
    fontFamily: 'B Yekan',
    

};



class Template extends Component {
constructor(props){
        super(props);
    }
    render() {
   var a =  document.getElementsByTagName('a');
   console.log(a)
        return (
            <Grid  style={templateStyle }>
                <Grid.Row style={{maxHeight : '10%', paddingBottom:'0px'}}>
                    <Grid.Column>
                        <Navbar{...this.props}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{minHeight:'78vh' , padding:'10px'}} >
                    <Grid.Column >

                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{maxHeight : '15%', padding:'0px'}}>
                    <Grid.Column>
                        <Footer/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Template;