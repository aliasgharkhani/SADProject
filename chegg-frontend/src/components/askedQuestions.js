import React, {Component} from "react";
import {Grid, Menu, Segment} from 'semantic-ui-react'
import Question from '../components/question'
import BookCard from "./bookCard";


class AskedQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [],
            asker:null,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            question: props.question,
            asker:props.asker,
        };
    }


    // componentWillReceiveProps(nextProps, nextContext) {
    //     console.log('oomadam', nextProps.question)
    //     this.setState({
    //         question: nextProps.question,
    //         asker : nextProps.asker
    //     })
    // }


    render() {
        console.log('inja oomadam')
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
                    {this.state.question.map(question =>

                        <Question isProfile={this.props.isProfile} asker={this.state.asker} title={question.title}
                                  description={question.body} tags={question.tags_with_names}
                                  link={''}
                        />
                    )}

                    {/*<Segment color={'teal'}><a href={question.link}> {question.title}</a></Segment>*/}
                </Grid>

            </Segment>

        )
    }


}

export default AskedQuestions;