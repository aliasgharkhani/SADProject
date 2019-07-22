import React, {Component} from "react";
import {Grid} from "semantic-ui-react";




class Ad extends Component {


    state = {
        books: [],
        bought_books: [],
        numOfChapters: [],
        activeItem: 'مشخصات کاربری',
        username: '',
        userInfo: {},
        allow: false,
        askedQuestions: [],
        answeredQuestions: [],
        level: false,


    };

    render() {
        return(
            <Grid style={{height:'100%', margin:'auto', justifyContent: 'space-between'}}>
                <Grid.Row style={{paddingTop:'0'}}>
                    <Grid.Column>
                        <div  style={{ width: '100%', height: '100%',backgroundSize: 'contain', backgroundImage : 'url('+ this.props.ad1 +')'}} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <div  style={{ width: '100%', height: '100%',backgroundSize: 'contain', backgroundImage : 'url('+ this.props.ad2 +')'}} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{paddingBottom:'0'}}>
                    <Grid.Column>
                        <div  style={{ width: '100%', height: '100%',backgroundSize: 'contain', backgroundImage : 'url('+ this.props.ad3 +')'}} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        )
    }


}

export default Ad;






















