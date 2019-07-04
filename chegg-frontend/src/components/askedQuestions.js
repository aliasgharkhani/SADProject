import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import Question from '../components/question'
import BookCard from "./bookCard";


class AskedQuestions extends Component {
    render() {
        console.log('askedquestion')

        return (
            <Segment
                style={{
                    width: ' 70%',
                    backgroundImage: 'linear-gradient(to left, #bbbbcb, white)',
                    margin: 'auto',
                    maxHeight: '44vh',
                    overflow: 'auto',



                }}>
                <Grid style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    direction: 'rtl'
                }}>

                    {this.props.question.map(question =>

                            <Question title={question.title} description={question.description} tags={question.tags}
                                      link={question.link}
                            />

                    )}

                    {/*<Segment color={'teal'}><a href={question.link}> {question.title}</a></Segment>*/}
                </Grid>

            </Segment>

        )
    }


}

export default AskedQuestions;