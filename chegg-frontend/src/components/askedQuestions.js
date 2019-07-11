import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import Question from '../components/question'
import BookCard from "./bookCard";


class AskedQuestions extends Component {
    render() {
        console.log('askedquestion');

        return (
            <Segment
                style={{
                    backgroundImage: 'url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-037.jpg")',
                    margin: 'auto',
                    maxHeight: '425px',
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

                            <Question isProfile={this.props.isProfile} asker={this.props.asker} title={question.title} description={question.description} tags={question.tags}
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