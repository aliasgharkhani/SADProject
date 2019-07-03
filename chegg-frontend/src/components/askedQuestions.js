import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import BookCard from '../components/bookCard'


class AskedQuestions extends Component {
        render() {


        return (
                <Segment
                    style={{
                        width: ' 70%',
                       backgroundImage: 'linear-gradient(to left, #bbbbcb, white)',
                        margin: 'auto',
                        maxHeight: '48vh',
                        overflow: 'auto',
                    }}>
                    <Grid style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap',
                        margin: 'auto',
                    }}>
                        {this.props.asked_questions.map(question =>

                            <Segment color={'teal'}>{question}</Segment>
                        )}
                    </Grid>

                </Segment>

        )
    }


}

export default AskedQuestions;